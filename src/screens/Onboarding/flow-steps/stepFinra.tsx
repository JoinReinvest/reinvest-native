import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'finraInstitution'>;

const schema = z.object({
  finraInstitution: z.string().min(1),
});

export const StepFinraInstitution: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FINRA_INSTITUTION,

  willBePartOfTheFlow: ({ statementTypes }) => {
    return !!statementTypes?.includes(StatementType.FinraMember);
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !!fields.compliances?.isAssociatedWithFinra && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const watchedFinra = watch('finraInstitution');

    const shouldButtonBeDisabled = !watchedFinra || !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ finraInstitution }) => {
      await updateStoreFields({ finraInstitution: finraInstitution });

      if (finraInstitution) {
        await completeProfileMutate({ input: { statements: [{ type: StatementType.FinraMember, forFINRA: { name: finraInstitution } }] } });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Please provide name of the FINRA institution below."
          />
          <Controller
            control={control}
            fieldName="finraInstitution"
            onSubmit={handleSubmit(onSubmit)}
            inputProps={{ placeholder: 'FINRA Institute Name', dark: true }}
            trimmed
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled || isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

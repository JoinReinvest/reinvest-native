import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS, RESIDENCY_STATUS_VALUES } from 'reinvest-app-common/src/constants/residenty-status';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { RadioButtonGroup } from '../../../components/RadioButtonGroup';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'residency'>;

const schema = z.object({
  residency: z.enum(RESIDENCY_STATUS_VALUES),
});

export const StepResidencyStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_STATUS,

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },
  Component: ({ storeFields, moveToNextStep, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { residency: storeFields.residency };

    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = watch('residency') || !isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      if (fields.residency === DomicileType.Citizen) {
        return completeProfileMutate({ input: { domicile: { type: DomicileType.Citizen } } });
      }

      return moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToStepByIdentifier(Identifiers.COMPLIANCES);
      }
    }, [isSuccess, moveToStepByIdentifier]);

    const watchedResidency = watch('residency');

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Residency Status"
            description="Please select your US residency status."
            informationMessage="REINVEST does not accept non-US residents at this time."
          />
          <RadioButtonGroup
            selectedValue={watchedResidency || ''}
            onSelect={val => setValue('residency', val as DomicileType)}
            options={RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

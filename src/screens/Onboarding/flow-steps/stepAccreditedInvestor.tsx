import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { AccreditedInvestorStatement, DraftAccountType, StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { RadioButtonGroup } from '../../../components/RadioButtonGroup';
import { BOOLEAN_OPTIONS } from '../../../constants/booleanOptions';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

interface Fields {
  isAccreditedInvestor: boolean | undefined;
}

const schema = z.object({
  isAccreditedInvestor: z.boolean(),
});

export const StepAccreditedInvestor: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCREDITED_INVESTOR,

  willBePartOfTheFlow: ({ accountType, isCompletedProfile }) => {
    return accountType === DraftAccountType.Individual && !isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const storedValue = storeFields.isAccreditedInvestor;
    const defaultValues: Fields = { isAccreditedInvestor: storedValue };
    const { handleSubmit, setValue, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const { openDialog } = useDialog();

    const shouldButtonBeDisabled = watch('isAccreditedInvestor') !== undefined;

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);
    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ isAccreditedInvestor: fields.isAccreditedInvestor });
      await completeProfileMutate({
        input: {
          statements: [
            {
              type: StatementType.AccreditedInvestor,
              forAccreditedInvestor: {
                statement: fields.isAccreditedInvestor
                  ? AccreditedInvestorStatement.IAmAnAccreditedInvestor
                  : AccreditedInvestorStatement.IAmNotExceeding_10PercentOfMyNetWorthOrAnnualIncome,
              },
            },
          ],
        },
      });
      moveToNextStep();
    };

    const watchedAccreditedInvestor = watch('isAccreditedInvestor');

    const handleOpenDialog = () => {
      openDialog(
        <FormModalDisclaimer
          dark
          headline={'What is an accredited investor?'}
          content="CONTENT"
        />,
      );
    };

    const selectedValue = watchedAccreditedInvestor !== undefined ? (watchedAccreditedInvestor ? 'yes' : 'no') : undefined;

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Are you an accredited investor?"
            link="What is an accredited investor?"
            onLinkPress={handleOpenDialog}
          />
          <RadioButtonGroup
            selectedValue={selectedValue}
            onSelect={val => setValue('isAccreditedInvestor', val === 'yes' ? true : false)}
            options={BOOLEAN_OPTIONS}
          />
        </PaddedScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            disabled={!shouldButtonBeDisabled || isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

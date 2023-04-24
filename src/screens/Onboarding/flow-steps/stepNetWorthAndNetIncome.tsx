import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { NET_WORTHS_AS_OPTIONS } from 'reinvest-app-common/src/constants/net-worths';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'netIncome' | 'netWorth'>;

const schema = z.object({
  netIncome: formValidationRules.netIncome,
  netWorth: formValidationRules.netWorth,
});

export const StepNetWorthAndNetIncome: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.NET_WORTH_AND_INCOME,

  doesMeetConditionFields(fields) {
    const profileFields = [fields.employmentStatus];

    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;
    const hasProfileFields = allRequiredFieldsExists(profileFields);

    return isAccountIndividual && hasProfileFields && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();

    const { openDialog } = useDialog();
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { isLoading, mutateAsync: completeIndividualDraftAccountMutate, isSuccess } = useCompleteIndividualDraftAccount(getApiClient);
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      const netWorth = fields.netWorth ? { range: fields.netWorth } : undefined;
      const netIncome = fields.netIncome ? { range: fields.netIncome } : undefined;
      await completeIndividualDraftAccountMutate({ accountId: storeFields.accountId || '', input: { netWorth, netIncome } });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const handleOpenDialog = () => {
      openDialog(
        <FormModalDisclaimer
          headline="Required. Why?"
          content="CONTENT"
        />,
      );
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="What is approximate net worth and income?"
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="netIncome"
            dropdownProps={{
              placeholder: 'Net Income',
              dark: true,
              data: NET_WORTHS_AS_OPTIONS,
            }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="netWorth"
            dropdownProps={{
              placeholder: 'Net Worth',
              dark: true,
              data: NET_WORTHS_AS_OPTIONS,
            }}
          />
          <View style={[styles.row]}>
            <StyledText
              variant="link"
              color="frostGreen"
              onPress={handleOpenDialog}
            >
              Required. Why?
            </StyledText>
          </View>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

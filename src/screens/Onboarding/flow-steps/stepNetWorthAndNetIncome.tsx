import { Button } from '@components/Button';
import { FormTitle } from '@components/Forms/FormTitle';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormModalDisclaimer } from '@src/components/Modals/ModalContent/FormModalDisclaimer';
import { ProgressBar } from '@src/components/ProgressBar';
import { Controller } from '@src/components/typography/Controller';
import { StyledText } from '@src/components/typography/StyledText';
import { palette } from '@src/constants/theme';
import { useDialog } from '@src/providers/DialogProvider';
import { formValidationRules } from '@src/utils/formValidationRules';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { NET_WORTHS_AS_OPTIONS } from 'reinvest-app-common/src/constants/net-worths';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

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

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog } = useDialog();
    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

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
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="What is approximate net worth and income?"
          />
          <Controller
            select
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
            select
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
              color={palette.frostGreen}
              onPress={handleOpenDialog}
            >
              Required. Why?
            </StyledText>
          </View>
        </ScrollView>
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

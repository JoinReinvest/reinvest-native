import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'corporationLegalName'>;

const schema = z.object({
  corporationLegalName: z.string().min(1),
});

export const StepCorporationLegalName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_LEGAL_NAME,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields: fields => {
    return fields.accountType !== DraftAccountType.Individual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const defaultValues: Fields = { corporationLegalName: storeFields.corporationLegalName || '' };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ corporationLegalName }) => {
      await updateStoreFields({ corporationLegalName });
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Enter your Corporation's legal name"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="corporationLegalName"
            inputProps={{
              placeholder: 'Corporate Legal Name',
              dark: true,
            }}
          />
        </PaddedScrollView>
        <View style={styles.buttonsSection}>
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

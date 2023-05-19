import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
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

  doesMeetConditionFields(fields) {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isCorporateAccount = fields.accountType === DraftAccountType.Corporate;
    const hasTrustFields = allRequiredFieldsExists([fields.corporationType]);

    return hasProfileFields && isCorporateAccount && hasTrustFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const defaultValues: Fields = { corporationLegalName: storeFields.corporationLegalName || '' };
    const { control, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);

    const onSubmit: SubmitHandler<Fields> = async ({ corporationLegalName }) => {
      await updateStoreFields({ corporationLegalName });

      if (storeFields.accountId && corporationLegalName) {
        await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { companyName: { name: corporationLegalName } } });
      }

      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const name = watch('corporationLegalName');

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Enter your Corporation's legal name"
          />
          {error && <ErrorMessagesHandler error={error} />}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="corporationLegalName"
            inputProps={{
              placeholder: 'Corporate Legal Name',
              dark: true,
            }}
            trimmed
          />
        </PaddedScrollView>
        <View style={styles.buttonsSection}>
          <Button
            disabled={isLoading || !name?.length}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

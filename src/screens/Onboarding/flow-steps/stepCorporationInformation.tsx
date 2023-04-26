import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import {
  CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
  CORPORATION_ANNUAL_REVENUES,
  CORPORATION_NUMBER_OF_EMPLOYEES,
  CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
} from 'reinvest-app-common/src/constants/corporation';
import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { INDUSTRIES_LABELS } from '../../../constants/industries';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { mapToIndustryLabel } from '../utilities';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Required<Pick<OnboardingFormFields, 'fiduciaryEntityInformation'>>;

const schema = z.object({
  fiduciaryEntityInformation: z.object({
    annualRevenue: z.enum(CORPORATION_ANNUAL_REVENUES),
    numberOfEmployees: z.enum(CORPORATION_NUMBER_OF_EMPLOYEES),
    industry: z.enum(INDUSTRIES_LABELS),
  }),
});

export const StepCorporationInformation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_INFORMATION,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const hasCorporateAndTrustFields = allRequiredFieldsExists([fields.businessAddress]);
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName]) && fields.accountType === DraftAccountType.Trust;
    const hasCorporateFields =
      allRequiredFieldsExists([fields.corporationType, fields.corporationLegalName, fields.ein]) && fields.accountType === DraftAccountType.Corporate;

    return hasProfileFields && hasCorporateAndTrustFields && (hasTrustFields || hasCorporateFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { mutateAsync: mutateTrust, isSuccess: trustSuccess, error: trustError, isLoading: trustLoading } = useCompleteTrustDraftAccount(getApiClient);

    const {
      mutateAsync: mutateCorporate,
      isSuccess: corporateSuccess,
      error: corporateError,
      isLoading: corporateLoading,
    } = useCompleteCorporateDraftAccount(getApiClient);
    const defaultValues: Fields = {
      fiduciaryEntityInformation:
        { ...storeFields.fiduciaryEntityInformation, industry: mapToIndustryLabel(storeFields.fiduciaryEntityInformation?.industry) } || {},
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || corporateLoading || trustLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ fiduciaryEntityInformation }) => {
      fiduciaryEntityInformation.industry = INDUESTRIES_AS_OPTIONS.find(industry => industry.label === fiduciaryEntityInformation.industry)?.value;
      await updateStoreFields({ fiduciaryEntityInformation });
      const { accountType, accountId } = storeFields;

      if (accountId && fiduciaryEntityInformation.annualRevenue && fiduciaryEntityInformation.numberOfEmployees && fiduciaryEntityInformation.industry) {
        const variables = {
          accountId,
          input: {
            annualRevenue: { range: fiduciaryEntityInformation.annualRevenue },
            industry: { value: fiduciaryEntityInformation.industry },
            numberOfEmployees: { range: fiduciaryEntityInformation.numberOfEmployees },
          },
        };

        if (accountType === DraftAccountType.Trust) {
          await mutateTrust(variables);
        }

        if (accountType === DraftAccountType.Corporate) {
          await mutateCorporate(variables);
        }
      }
    };

    useEffect(() => {
      if (trustSuccess || corporateSuccess) {
        moveToNextStep();
      }
    }, [trustSuccess, corporateSuccess, moveToNextStep]);

    const error = trustError || corporateError;

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline={`Please provide the following information regarding your ${
              storeFields.accountType === DraftAccountType.Corporate ? 'corporation' : 'trust'
            }.`}
          />
          {error && <ErrorMessagesHandler error={error} />}
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="fiduciaryEntityInformation.annualRevenue"
            dropdownProps={{
              dark: true,
              data: CORPORATION_ANNUAL_REVENUE_AS_OPTIONS,
              placeholder: 'Annual Revenue',
            }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="fiduciaryEntityInformation.numberOfEmployees"
            dropdownProps={{
              dark: true,
              data: CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS,
              placeholder: '# of Employees',
            }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="fiduciaryEntityInformation.industry"
            dropdownProps={{
              dark: true,
              data: INDUESTRIES_AS_OPTIONS,
              placeholder: 'Industry',
            }}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
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

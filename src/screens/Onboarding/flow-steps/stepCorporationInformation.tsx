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
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { INDUSTRIES_LABELS } from '../../../constants/industries';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { mapToIndustryLabel } from '../utilities';
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
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName, fields.businessAddress]);

    return isTrustAccount && hasProfileFields && hasTrustFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const defaultValues: Fields = {
      fiduciaryEntityInformation:
        { ...storeFields.fiduciaryEntityInformation, industry: mapToIndustryLabel(storeFields.fiduciaryEntityInformation?.industry) } || {},
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ fiduciaryEntityInformation }) => {
      fiduciaryEntityInformation.industry = INDUESTRIES_AS_OPTIONS.find(industry => industry.label === fiduciaryEntityInformation.industry)?.value;

      await updateStoreFields({ fiduciaryEntityInformation });

      if (
        !storeFields.accountId ||
        !fiduciaryEntityInformation.annualRevenue ||
        !fiduciaryEntityInformation.numberOfEmployees ||
        !fiduciaryEntityInformation.industry
      ) {
        return;
      }

      switch (storeFields.accountType) {
        case DraftAccountType.Trust:
          await completeTrustDraftAccount({
            accountId: storeFields.accountId,
            input: {
              annualRevenue: { range: fiduciaryEntityInformation.annualRevenue },
              industry: { value: fiduciaryEntityInformation.industry },
              numberOfEmployees: { range: fiduciaryEntityInformation.numberOfEmployees },
            },
          });
          break;
        case DraftAccountType.Corporate:
          // TODO: Connect corporate api
          break;
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
            headline={`Please provide the following information regarding your ${
              storeFields.accountType === DraftAccountType.Corporate ? 'corporation' : 'trust'
            }.`}
          />
          {error && (
            <FormMessage
              variant="error"
              message={error.response.errors.map(err => err.message).join(', ')}
            />
          )}
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

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DomicileType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Controller } from '../../../components/typography/Controller';
import { SSN_MASK } from '../../../constants/masks';
import { Identifiers } from '../identifiers';
import { APPLICANT_WITHOUT_IDENTIFICATION } from '../schemas';
import { Applicant, OnboardingFormFields } from '../types';
import { getDefaultValuesForApplicantWithoutIdentification } from '../utilites';
import { styles } from './styles';

type Fields = Omit<Applicant, 'identificationDocument'>;

const mapToDomicile = (value: string | undefined) => {
  switch (value) {
    case 'US Citizen':
      return DomicileType.Citizen;
    case 'Visa':
      return DomicileType.Visa;
    case 'Green Card':
      return DomicileType.GreenCard;
    default:
      return undefined;
  }
};

export const StepCorporateApplicantsDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_DETAILS,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants } = fields;

    return !!_willHaveMajorStakeholderApplicants;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues = getDefaultValuesForApplicantWithoutIdentification(storeFields, DraftAccountType.Corporate);

    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(APPLICANT_WITHOUT_IDENTIFICATION),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      fields.domicile = mapToDomicile(fields.domicile);
      fields.dateOfBirth = fields.dateOfBirth?.replaceAll('/', '-');

      await updateStoreFields({ _currentCompanyMajorStakeholder: fields });
      moveToNextStep();
    };

    return (
      <>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="Enter the following information for your applicant."
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="firstName"
            inputProps={{ placeholder: 'First Name', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="middleName"
            inputProps={{ placeholder: 'Middle Name (Optional)', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="lastName"
            inputProps={{ placeholder: 'Last Name', dark: true }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="dateOfBirth"
            inputProps={{ placeholder: 'DOB (MM/DD/YYYY)', dark: true, mask: Masks.DATE_MMDDYYYY }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="socialSecurityNumber"
            inputProps={{ placeholder: 'SSN', maskedPlaceholder: '000-00-0000', dark: true, mask: SSN_MASK }}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="residentialAddress"
            inputProps={{ placeholder: 'Residential Address', dark: true }}
          />
          <Controller
            type="dropdown"
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="domicile"
            dropdownProps={{
              placeholder: 'Domicile',
              dark: true,
              data: RESIDENCY_STATUS_OPTIONS,
              defaultValue: defaultValues?.domicile,
            }}
          />
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={shouldButtonBeDisabled}
            variant="primary"
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

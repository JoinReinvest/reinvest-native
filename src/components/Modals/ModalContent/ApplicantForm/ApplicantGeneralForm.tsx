import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { STAKEHOLDER_RESIDENCY_STATUS_LABELS, STAKEHOLDER_RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';
import { z } from 'zod';

import { Button } from '../../../../components/Button';
import { FormTitle } from '../../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../../components/PaddedScrollView';
import { Controller } from '../../../../components/typography/Controller';
import { SSN_MASK } from '../../../../constants/masks';
import { ApplicantFormFields, mapDomicileLabelToDomicileType } from '../../../../screens/Onboarding/utilities';
import { dateOlderThanEighteenYearsSchema, formValidationRules } from '../../../../utils/formValidationRules';
import { styles } from '../styles';
import { ApplicantFormStepProps } from './types';

export const schema = z.object({
  firstName: formValidationRules.firstName,
  middleName: formValidationRules.middleName,
  lastName: formValidationRules.lastName,
  socialSecurityNumber: z.string().min(1),
  dateOfBirth: dateOlderThanEighteenYearsSchema,
  domicile: z.enum(STAKEHOLDER_RESIDENCY_STATUS_LABELS),
});

export const ApplicantGeneralForm = ({ isVisible, defaultValues, onContinue }: ApplicantFormStepProps) => {
  const { control, formState, handleSubmit } = useForm<ApplicantFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
    defaultValues,
  });

  const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

  const onSubmit: SubmitHandler<ApplicantFormFields> = fields => {
    onContinue({ ...fields, domicile: mapDomicileLabelToDomicileType(fields.domicile) });
  };

  return (
    <View
      pointerEvents={isVisible ? 'auto' : 'none'}
      style={[styles.fw, !isVisible ? { height: 0, opacity: 0 } : { height: '100%', opacity: 1 }]}
    >
      <PaddedScrollView style={styles.fw}>
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
          inputProps={{ placeholder: 'Date of birth', maskedPlaceholder: 'MM/DD/YYYY', dark: true, mask: Masks.DATE_MMDDYYYY }}
        />
        <Controller
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="socialSecurityNumber"
          inputProps={{ placeholder: 'SSN', maskedPlaceholder: '000-00-0000', dark: true, mask: SSN_MASK }}
        />
        <Controller
          type="dropdown"
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          fieldName="domicile"
          dropdownProps={{
            placeholder: 'Domicile',
            dark: true,
            data: STAKEHOLDER_RESIDENCY_STATUS_OPTIONS,
            defaultValue: defaultValues?.domicile,
          }}
        />
      </PaddedScrollView>
      <Button
        disabled={shouldButtonBeDisabled}
        variant="primary"
        onPress={handleSubmit(onSubmit)}
      >
        Continue
      </Button>
    </View>
  );
};

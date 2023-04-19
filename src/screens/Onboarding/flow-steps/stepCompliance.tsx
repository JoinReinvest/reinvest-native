import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { RadioButton } from '../../../components/RadioButton';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

type Fields = OnboardingFormFields['compliances'] & {
  doNoneApply: boolean;
};

const getInitialValues = ({ compliances }: OnboardingFormFields): Fields => {
  const hasCompliances = compliances && Object.values(compliances).some(Boolean);

  if (hasCompliances) {
    return { ...compliances, doNoneApply: false };
  }

  return {
    isAssociatedWithFinra: false,
    isAssociatedWithPubliclyTradedCompany: false,
    isSeniorPoliticalFigure: false,
    doNoneApply: false,
  };
};

const schema = z
  .object({
    isAssociatedWithFinra: z.boolean().optional(),
    isAssociatedWithPubliclyTradedCompany: z.boolean().optional(),
    isSeniorPoliticalFigure: z.boolean().optional(),
    doNoneApply: z.boolean().optional(),
  })
  .superRefine(({ isAssociatedWithFinra, isAssociatedWithPubliclyTradedCompany, isSeniorPoliticalFigure, doNoneApply }, context) => {
    const compliances = {
      isAssociatedWithFinra,
      isAssociatedWithPubliclyTradedCompany,
      isSeniorPoliticalFigure,
    };

    const areSomeCompliancesTrue = Object.values(compliances).some(Boolean);
    const areAllCompliancesFalse = Object.values(compliances).every(value => !value);
    const isDoNoneApplyChecked = !!doNoneApply;
    const hasSomeCompliancesAndDoNoneApply = areSomeCompliancesTrue && isDoNoneApplyChecked;
    const hasAllCompliancesAndDoNoneApply = areAllCompliancesFalse && !isDoNoneApplyChecked;

    if (hasSomeCompliancesAndDoNoneApply || hasAllCompliancesAndDoNoneApply) {
      context.addIssue({
        path: ['doNoneApply'],
        code: 'custom',
        message: 'Please select only one option',
      });
    }
  });

export const StepCompliance: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPLIANCES,

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { handleSubmit, setValue, getValues, control, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: getInitialValues(storeFields),
    });

    const onFieldComplianceChange = (key: Exclude<FieldPath<Fields>, 'doNoneApply'>, value: boolean) => {
      const hasFieldDoNoneApplyChecked = !!getValues('doNoneApply');

      if (hasFieldDoNoneApplyChecked) {
        setValue('doNoneApply', false);
      }

      setValue(key, value);
    };

    const onFieldDoNoneApplyChange = (value: boolean) => {
      if (value) {
        setValue('isAssociatedWithFinra', false);
        setValue('isAssociatedWithPubliclyTradedCompany', false);
        setValue('isSeniorPoliticalFigure', false);
      }

      setValue('doNoneApply', value);
    };

    const onSubmit: SubmitHandler<Fields> = async ({ isAssociatedWithFinra, isAssociatedWithPubliclyTradedCompany, isSeniorPoliticalFigure }) => {
      const compliances: OnboardingFormFields['compliances'] = {
        isAssociatedWithFinra,
        isAssociatedWithPubliclyTradedCompany,
        isSeniorPoliticalFigure,
      };

      await updateStoreFields({ compliances });
      moveToNextStep();
    };

    const watchAllFields = watch();
    const isAnyOptionChosen = Object.values(watchAllFields).some(Boolean);

    return (
      <>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Do any of the following apply to you?"
          />
          {options.map(option => {
            return (
              <Box
                mt="16"
                key={option.name}
              >
                <Controller
                  name={option.name}
                  control={control}
                  render={({ field }) => (
                    <RadioButton
                      onPress={() => {
                        option.name !== 'doNoneApply' ? onFieldComplianceChange(option.name, !field.value) : onFieldDoNoneApplyChange(!field.value);
                      }}
                      value={option.name}
                      checked={!!field.value}
                    >
                      {option.description}
                    </RadioButton>
                  )}
                />
              </Box>
            );
          })}
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            disabled={!isAnyOptionChosen}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

const options = [
  {
    name: 'isAssociatedWithFinra',
    description:
      'Are you or anyone in your immediate household, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or\n' +
      'greater) of the equity, associated with a FINRA member, organization, or the SEC.',
  },
  {
    name: 'isAssociatedWithPubliclyTradedCompany',
    description:
      'Are you or anyone in your household or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity holder, an officer, or member of the board of directors of a publicly traded company?',
  },
  {
    name: 'isSeniorPoliticalFigure',
    description: 'Are you or any of your immediate family a senior political figure?',
  },
  {
    name: 'doNoneApply',
    description: ' None of the above apply',
  },
] as const;

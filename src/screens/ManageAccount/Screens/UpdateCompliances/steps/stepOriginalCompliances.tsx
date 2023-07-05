import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import z from 'zod';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { RadioButton } from '../../../../../components/RadioButton';
import { StyledText } from '../../../../../components/typography/StyledText';
import { options } from '../constants';
import { UpdateCompliancesFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = UpdateCompliancesFormFields['compliances'] & {
  doNoneApply: boolean;
};

const getInitialValues = ({ compliances }: UpdateCompliancesFormFields): Fields => {
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

export const StepOriginalCompliances: StepParams<UpdateCompliancesFormFields> = {
  identifier: Identifiers.COMPLIANCES,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<UpdateCompliancesFormFields>) => {
    const { control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: getInitialValues(storeFields),
    });

    const hasAnyCompliances = Object.values(storeFields.compliances).some(Boolean);

    return (
      <>
        <PaddedScrollView>
          <StyledText>Your compliance statements</StyledText>
          {options.map(option => {
            return (
              <Box
                mt="16"
                key={option.name}
              >
                <Controller
                  name={option.name}
                  control={control}
                  render={({ field }) => {
                    return (
                      <RadioButton
                        bold
                        dark={false}
                        value={option.name}
                        checked={option.name === 'doNoneApply' ? !hasAnyCompliances : !!field.value}
                      >
                        {option.description}
                      </RadioButton>
                    );
                  }}
                />
              </Box>
            );
          })}
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button onPress={moveToNextStep}>Update</Button>
        </Box>
      </>
    );
  },
};

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { styles } from '../../Onboarding/flow-steps/styles';
import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<BeneficiaryCreationFormFields, 'firstName' | 'lastName'>>;

const schema = z.object({
  firstName: formValidationRules.firstName,
  lastName: formValidationRules.lastName,
});

export const StepFullName: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.FULL_NAME,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const defaultValues: Fields = { firstName: storeFields?.firstName || '', lastName: storeFields?.lastName || '' };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ firstName, lastName }) => {
      await updateStoreFields({ firstName, lastName });
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView>
          <Box
            pt={'24'}
            pb={'16'}
          >
            <StyledText variant="paragraphLarge">Enter your beneficiary’s name</StyledText>
          </Box>
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="firstName"
            inputProps={{ placeholder: 'First Name' }}
          />

          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="lastName"
            inputProps={{ placeholder: 'Last Name' }}
          />
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

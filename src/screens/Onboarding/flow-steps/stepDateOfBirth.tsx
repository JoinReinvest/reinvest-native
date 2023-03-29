import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Alert, ScrollView, View } from 'react-native';
import { Masks } from 'react-native-mask-input';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller'
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { dateOlderThanEighteenYearsSchema } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from './index';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'dateOfBirth'>;

const schema = z.object({
  dateOfBirth: dateOlderThanEighteenYearsSchema,
});

export const StepDateOfBirth: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DATE_OF_BIRTH,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ dateOfBirth }) => {
      await updateStoreFields({ dateOfBirth });
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView>
          <FormTitle
            dark
            headline={'Enter your date of birth'}
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName={'dateOfBirth'}
            inputProps={{
              placeholder: 'Date of Birth',
              dark: true,
              keyboardType: 'numeric',
              mask: Masks.DATE_MMDDYYYY,
              maskedPlaceholder: 'MM/DD/YYYY',
            }}
          />
          <Box
            style={styles.row}
            mt="4"
          >
            <StyledText
              color={palette.frostGreen}
              variant="link"
              onPress={() => Alert.alert('Required. Why?')}
            >
              Required. Why?
            </StyledText>
          </Box>
        </ScrollView>
        <View
          key={'buttons_section'}
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

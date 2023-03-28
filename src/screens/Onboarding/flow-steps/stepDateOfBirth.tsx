import React from 'react';
import {ScrollView, View, Alert} from 'react-native';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';
import {styles} from './styles';
import {Button} from '@components/Button';
import {FormTitle} from '@components/Forms/FormTitle';
import {OnboardingFormFields} from '../types';
import {Identifiers} from '../identifiers';
import {z} from 'zod';
import {SubmitHandler, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller} from '@src/components/typography/Controller';
import {Masks} from 'react-native-mask-input';
import {dateOlderThanEighteenYearsSchema} from '@src/utils/formValidationRules';
import {useOnboardingFormFlow} from '.';
import {ProgressBar} from '@src/components/ProgressBar';
import {StyledText} from '@src/components/typography/StyledText';
import {palette} from '@src/constants/theme';
import {Box} from '@src/components/Containers/Box/Box';

type Fields = Pick<OnboardingFormFields, 'dateOfBirth'>;

const schema = z.object({
  dateOfBirth: dateOlderThanEighteenYearsSchema,
});

export const StepDateOfBirth: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DATE_OF_BIRTH,

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<OnboardingFormFields>) => {
    const {progressPercentage} = useOnboardingFormFlow();
    const {formState, control, handleSubmit} = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({dateOfBirth}) => {
      await updateStoreFields({dateOfBirth});
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView>
          <FormTitle dark headline={'Enter your date of birth'} />
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
          <Box style={styles.row} mt="4">
            <StyledText
              color={palette.frostGreen}
              variant="link"
              onPress={() => Alert.alert('Required. Why?')}>
              Required. Why?
            </StyledText>
          </Box>
        </ScrollView>
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </View>
      </>
    );
  },
};

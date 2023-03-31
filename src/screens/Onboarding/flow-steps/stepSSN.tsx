import { Button } from '@components/Button';
import { FormTitle } from '@components/Forms/FormTitle';
import { Controller } from '@components/typography/Controller';
import { StyledText } from '@components/typography/StyledText';
import { palette } from '@constants/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box } from '@src/components/Containers/Box/Box';
import { FormModalDisclaimer } from '@src/components/Modals/ModalContent/FormModalDisclaimer';
import { ProgressBar } from '@src/components/ProgressBar';
import { SSN_MASK } from '@src/constants/masks';
import { useDialog } from '@src/providers/DialogProvider';
import { formValidationRules } from '@utils/formValidationRules';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import zod from 'zod';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'ssn'>;

const schema = zod.object({
  ssn: formValidationRules.socialSecurityNumber,
});

export const StepSSN: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SOCIAL_SECURITY_NUMBER,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog } = useDialog();

    const defaultValues: Fields = {
      ssn: storeFields.ssn || '',
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ ssn }) => {
      if (!ssn) {
        return;
      }

      ssn = ssn.replaceAll('-', '');

      await updateStoreFields({
        ssn,
        _isSocialSecurityNumberAlreadyAssigned: false,
        _isSocialSecurityNumberBanned: false,
      });
      moveToNextStep();
    };

    const openRequiredModal = () => {
      openDialog(
        <FormModalDisclaimer
          headline="Required Why?"
          content="CONTENT"
        />,
      );
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline="What's your social security number"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="ssn"
            inputProps={{
              placeholder: 'SSN',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 11, // xxx-xx-xxxx
              mask: SSN_MASK,
            }}
          />
          <View style={styles.row}>
            <StyledText
              variant="link"
              color={palette.frostGreen}
              onPress={openRequiredModal}
            >
              Required. Why?
            </StyledText>
          </View>
          <Box mt="24">
            <StyledText
              color={palette.pureWhite}
              variant="paragraphLarge"
            >
              *REINVEST is required by law to collect your social security number.
            </StyledText>
            <Box mt="4">
              <StyledText
                color={palette.dark3}
                variant="paragraphLarge"
              >
                We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.
              </StyledText>
            </Box>
          </Box>
        </ScrollView>
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

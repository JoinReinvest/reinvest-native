import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { EIN_MASK } from '../../../constants/masks';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'ein'>;

const schema = z.object({
  ein: formValidationRules.ein,
});

export const StepEIN: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EIN,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate || accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    return fields.accountType !== DraftAccountType.Individual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog } = useDialog();

    const defaultValues: Fields = {
      ein: storeFields.ein,
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'onBlur',
      defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ ein }) => {
      if (!ein) {
        return;
      }

      ein = ein.replaceAll('-', '');
      await updateStoreFields({ ein });
      moveToNextStep();
    };

    const openEinDialog = () => {
      openDialog(
        <FormModalDisclaimer
          headline="EIN?"
          content="CONTENT"
        />,
      );
    };

    const openIDoNotHaveEinDialog = () => {
      openDialog(
        <FormModalDisclaimer
          headline="I do not have an ein"
          content="CONTENT"
        />,
      );
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Enter your EIN"
          />
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="ein"
            inputProps={{
              placeholder: '000-000000',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 10, // xxx-xxxxxx
              mask: EIN_MASK,
            }}
          />
          <View style={styles.row}>
            <StyledText
              variant="link"
              color={palette.frostGreen}
              onPress={openEinDialog}
            >
              EIN?
            </StyledText>
            <StyledText
              variant="link"
              color={palette.frostGreen}
              onPress={openIDoNotHaveEinDialog}
            >
              I do not have an EIN
            </StyledText>
          </View>
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

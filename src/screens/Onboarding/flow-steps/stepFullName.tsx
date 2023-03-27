import { Button } from '@components/Button';
import { FormTitle } from '@components/Forms/FormTitle';
import { KeyboardAwareWrapper } from '@components/KeyboardAvareWrapper';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/form-flow/interfaces';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

export const StepFullName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FULL_NAME,

  Component: ({}: StepComponentProps<OnboardingFormFields>) => {
    return (
      <KeyboardAwareWrapper style={[styles.wrapper]}>
        <ScrollView>
          <FormTitle
            dark
            headline={'Enter your first and last name as it appears on your ID'}
          />
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button isLoading={false}>Continue</Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};

import React from 'react';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/form-flow/interfaces';

import {ScrollView, View} from 'react-native';
import {styles} from './styles';
import {Button} from '@components/Button';
import {KeyboardAwareWrapper} from '@components/KeyboardAvareWrapper';
import {FormTitle} from '@components/Forms/FormTitle';
import {OnboardingFormFields} from '../types';
import {Identifiers} from '../identifiers';

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
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button isLoading={false}>Continue</Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};

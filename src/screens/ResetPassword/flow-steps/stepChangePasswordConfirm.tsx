import { Button } from '@components/Button';
import { StatusCircle } from '@components/StatusCircle';
import { useLogOutNavigation } from '@src/navigation/hooks';
import Screens from '@src/navigation/screens';
import { allRequiredFieldsExists } from '@utils/formValidator';
import React from 'react';
import { View } from 'react-native';
import { StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Identifiers } from '../identifires';
import { ResetPasswordFormFields } from '../types';
import { styles } from './styles';

export const StepChangePasswordConfirm: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.FLOW_COMPLETION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.authenticationCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const navigation = useLogOutNavigation();

    const goBackToLoginForm = () => {
      navigation.navigate(Screens.SignIn);
    };

    return (
      <View style={[styles.wrapper, styles.fw]}>
        <StatusCircle title="Your Password Has Been Reset" />
        <Button onPress={goBackToLoginForm}>Continue</Button>
      </View>
    );
  },
};

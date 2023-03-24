import React from 'react';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow/interfaces';
import {Button} from '@components/Button';
import {View} from 'react-native';
import {StatusCircle} from '@components/StatusCircle';
import {allRequiredFieldsExists} from '@utils/formValidator';
import {ResetPasswordFormFields} from '../types';
import Screens from '@src/navigation/screens';
import {useLogOutNavigation} from '@src/navigation/hooks';
import {styles} from './styles';
import {Identifiers} from '../identifires';

export const StepChangePasswordConfirm: StepParams<ResetPasswordFormFields> = {
  identifier: Identifiers.FLOW_COMPLETION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.authenticationCode];
    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({}: StepComponentProps<ResetPasswordFormFields>) => {
    const navigation = useLogOutNavigation();

    const goBackToLoginForm = () => {
      navigation.navigate(Screens.SignIn);
    };
    return (
      <View style={styles.wrapper}>
        <StatusCircle title="Your Password Has Been Reset" />
        <Button onPress={goBackToLoginForm}>Continue</Button>
      </View>
    );
  },
};

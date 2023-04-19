import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Icon } from '../../components/Icon';
import { palette } from '../../constants/theme';
import { LogoutProps } from '../../navigation/LogOutNavigator/types';
import Screens from '../../navigation/screens';
import { initialSteps, ResetPasswordFormFlowProvider } from '../ResetPassword/flow-steps';
import { SignInStackParamsList } from '../SignIn/types';
import { BlackLayout } from './BlackLayout';

const ResetPasswordStack = createNativeStackNavigator<SignInStackParamsList>();

const blackScreenFormOptions = (props: LogoutProps<Screens.BlackForm>) => ({
  title: 'Reset Password',
  headerStyle: {
    backgroundColor: palette.onboarding,
  },
  headerTintColor: palette.darkerGray,
  headerLeft: () => (
    <Icon
      color={palette.pureWhite}
      icon="down"
      style={{ transform: [{ rotate: '90deg' }] }}
      onPress={props.navigation.goBack}
    />
  ),
});

export const ResetPassword = () => {
  return (
    <ResetPasswordFormFlowProvider initialStoreFields={initialSteps}>
      <ResetPasswordStack.Navigator>
        <ResetPasswordStack.Screen
          name={Screens.BlackForm}
          component={BlackLayout}
          options={blackScreenFormOptions}
        />
      </ResetPasswordStack.Navigator>
    </ResetPasswordFormFlowProvider>
  );
};

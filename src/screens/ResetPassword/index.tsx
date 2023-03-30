import { Icon } from '@components/Icon';
import { palette } from '@constants/theme';
import Screens from '@navigation/screens';
import type { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initialSteps, ResetPasswordFormFlowProvider } from '@screens/ResetPassword/flow-steps';
import React from 'react';

import { SignInStackParamsList } from '../SignIn/types';
import { BlackLayout } from './BlackLayout';

const ResetPasswordStack = createNativeStackNavigator<SignInStackParamsList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blackScreenFormOptions = (props: { navigation: any; route: RouteProp<SignInStackParamsList, Screens.BlackForm> }) => ({
  title: 'Reset Password',
  headerStyle: {
    backgroundColor: palette.onboarding,
  },
  headerTintColor: palette.darkerGray,
  headerLeft: () => (
    <Icon
      color={palette.pureWhite}
      icon={'arrowLeft'}
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

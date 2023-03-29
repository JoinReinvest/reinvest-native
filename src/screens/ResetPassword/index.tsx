import type { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Icon } from '../../components/Icon';
import { palette } from '../../constants/theme';
import Screens from '../../navigation/screens';
import { SignInScreenProps, SignInStackParamsList } from '../SignIn/types';
import { BlackLayout } from './BlackLayout';
import { initialSteps, ResetPasswordFormFlowProvider } from './flow-steps';

const ResetPasswordStack = createNativeStackNavigator<SignInStackParamsList>();

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

export const ResetPassword = ({}: SignInScreenProps) => {
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

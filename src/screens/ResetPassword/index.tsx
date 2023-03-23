import React from 'react';
import type {
  SignInScreenProps,
  SignInStackParamsList,
} from '@screens/SignIn/SignIn.types';
import {
  initialSteps,
  ResetPasswordFormFlowProvider,
} from '@screens/ResetPassword/flow-steps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '@navigation/screens';
import {palette} from '@constants/theme';
import {Icon} from '@components/Icon';
import {BlackLayout} from './BlackLayout';
import type {RouteProp} from '@react-navigation/native';

const ResetPasswordStack = createNativeStackNavigator<SignInStackParamsList>();

const blackScreenFormOptions = (props: {
  route: RouteProp<SignInStackParamsList, Screens.BlackForm>;
  navigation: any;
}) => ({
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

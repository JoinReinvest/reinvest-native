import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Screens from '../../navigation/screens';
import { initialSteps, ResetPasswordFormFlowProvider } from '../ResetPassword/flow-steps';
import { SignInStackParamsList } from '../SignIn/types';
import { BlackLayout } from './BlackLayout';

const ResetPasswordStack = createNativeStackNavigator<SignInStackParamsList>();

export const ResetPassword = () => {
  return (
    <ResetPasswordFormFlowProvider initialStoreFields={initialSteps}>
      <ResetPasswordStack.Navigator>
        <ResetPasswordStack.Screen
          name={Screens.BlackForm}
          component={BlackLayout}
          options={{ headerShown: false }}
        />
      </ResetPasswordStack.Navigator>
    </ResetPasswordFormFlowProvider>
  );
};

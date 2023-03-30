import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import { DarkScreenHeader } from '../../components/CustomHeader';
import { FirstStepLayout } from '../../components/Layouts/FirstStepLayout';
import { LogoutProps } from '../../navigation/LogOutNavigator/types';
import Screens from '../../navigation/screens';
import { BlackLayout } from './BlackLayout';
import { formFieldsInitialState, RegisterFormFlowProvider } from './flow-steps';
import { StepOutsideFlow } from './flow-steps/stepEmail';
import { SignUpStackParamsList } from './types';

const SignUpStack = createNativeStackNavigator<SignUpStackParamsList>();

const stackOptions: Record<Extract<Screens, Screens.BlackForm>, NativeStackNavigationOptions> = {
  [Screens.BlackForm]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
};

export const SignUp = ({ route: { params } }: LogoutProps<Screens.SignUp>) => {
  const initialState = {
    ...formFieldsInitialState,
    //TODO remove concatenation while removing masks for this input
    referralCode: params?.referralCode ? `${params?.referralCode.substring(0, 3)}-${params?.referralCode.substring(3)}` : '',
  };

  return (
    <RegisterFormFlowProvider initialStoreFields={initialState}>
      <SignUpStack.Navigator>
        <SignUpStack.Screen
          options={{ headerShown: false }}
          name={Screens.FirstStepLayoutScreen}
        >
          {() => (
            <FirstStepLayout
              headline="Sign up"
              description="Enter your email below to get started."
            >
              <StepOutsideFlow initialSteps={initialState} />
            </FirstStepLayout>
          )}
        </SignUpStack.Screen>
        <SignUpStack.Screen
          name={Screens.BlackForm}
          component={BlackLayout}
          options={stackOptions[Screens.BlackForm]}
        />
      </SignUpStack.Navigator>
    </RegisterFormFlowProvider>
  );
};

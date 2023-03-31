import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import { DarkScreenHeader } from '../../components/CustomHeader';
import { FirstStepLayout } from '../../components/Layouts/FirstStepLayout';
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

export const SignUp = () => {
  return (
    <RegisterFormFlowProvider initialStoreFields={formFieldsInitialState}>
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
              <StepOutsideFlow initialSteps={formFieldsInitialState} />
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

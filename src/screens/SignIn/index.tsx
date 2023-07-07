import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { DarkScreenHeader } from '../../components/CustomHeader';
import { FirstStepLayout } from '../../components/Layouts/FirstStepLayout';
import Screens from '../../navigation/screens';
import { BlackLayout as BlackLayoutSignIn } from './BlackLayout';
import { initialSteps, LoginFormFlowProvider } from './flow-steps';
import { StepOutsideFlow } from './flow-steps/stepLogin';
import type { SignInStackParamsList } from './types';

const SignInStack = createNativeStackNavigator<SignInStackParamsList>();

export const SignIn = () => {
  return (
    <LoginFormFlowProvider initialStoreFields={initialSteps}>
      <SignInStack.Navigator>
        <SignInStack.Screen
          options={{ headerShown: false }}
          name={Screens.FirstStepLayoutScreen}
        >
          {() => (
            <FirstStepLayout
              headline="Sign In"
              description="Building your wealth while rebuilding our communities."
            >
              <StepOutsideFlow initialSteps={initialSteps} />
            </FirstStepLayout>
          )}
        </SignInStack.Screen>
        <SignInStack.Screen
          name={Screens.BlackForm}
          component={BlackLayoutSignIn}
          options={{
            header: props => (
              <DarkScreenHeader
                {...props}
                options={{ title: 'logo' }}
              />
            ),
          }}
        />
      </SignInStack.Navigator>
    </LoginFormFlowProvider>
  );
};

import { Icon } from '@components/Icon';
import { FirstStepLayout } from '@components/Layouts/FirstStepLayout';
import { palette } from '@constants/theme';
import Screens from '@navigation/screens';
import type { RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initialSteps, LoginFormFlowProvider } from '@screens/SignIn/flow-steps';
import { StepOutsideFlow } from '@screens/SignIn/flow-steps/stepLogin';
import React from 'react';

import { BlackLayout as BlackLayoutSignIn } from './BlackLayout';
import type { SignInStackParamsList } from './types';

const SignInStack = createNativeStackNavigator<SignInStackParamsList>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blackScreenSignInFormOptions = (props: { navigation: any; route: RouteProp<SignInStackParamsList, Screens.BlackForm> }) => ({
  title: 'Sign In',
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
              headline={'Sign in'}
              description={'Building your wealth while rebuilding our communities.'}
            >
              <StepOutsideFlow initialSteps={initialSteps} />
            </FirstStepLayout>
          )}
        </SignInStack.Screen>
        <SignInStack.Screen
          name={Screens.BlackForm}
          component={BlackLayoutSignIn}
          options={blackScreenSignInFormOptions}
        />
      </SignInStack.Navigator>
    </LoginFormFlowProvider>
  );
};

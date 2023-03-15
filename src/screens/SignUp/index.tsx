import React from 'react';
import {
  formFieldsInitialState,
  RegisterFormFlowProvider,
} from '@screens/SignUp/flow-steps';
import Screens from '@navigation/screens';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {SignUpStackParamsList} from './SignUp.types';
import {BlackLayout} from './BlackLayout';
import {FirstStepLayout} from '@components/Layouts/FirstStepLayout';
import {StepOutsideFlow} from '@screens/SignUp/flow-steps/stepEmail';
import {DarkScreenHeader} from '@components/CustomHeader';

const SignUpStack = createNativeStackNavigator<SignUpStackParamsList>();

const stackOptions: Record<
  Extract<Screens, Screens.BlackForm | Screens.FirstStepLayoutScreen>,
  NativeStackNavigationOptions
> = {
  [Screens.BlackForm]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
  [Screens.FirstStepLayoutScreen]: {
    headerShown: false,
  },
};

export const SignUp = () => {
  return (
    <RegisterFormFlowProvider initialStoreFields={formFieldsInitialState}>
      <SignUpStack.Navigator>
        <SignUpStack.Screen
          options={{headerShown: false}}
          name={Screens.FirstStepLayoutScreen}>
          {() => (
            <FirstStepLayout
              headline="Sign up"
              description="Enter your email below to get started.">
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

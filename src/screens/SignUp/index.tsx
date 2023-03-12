import React from 'react';
import {
  formFieldsInitialState,
  RegisterFormFlowProvider,
} from '@screens/SignUp/flow-steps';
import Screens from '@navigation/screens';
import {palette} from '@constants/theme';
import {Icon} from '@components/Icon';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SignUpStackParamsList} from './SignUp.types';
import {BlackLayout} from './BlackLayout';
import {FirstStepLayout} from '@components/Layouts/FirstStepLayout';
import {StepOutsideFlow} from '@screens/SignUp/flow-steps/stepEmail';

const SignUpStack = createNativeStackNavigator<SignUpStackParamsList>();

export const SignUp = () => {
  return (
    <RegisterFormFlowProvider initialStoreFields={formFieldsInitialState}>
      <SignUpStack.Navigator>
        <SignUpStack.Screen
          options={{headerShown: false}}
          name={Screens.FirstStepLogOut}>
          {() => (
            <FirstStepLayout
              headline={'Sign up'}
              description={'Enter your email below to get started.'}>
              <StepOutsideFlow initialSteps={formFieldsInitialState} />
            </FirstStepLayout>
          )}
        </SignUpStack.Screen>
        <SignUpStack.Screen
          name={Screens.BlackForm}
          component={BlackLayout}
          options={props => ({
            title: 'Sign Up',
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
          })}
        />
      </SignUpStack.Navigator>
    </RegisterFormFlowProvider>
  );
};

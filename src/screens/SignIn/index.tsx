import React from 'react';

import type {SignInScreenProps, SignInStackParamsList} from './SignIn.types';

import {initialSteps, LoginFormFlowProvider} from '@screens/SignIn/flow-steps';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '@navigation/screens';
import {palette} from '@constants/theme';
import {FirstStepLayout} from '@components/Layouts/FirstStepLayout';
import {Icon} from '@components/Icon';
import {BlackLayout} from './BlackLayout';
import {StepOutsideFlow} from '@screens/SignIn/flow-steps/stepLogin';
import type {RouteProp} from '@react-navigation/native';

const SignInStack = createNativeStackNavigator<SignInStackParamsList>();

const blackScreenFormOptions = (props: {
  route: RouteProp<SignInStackParamsList, Screens.BlackForm>;
  navigation: any;
}) => ({
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

export const SignIn = ({}: SignInScreenProps) => {
  return (
    <LoginFormFlowProvider initialStoreFields={initialSteps}>
      <SignInStack.Navigator>
        <SignInStack.Screen
          options={{headerShown: false}}
          name={Screens.FirstStepLogOut}>
          {() => (
            <FirstStepLayout
              headline={'Sign in'}
              description={
                'Building your wealth while rebuilding our communities.'
              }>
              <StepOutsideFlow initialSteps={initialSteps} />
            </FirstStepLayout>
          )}
        </SignInStack.Screen>
        <SignInStack.Screen
          name={Screens.BlackForm}
          component={BlackLayout}
          options={blackScreenFormOptions}
        />
      </SignInStack.Navigator>
    </LoginFormFlowProvider>
  );
};

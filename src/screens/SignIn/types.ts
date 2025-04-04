import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { LogOutStackParamList } from '../../navigation/LogOutNavigator/types';
import Screens from '../../navigation/screens';

export interface SignInScreenProps {
  navigation: NativeStackNavigationProp<LogOutStackParamList, Screens.SignIn>;
}

export type SignInStackParamsList = {
  BlackForm: undefined;
  FirstStepLayoutScreen: undefined;
  Registration: undefined;
  ResetPassword: undefined;
  SignIn: undefined;
  Welcome: undefined;
};

export interface LoginFormFields {
  authenticationCode: string;
  email: string;
  password: string;
}

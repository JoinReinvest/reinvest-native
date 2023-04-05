import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Screens from '../screens';

export type LogOutStackParamList = {
  [Screens.SignUp]: { referralCode: string };
  [Screens.SignIn]: undefined;
  [Screens.BlackForm]: undefined;
  [Screens.ResetPassword]: undefined;
};

export type LogOutNavProps<T extends keyof LogOutStackParamList> = NativeStackNavigationProp<LogOutStackParamList, T>;
export type LogOutRouteProps<T extends keyof LogOutStackParamList> = RouteProp<LogOutStackParamList, T>;

export type LogoutProps<T extends keyof LogOutStackParamList> = {
  navigation: LogOutNavProps<T>;
  route: LogOutRouteProps<T>;
};

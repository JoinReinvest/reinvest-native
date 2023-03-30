import Screens from '@navigation/screens';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type LogOutStackParamList = {
  [Screens.SignUp]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.BlackForm]: undefined;
  [Screens.ResetPassword]: undefined;
};

export type LogOutNavProps<T extends keyof LogOutStackParamList> = NativeStackNavigationProp<LogOutStackParamList, T>;
export type LogOutRouteProps<T extends keyof LogOutStackParamList> = RouteProp<LogOutStackParamList, T>;

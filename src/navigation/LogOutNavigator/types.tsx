import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';
import Screens from '@navigation/screens';

export type LogOutStackParamList = {
  [Screens.SignUp]: undefined;
  [Screens.SignIn]: undefined;
  [Screens.BlackForm]: undefined;
  [Screens.ResetPassword]: undefined;
};

export type LogOutNavProps<T extends keyof LogOutStackParamList> =
  NativeStackNavigationProp<LogOutStackParamList, T>;
export type LogOutRouteProps<T extends keyof LogOutStackParamList> = RouteProp<
  LogOutStackParamList,
  T
>;

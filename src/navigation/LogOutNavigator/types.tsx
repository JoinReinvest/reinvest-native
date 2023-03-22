import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type LogOutStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  BlackForm: undefined;
};

export type LogOutNavProps<T extends keyof LogOutStackParamList> =
  NativeStackNavigationProp<LogOutStackParamList, T>;
export type LogOutRouteProps<T extends keyof LogOutStackParamList> = RouteProp<
  LogOutStackParamList,
  T
>;

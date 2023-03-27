import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type LogOutStackParamList = {
  BlackForm: undefined;
  ResetPassword: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type LogOutNavProps<T extends keyof LogOutStackParamList> = NativeStackNavigationProp<LogOutStackParamList, T>;
export type LogOutRouteProps<T extends keyof LogOutStackParamList> = RouteProp<LogOutStackParamList, T>;

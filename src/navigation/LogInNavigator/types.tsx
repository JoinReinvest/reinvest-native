import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type LogInStackParamList = {
  Dashboard: undefined;
  Home: undefined;
  Onboarding: undefined;
};

export type LogInNavProps<T extends keyof LogInStackParamList> = NativeStackNavigationProp<LogInStackParamList, T>;
export type LogInRouteProps<T extends keyof LogInStackParamList> = RouteProp<LogInStackParamList, T>;

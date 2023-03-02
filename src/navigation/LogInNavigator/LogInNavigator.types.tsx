import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type LogInStackParamList = {
  Home: undefined;
};

export type LogInNavProps<T extends keyof LogInStackParamList> =
  NativeStackNavigationProp<LogInStackParamList, T>;
export type LogInRouteProps<T extends keyof LogInStackParamList> = RouteProp<
  LogInStackParamList,
  T
>;

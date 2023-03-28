import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {BottomTabsParamsBase} from '@navigation/BottomTabsNavigator/types';
import Screens from '@navigation/screens';

export type LogInStackParamList = {
  [Screens.Dashboard]: undefined;
  [Screens.Onboarding]: undefined;
  [Screens.BottomNavigator]: NavigatorScreenParams<BottomTabsParamsBase>;
  [Screens.Settings]: undefined;
  [Screens.DEV]: undefined;
};

export type LogInNavProps<T extends keyof LogInStackParamList> =
  NativeStackNavigationProp<LogInStackParamList, T>;
export type LogInRouteProps<T extends keyof LogInStackParamList> = RouteProp<
  LogInStackParamList,
  T
>;

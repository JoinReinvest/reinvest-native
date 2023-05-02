import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { NavigationIdentifiers } from '../../constants/navigationLinks';
import { BottomTabsParamsBase } from '../BottomTabsNavigator/types';
import Screens from '../screens';

export type LogInStackParamList = {
  [Screens.Dashboard]: undefined;
  [Screens.Onboarding]: undefined;
  [Screens.BottomNavigator]: NavigatorScreenParams<BottomTabsParamsBase>;
  [Screens.Settings]: undefined;
  [Screens.ManageAccountMainScreen]: undefined;
  [Screens.ManageAccount]: { heading: string; identifier: NavigationIdentifiers };
};

export type LogInNavProps<T extends keyof LogInStackParamList> = NativeStackNavigationProp<LogInStackParamList, T>;
export type LogInRouteProps<T extends keyof LogInStackParamList> = RouteProp<LogInStackParamList, T>;

export type LogInProps<T extends keyof LogInStackParamList> = {
  navigation: LogInNavProps<T>;
  route: LogInRouteProps<T>;
};

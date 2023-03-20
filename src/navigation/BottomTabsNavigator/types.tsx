import {RouteProp} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type BottomTabsParamsBase = {
  Dashboard: undefined;
  REIT: undefined;
  Education: undefined;
  Notifications: undefined;
};

export type BottomTabsNavigationProps<T extends keyof BottomTabsParamsBase> =
  BottomTabNavigationProp<BottomTabsParamsBase, T>;
export type BottomTabsRouteProps<T extends keyof BottomTabsParamsBase> =
  RouteProp<BottomTabsParamsBase, T>;

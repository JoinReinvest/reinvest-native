import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type BottomTabsParamsBase = {
  Dashboard: undefined;
  Education: undefined;
  Notifications: undefined;
  REIT: undefined;
};

export type BottomTabsNavigationProps<T extends keyof BottomTabsParamsBase> = BottomTabNavigationProp<BottomTabsParamsBase, T>;
export type BottomTabsRouteProps<T extends keyof BottomTabsParamsBase> = RouteProp<BottomTabsParamsBase, T>;

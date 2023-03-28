import Screens from '@navigation/screens';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { EducationStackParamsList } from '@screens/Education/types';

export type BottomTabsParamsBase = {
  [Screens.Dashboard]: undefined;
  [Screens.REIT]: undefined;
  [Screens.EducationStack]: EducationStackParamsList;
  [Screens.Notifications]: undefined;
};

export type BottomTabsNavigationProps<T extends keyof BottomTabsParamsBase> = BottomTabNavigationProp<BottomTabsParamsBase, T>;
export type BottomTabsRouteProps<T extends keyof BottomTabsParamsBase> = RouteProp<BottomTabsParamsBase, T>;

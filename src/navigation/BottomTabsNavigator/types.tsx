import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

import { EducationStackParamsList } from '../../screens/Education/types';
import Screens from '../screens';

export type BottomTabsParamsBase = {
  [Screens.Dashboard]: undefined;
  [Screens.REIT]: undefined;
  [Screens.EducationStack]: EducationStackParamsList | undefined;
  [Screens.Notifications]: undefined;
};

export type BottomTabsNavigationProps<T extends keyof BottomTabsParamsBase> = BottomTabNavigationProp<BottomTabsParamsBase, T>;
export type BottomTabsRouteProps<T extends keyof BottomTabsParamsBase> = RouteProp<BottomTabsParamsBase, T>;

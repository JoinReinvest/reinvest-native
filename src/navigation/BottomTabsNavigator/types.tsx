import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { EducationStackParamsList } from '../../screens/Education/types';
import Screens from '../screens';

export type BottomTabsParamsBase = {
  [Screens.Dashboard]: undefined;
  [Screens.REIT]: undefined;
  [Screens.EducationStack]: EducationStackParamsList;
  [Screens.Notifications]: undefined;
};

export type BottomTabsNavigationProps<T extends keyof BottomTabsParamsBase> = BottomTabNavigationProp<BottomTabsParamsBase, T>;

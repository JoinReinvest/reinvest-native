import { NavigatorScreenParams } from '@react-navigation/native';

import { BottomTabsParamsBase } from '../BottomTabsNavigator/types';
import Screens from '../screens';

export type LogInStackParamList = {
  [Screens.Dashboard]: undefined;
  [Screens.Onboarding]: undefined;
  [Screens.BottomNavigator]: NavigatorScreenParams<BottomTabsParamsBase>;
  [Screens.Settings]: undefined;
  [Screens.DEV]: undefined;
};

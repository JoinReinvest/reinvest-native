import { BottomTabsParamsBase } from '@navigation/BottomTabsNavigator/types';
import Screens from '@navigation/screens';
import { NavigatorScreenParams } from '@react-navigation/native';

export type LogInStackParamList = {
  [Screens.Dashboard]: undefined;
  [Screens.Onboarding]: undefined;
  [Screens.BottomNavigator]: NavigatorScreenParams<BottomTabsParamsBase>;
  [Screens.Settings]: undefined;
  [Screens.DEV]: undefined;
};

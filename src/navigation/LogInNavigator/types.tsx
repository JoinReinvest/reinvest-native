import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountType, BankAccount, Notification as BaseNotification, VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { NavigationIdentifiers } from '../../constants/navigationLinks';
import { BottomTabsParamsBase } from '../BottomTabsNavigator/types';
import Screens from '../screens';

export type LogInStackParamList = {
  [Screens.Dashboard]: undefined;
  [Screens.Onboarding]: undefined;
  [Screens.Investing]: { accountId?: string; bankAccount?: BankAccount; initialInvestment?: boolean; validationSuccess?: boolean };
  [Screens.AddBeneficiary]: undefined;
  [Screens.BottomNavigator]: NavigatorScreenParams<BottomTabsParamsBase>;
  [Screens.Settings]: undefined;
  [Screens.ManageAccountMainScreen]: undefined;
  [Screens.ManageAccount]: { heading: string; identifier: NavigationIdentifiers; cancellable?: boolean };
  [Screens.BankAccount]: { sourceScreen: Screens.Investing; isUpdatingAccount?: boolean };
  [Screens.KYCFail]: { actions: VerificationAction[] };
  [Screens.Locked]: { action: VerificationAction; accountType?: AccountType };
  [Screens.NotificationDetails]: { notification: BaseNotification };
  [Screens.TradeSummary]: { investmentId: string };
  [Screens.DividendsPayout]: undefined;
  [Screens.InvestingAccountSelection]: undefined;
};

export type LogInNavProps<T extends keyof LogInStackParamList> = NativeStackNavigationProp<LogInStackParamList, T>;
export type LogInRouteProps<T extends keyof LogInStackParamList> = RouteProp<LogInStackParamList, T>;

export type LogInProps<T extends keyof LogInStackParamList> = {
  navigation: LogInNavProps<T>;
  route: LogInRouteProps<T>;
};

import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  AccountType,
  BankAccount,
  InvestmentSummary,
  Notification as BaseNotification,
  Property,
  Usd,
  VerificationAction,
} from 'reinvest-app-common/src/types/graphql';

import { PropertyMock } from '../../screens/REIT/types';
import { Link } from '../../types/link';
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
  [Screens.ManageAccount]: { options: Partial<Link> };
  [Screens.BankAccount]: { accountId?: string; isUpdatingAccount?: boolean };
  [Screens.KYCFail]: { actions: VerificationAction[]; fees?: Usd; oneTimeInvestmentId?: string; recurringInvestmentId?: string };
  [Screens.Locked]: { action: VerificationAction; accountType?: AccountType; canGoBack?: boolean };
  [Screens.NotificationDetails]: { notification: BaseNotification };
  [Screens.PropertyDetails]: { property: Property };
  [Screens.TradeSummary]: { heading?: string; investmentId?: string; investmentSummary?: InvestmentSummary };
  [Screens.DividendsPayout]: undefined;
  [Screens.InvestingAccountSelection]: undefined;
};

export type LogInNavProps<T extends keyof LogInStackParamList> = NativeStackNavigationProp<LogInStackParamList, T>;
export type LogInRouteProps<T extends keyof LogInStackParamList> = RouteProp<LogInStackParamList, T>;

export type LogInProps<T extends keyof LogInStackParamList> = {
  navigation: LogInNavProps<T>;
  route: LogInRouteProps<T>;
};

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { DarkScreenHeader, ScreenHeader } from '../../components/CustomHeader';
import { HeaderCancel } from '../../components/HeaderCancel';
import { Loader } from '../../components/Loader';
import { palette } from '../../constants/theme';
import { DialogProvider } from '../../providers/DialogProvider';
import { AddBeneficiary } from '../../screens/AddBeneficiary';
import { BankAccount } from '../../screens/BankAccount';
import { BannedScreen } from '../../screens/BannedScreen';
import { DividendsPayoutScreen } from '../../screens/DividendsPayout';
import FeesApproval from '../../screens/FeesApproval';
import { Investing } from '../../screens/Investing';
import { InvestingAccountSelection } from '../../screens/InvestingAccountSelection';
import { KYCFail } from '../../screens/KYCFail';
import { ManageAccountMainScreen } from '../../screens/ManageAccount';
import { ManageAccountScreen } from '../../screens/ManageAccount/Screens';
import { AccountActivityDetails } from '../../screens/ManageAccount/Screens/AccountActivity/AccountActivityDetails';
import { NotificationDetails } from '../../screens/NotificationDetails';
import { Onboarding } from '../../screens/Onboarding';
import { PropertyDetails } from '../../screens/PropertyDetails';
import { Settings } from '../../screens/Settings';
import { TradeSummary } from '../../screens/TradeSummary';
import { currentAccount, useAtom } from '../../store/atoms';
import { BottomTabsNavigator } from '../BottomTabsNavigator';
import { useLogInNavigation } from '../hooks';
import Screens from '../screens';
import { LogInStackParamList } from './types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();
type StackOptionsParametrized = ({ navigation }: { navigation: NativeStackNavigationProp<LogInStackParamList> }) => NativeStackNavigationOptions;
const stackOptions: Record<
  Extract<
    Screens,
    | Screens.Onboarding
    | Screens.ManageAccount
    | Screens.Investing
    | Screens.AddBeneficiary
    | Screens.BankAccount
    | Screens.Locked
    | Screens.NotificationDetails
    | Screens.PropertyDetails
    | Screens.TradeSummary
    | Screens.InvestingAccountSelection
    | Screens.AccountActivityDetails
    | Screens.FeesApproval
  >,
  NativeStackNavigationOptions | StackOptionsParametrized
> = {
  [Screens.Onboarding]: {
    title: 'logo',
  },
  [Screens.Locked]: {
    title: 'logo',
  },
  [Screens.Investing]: {
    title: 'Investing',
  },
  [Screens.BankAccount]: {
    title: 'logo',
  },
  [Screens.ManageAccount]: {
    title: 'Manage Account',
  },
  [Screens.PropertyDetails]: {
    title: 'Community REIT',
  },
  [Screens.AddBeneficiary]: ({ navigation }) => ({
    title: 'Add Beneficiary',
    headerRight: ({ canGoBack }) => <HeaderCancel onPress={() => canGoBack && navigation.goBack()} />,
  }),
  [Screens.NotificationDetails]: ({ navigation }) => ({
    headerRight: ({ canGoBack }) => <HeaderCancel onPress={() => canGoBack && navigation.goBack()} />,
  }),
  [Screens.TradeSummary]: {
    title: 'Investment History',
  },
  [Screens.InvestingAccountSelection]: ({ navigation }) => ({
    title: 'Investing',
    headerRight: ({ canGoBack }) => <HeaderCancel onPress={() => canGoBack && navigation.goBack()} />,
  }),
  [Screens.AccountActivityDetails]: {
    title: 'Account Activity',
  },
  [Screens.FeesApproval]: {
    title: 'logo',
  },
};

export const LogInNavigator: React.FC = () => {
  const { data, refetch } = useGetUserProfile(getApiClient);
  const { data: accounts, isLoading: accountLoading, isRefetching, error } = useGetAccountsOverview(getApiClient);
  const [account, setAccount] = useAtom(currentAccount);
  const { navigate } = useLogInNavigation();

  useLayoutEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!account.id && !accountLoading && !isRefetching) {
      const defaultAccount = { ...accounts?.[0] };
      setAccount(defaultAccount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountLoading, accounts, isRefetching]);

  useEffect(() => {
    if (error instanceof Error && error.message.includes('banned')) {
      navigate(Screens.Locked, { isBannedProfile: true });
    }
  }, [error, navigate]);

  const getInitialRouteName = () => {
    if (error instanceof Error && error.message.includes('banned')) {
      return Screens.Locked;
    }

    if (data?.isCompleted) {
      return Screens.BottomNavigator;
    }

    return Screens.Onboarding;
  };

  if (!data && !error) {
    return (
      <Box
        flex={1}
        fw
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Loader color={palette.pureBlack} />
      </Box>
    );
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <DialogProvider dark={false}>
          <LogInStack.Navigator
            screenOptions={{ gestureEnabled: false }}
            initialRouteName={getInitialRouteName()}
          >
            <LogInStack.Group screenOptions={{ headerShown: false }}>
              <LogInStack.Screen
                name={Screens.BottomNavigator}
                component={BottomTabsNavigator}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.ManageAccount]}
                name={Screens.ManageAccount}
                component={ManageAccountScreen}
              />
              <LogInStack.Screen
                name={Screens.KYCFail}
                component={KYCFail}
              />
              <LogInStack.Screen
                name={Screens.DividendsPayout}
                component={DividendsPayoutScreen}
              />
            </LogInStack.Group>
            <LogInStack.Group screenOptions={{ header: ScreenHeader }}>
              <LogInStack.Screen
                name={Screens.BankAccount}
                options={stackOptions[Screens.BankAccount]}
                component={BankAccount}
              />
              <LogInStack.Screen
                name={Screens.Investing}
                options={stackOptions[Screens.Investing]}
                component={Investing}
              />
              <LogInStack.Screen
                name={Screens.Settings}
                component={Settings}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.ManageAccount]}
                name={Screens.ManageAccountMainScreen}
                component={ManageAccountMainScreen}
              />

              <LogInStack.Screen
                name={Screens.AddBeneficiary}
                options={stackOptions[Screens.AddBeneficiary]}
                component={AddBeneficiary}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.TradeSummary]}
                name={Screens.TradeSummary}
                component={TradeSummary}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.NotificationDetails]}
                name={Screens.NotificationDetails}
                component={NotificationDetails}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.InvestingAccountSelection]}
                name={Screens.InvestingAccountSelection}
                component={InvestingAccountSelection}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.PropertyDetails]}
                name={Screens.PropertyDetails}
                component={PropertyDetails}
              />
              <LogInStack.Screen
                name={Screens.AccountActivityDetails}
                component={AccountActivityDetails}
                options={stackOptions[Screens.AccountActivityDetails]}
              />
            </LogInStack.Group>
            <LogInStack.Group screenOptions={{ header: DarkScreenHeader }}>
              <LogInStack.Screen
                options={stackOptions[Screens.Locked]}
                name={Screens.Locked}
                initialParams={{ isBannedProfile: true }}
                component={BannedScreen}
              />
              <LogInStack.Screen
                name={Screens.Onboarding}
                options={stackOptions[Screens.Onboarding]}
                component={Onboarding}
              />
              <LogInStack.Screen
                name={Screens.FeesApproval}
                component={FeesApproval}
                options={stackOptions[Screens.FeesApproval]}
              />
            </LogInStack.Group>
          </LogInStack.Navigator>
        </DialogProvider>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
};

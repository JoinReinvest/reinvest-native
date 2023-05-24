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
import { Investing } from '../../screens/Investing';
import { InvestingAccountSelection } from '../../screens/InvestingAccountSelection';
import { KYCFail } from '../../screens/KYCFail';
import { ManageAccountMainScreen } from '../../screens/ManageAccount';
import { ManageAccountScreen } from '../../screens/ManageAccount/Screens';
import { NotificationDetails } from '../../screens/NotificationDetails';
import { Onboarding } from '../../screens/Onboarding';
import { Settings } from '../../screens/Settings';
import { TradeSummary } from '../../screens/TradeSummary';
import { currentAccount, useAtom } from '../../store/atoms';
import { BottomTabsNavigator } from '../BottomTabsNavigator';
import Screens from '../screens';
import { LogInStackParamList } from './types';

const LogInStack = createNativeStackNavigator<LogInStackParamList>();
type StackOptionsParametrized = ({ navigation }: { navigation: NativeStackNavigationProp<LogInStackParamList> }) => NativeStackNavigationOptions;
const stackOptions: Record<
  Extract<
    Screens,
    | Screens.Onboarding
    | Screens.ManageAccount
    | Screens.ManageAccountMainScreen
    | Screens.Investing
    | Screens.AddBeneficiary
    | Screens.KYCFail
    | Screens.BankAccount
    | Screens.Locked
    | Screens.NotificationDetails
    | Screens.TradeSummary
    | Screens.DividendsPayout
    | Screens.InvestingAccountSelection
  >,
  NativeStackNavigationOptions | StackOptionsParametrized
> = {
  [Screens.Onboarding]: {
    title: 'logo',
    headerShown: false,
  },
  [Screens.Investing]: {
    title: 'Investing',
    headerShown: false,
  },
  [Screens.BankAccount]: {
    title: 'logo',
    headerShown: false,
  },
  [Screens.ManageAccountMainScreen]: {
    title: 'Manage Account',
  },
  [Screens.ManageAccount]: {
    title: 'Manage Account',
    headerShown: false,
  },
  [Screens.AddBeneficiary]: ({ navigation }) => ({
    title: 'Add Beneficiary',
    headerRight: ({ canGoBack }) => <HeaderCancel onPress={() => canGoBack && navigation.goBack()} />,
  }),
  [Screens.KYCFail]: {
    headerShown: false,
  },
  [Screens.Locked]: {
    title: 'logo',
    header: DarkScreenHeader,
  },
  [Screens.NotificationDetails]: ({ navigation }) => ({
    header: ScreenHeader,
    headerRight: ({ canGoBack }) => <HeaderCancel onPress={() => canGoBack && navigation.goBack()} />,
  }),
  [Screens.TradeSummary]: {
    headerShown: false,
  },
  [Screens.DividendsPayout]: {
    headerShown: false,
  },
  [Screens.InvestingAccountSelection]: ({ navigation }) => ({
    header: ScreenHeader,
    title: 'Investing',
    headerRight: ({ canGoBack }) => <HeaderCancel onPress={() => canGoBack && navigation.goBack()} />,
  }),
};

export const LogInNavigator: React.FC = () => {
  const { data, refetch } = useGetUserProfile(getApiClient);
  const { data: accounts, isLoading: accountLoading } = useGetAccountsOverview(getApiClient);
  const [account, setAccount] = useAtom(currentAccount);

  useLayoutEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!account.id && !accountLoading) {
      const defaultAccount = { ...accounts?.[0] };
      setAccount(defaultAccount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountLoading, accounts]);

  if (!data)
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

  return (
    <BottomSheetModalProvider>
      <SafeAreaProvider>
        <DialogProvider dark={false}>
          <LogInStack.Navigator initialRouteName={data.isCompleted ? Screens.BottomNavigator : Screens.Onboarding}>
            <LogInStack.Screen
              options={{ headerShown: false }}
              name={Screens.BottomNavigator}
              component={BottomTabsNavigator}
            />
            <LogInStack.Screen
              name={Screens.Onboarding}
              options={stackOptions[Screens.Onboarding]}
              component={Onboarding}
            />
            <LogInStack.Group screenOptions={{ header: ScreenHeader }}>
              <LogInStack.Screen
                name={Screens.Settings}
                component={Settings}
              />
              <LogInStack.Screen
                options={stackOptions[Screens.ManageAccountMainScreen]}
                name={Screens.ManageAccountMainScreen}
                component={ManageAccountMainScreen}
              />
              <LogInStack.Screen
                name={Screens.Investing}
                options={stackOptions[Screens.Investing]}
                component={Investing}
              />
              <LogInStack.Screen
                name={Screens.BankAccount}
                options={stackOptions[Screens.BankAccount]}
                component={BankAccount}
              />
              <LogInStack.Screen
                name={Screens.AddBeneficiary}
                options={stackOptions[Screens.AddBeneficiary]}
                component={AddBeneficiary}
              />
            </LogInStack.Group>
            <LogInStack.Screen
              options={stackOptions[Screens.ManageAccount]}
              name={Screens.ManageAccount}
              component={ManageAccountScreen}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.KYCFail]}
              name={Screens.KYCFail}
              component={KYCFail}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.Locked]}
              name={Screens.Locked}
              component={BannedScreen}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.NotificationDetails]}
              name={Screens.NotificationDetails}
              component={NotificationDetails}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.TradeSummary]}
              name={Screens.TradeSummary}
              component={TradeSummary}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.DividendsPayout]}
              name={Screens.DividendsPayout}
              component={DividendsPayoutScreen}
            />
            <LogInStack.Screen
              options={stackOptions[Screens.InvestingAccountSelection]}
              name={Screens.InvestingAccountSelection}
              component={InvestingAccountSelection}
            />
          </LogInStack.Navigator>
        </DialogProvider>
      </SafeAreaProvider>
    </BottomSheetModalProvider>
  );
};

import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { ActionName, VerificationAction } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { ScreenHeader } from '../../components/CustomHeader';
import { HeaderAvatar } from '../../components/HeaderAvatar';
import { Sygnet } from '../../components/Icon/icons';
import { DashboardIcon } from '../../components/Icon/icons/TabNavigtionIcons/DashboardIcon';
import { EducationIcon } from '../../components/Icon/icons/TabNavigtionIcons/EducationIcon';
import { NotificationIcon } from '../../components/Icon/icons/TabNavigtionIcons/NotificationsIcon';
import { ReitIcon } from '../../components/Icon/icons/TabNavigtionIcons/ReitIcon';
import { Loader } from '../../components/Loader';
import { StyledText } from '../../components/typography/StyledText';
import { palette } from '../../constants/theme';
import Screens from '../../navigation/screens';
import { Dashboard } from '../../screens/Dashboard';
import { EducationStack } from '../../screens/Education';
import { Notifications } from '../../screens/Notifications';
import { ReitScreen } from '../../screens/REIT';
import { currentAccount } from '../../store/atoms';
import { useLogInNavigation } from '../hooks';
import { BottomTabsParamsBase } from './types';

const Tab = createBottomTabNavigator<BottomTabsParamsBase>();

const stackOptions: Record<Extract<Screens, Screens.Dashboard | Screens.REIT | Screens.EducationStack | Screens.Notifications>, BottomTabNavigationOptions> = {
  [Screens.Dashboard]: {
    title: 'Dashboard',
    tabBarIcon: ({ focused }) => <DashboardIcon focused={focused} />,
    headerLeft: () => (
      <Box
        m="8"
        width={32}
        height={32}
      >
        <Sygnet color={palette.pureBlack} />
      </Box>
    ),
  },
  [Screens.REIT]: {
    title: 'Community REIT',
    tabBarIcon: ({ focused }) => <ReitIcon focused={focused} />,
  },
  [Screens.EducationStack]: {
    title: 'Education',
    tabBarIcon: ({ focused }) => <EducationIcon focused={focused} />,
  },
  [Screens.Notifications]: {
    title: 'Notifications',
    tabBarIcon: ({ focused }) => <NotificationIcon focused={focused} />,
    headerLeft: () => (
      <Box
        m="8"
        width={32}
        height={32}
      >
        <Sygnet color={palette.pureBlack} />
      </Box>
    ),
  },
};

const getLabel = (focused: boolean, children: string) => (
  <StyledText
    variant="today"
    color={focused ? 'pureBlack' : 'dark3'}
  >
    {children}
  </StyledText>
);

export const BottomTabsNavigator: React.FC = () => {
  const { bottom } = useSafeAreaInsets();
  const { data, isLoading: isLoadingUserProfile } = useGetUserProfile(getApiClient);
  const { reset, navigate } = useLogInNavigation();
  const { mutateAsync: verifyAccountMutate, isLoading: isVerifying } = useVerifyAccount(getApiClient);
  const [account] = useAtom(currentAccount);

  useEffect(() => {
    (async () => {
      if (!account.id) {
        return;
      }

      const response = await verifyAccountMutate({ accountId: account.id });

      const bannedAction = (response?.requiredActions as VerificationAction[])?.find(
        ({ action }) => action === ActionName.BanProfile || action === ActionName.BanAccount,
      );

      if (bannedAction) {
        return navigate(Screens.Locked, { action: bannedAction });
      }

      if (!data?.isCompleted) {
        reset({ index: 0, routes: [{ name: Screens.Onboarding }] });
      }
    })();
  }, [account.id, data?.isCompleted, navigate, reset, verifyAccountMutate]);

  if (isLoadingUserProfile || isVerifying)
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
    <Tab.Navigator
      initialRouteName={Screens.Dashboard}
      backBehavior="none"
      screenOptions={{
        tabBarStyle: {
          height: 56 + bottom,
          paddingBottom: bottom || 8,
          paddingTop: 12,
        },
        tabBarActiveTintColor: palette.pureBlack,
        tabBarInactiveTintColor: palette.dark3,
        tabBarLabelStyle: { marginTop: -12 },
        tabBarLabel: ({ focused, children }) => getLabel(focused, children),
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Screens.Dashboard}
        component={Dashboard}
        options={() => ({
          ...stackOptions[Screens.Dashboard],

          headerRight: HeaderAvatar,
          headerShown: true,
          header: ScreenHeader,
        })}
      />
      <Tab.Screen
        name={Screens.REIT}
        component={ReitScreen}
        options={() => ({
          ...stackOptions[Screens.REIT],
        })}
      />
      <Tab.Screen
        name={Screens.EducationStack}
        component={EducationStack}
        options={() => ({
          ...stackOptions[Screens.EducationStack],
        })}
      />
      <Tab.Screen
        name={Screens.Notifications}
        component={Notifications}
        options={() => ({
          ...stackOptions[Screens.Notifications],
          headerShown: true,
          header: props => <ScreenHeader {...props} />,
          headerRight: HeaderAvatar,
        })}
      />
    </Tab.Navigator>
  );
};

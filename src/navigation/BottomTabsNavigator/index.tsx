import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../../api/getApiClient';
import { Box } from '../../components/Containers/Box/Box';
import { ScreenHeader } from '../../components/CustomHeader';
import { HeaderAvatar } from '../../components/HeaderAvatar';
import { HeaderSignet } from '../../components/HeaderSignet';
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
import { currentAccount, unreadNotificationsCount } from '../../store/atoms';
import { useLogInNavigation } from '../hooks';
import { styles } from '../styles';
import { BottomTabsParamsBase } from './types';

const Tab = createBottomTabNavigator<BottomTabsParamsBase>();

const stackOptions: Record<Extract<Screens, Screens.Dashboard | Screens.REIT | Screens.EducationStack | Screens.Notifications>, BottomTabNavigationOptions> = {
  [Screens.Dashboard]: {
    title: 'Dashboard',
    tabBarIcon: ({ focused }) => <DashboardIcon focused={focused} />,
  },
  [Screens.REIT]: {
    title: 'Community REIT',
    tabBarIcon: ({ focused }) => <ReitIcon focused={focused} />,
  },
  [Screens.EducationStack]: {
    title: 'Education',
    tabBarIcon: ({ focused }) => <EducationIcon focused={focused} />,
    headerShown: false,
  },
  [Screens.Notifications]: {
    title: 'Notifications',
    headerShown: true,
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
  const { data, isLoading: isLoadingUserProfile, error } = useGetUserProfile(getApiClient);
  const { reset, navigate } = useLogInNavigation();
  const [account] = useAtom(currentAccount);

  useEffect(() => {
    (async () => {
      if (!account.id) {
        return;
      }

      if (!data?.isCompleted) {
        reset({ index: 0, routes: [{ name: Screens.Onboarding }] });
      }
    })();
  }, [account.id, account.isBanned, data?.isCompleted, navigate, reset]);

  const isBannedProfile = error instanceof Error && (error.message === 'Profile is banned' || error.name === 'Profile is banned');

  if (isLoadingUserProfile)
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

  if (account.isBanned || isBannedProfile) {
    navigate(Screens.Locked, {
      isBannedAccount: account.isBanned ?? false,
      isBannedProfile,
      canGoBack: false,
    });

    return null;
  }

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
        headerLeft: HeaderSignet,
        headerRight: () => <HeaderAvatar />,
        header: ScreenHeader,
      }}
    >
      <Tab.Screen
        name={Screens.Dashboard}
        component={Dashboard}
        options={() => ({
          ...stackOptions[Screens.Dashboard],
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
          tabBarIcon: NotificationBarIcon,
        })}
      />
    </Tab.Navigator>
  );
};

const NotificationBarIcon = ({ focused }: { focused: boolean }) => {
  const [currentNotificationsCount] = useAtom(unreadNotificationsCount);
  const isMoreThan99notifications = currentNotificationsCount > 99;

  return (
    <Box style={styles.notificationWrapper}>
      <Box style={[styles.notificationBadge, isMoreThan99notifications && styles.threeDigitsBadge]}>
        <StyledText
          adjustsFontSizeToFit
          style={styles.count}
          color="pureWhite"
          variant="todayCondensed"
        >
          {isMoreThan99notifications ? '+99' : currentNotificationsCount}
        </StyledText>
      </Box>
      <NotificationIcon focused={focused} />
    </Box>
  );
};

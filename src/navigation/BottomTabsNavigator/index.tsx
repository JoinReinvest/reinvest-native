import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import Screens from '@navigation/screens';
import {DashboardIcon} from '@components/Icon/icons/TabNavigtionIcons/DashboardIcon';
import {ReitIcon} from '@components/Icon/icons/TabNavigtionIcons/ReitIcon';
import {EducationIcon} from '@components/Icon/icons/TabNavigtionIcons/EducationIcon';
import {BottomTabsParamsBase} from '@navigation/BottomTabsNavigator/types';
import {Dashboard} from '@screens/Dashboard';
import {ReitScreen} from '@screens/REIT';
import {Education} from '@screens/Education';
import {Notifications} from '@screens/Notifications';
import {NotificationIcon} from '@components/Icon/icons/TabNavigtionIcons/NotificationsIcon';
import {palette} from '@constants/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StyledText} from '@components/typography/StyledText';

const Tab = createBottomTabNavigator<BottomTabsParamsBase>();

const stackOptions: Record<
  Extract<
    Screens,
    Screens.Dashboard | Screens.REIT | Screens.Education | Screens.Notifications
  >,
  BottomTabNavigationOptions
> = {
  [Screens.Dashboard]: {
    title: 'Dashboard',
    tabBarIcon: ({focused}) => <DashboardIcon focused={focused} />,
  },
  [Screens.REIT]: {
    title: 'Community REIT',
    tabBarIcon: ({focused}) => <ReitIcon focused={focused} />,
  },
  [Screens.Education]: {
    title: 'Education',
    tabBarIcon: ({focused}) => <EducationIcon focused={focused} />,
  },
  [Screens.Notifications]: {
    title: 'Notifications',
    tabBarIcon: ({focused}) => <NotificationIcon focused={focused} />,
  },
};

const getLabel = (focused: boolean, children: string) => (
  <StyledText
    variant={'today'}
    color={focused ? palette.pureBlack : palette.dark3}>
    {children}
  </StyledText>
);

export const BottomTabsNavigator: React.FC = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 56 + bottom,
          paddingBottom: bottom || 8,
          paddingTop: 12,
        },
        tabBarActiveTintColor: palette.pureBlack,
        tabBarInactiveTintColor: palette.dark3,
        tabBarLabelStyle: {marginTop: -12},
        tabBarLabel: ({focused, children}) => getLabel(focused, children),
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={() => ({
          ...stackOptions[Screens.Dashboard],
        })}
      />
      <Tab.Screen
        name="REIT"
        component={ReitScreen}
        options={() => ({
          ...stackOptions[Screens.REIT],
        })}
      />
      <Tab.Screen
        name="Education"
        component={Education}
        options={() => ({
          ...stackOptions[Screens.Education],
        })}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={() => ({
          ...stackOptions[Screens.Notifications],
          tabBarBadge: 3,
        })}
      />
    </Tab.Navigator>
  );
};

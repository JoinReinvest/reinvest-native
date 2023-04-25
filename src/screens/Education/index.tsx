import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';

import { getApiClient } from '../../api/getApiClient';
import { Avatar } from '../../components/Avatar';
import { Box } from '../../components/Containers/Box/Box';
import { ScreenHeader } from '../../components/CustomHeader';
import { Sygnet } from '../../components/Icon/icons';
import { palette } from '../../constants/theme';
import Screens from '../../navigation/screens';
import { BlogScreen } from './Screens/BlogScreen';
import { EducationMainScreen } from './Screens/EducationMainScreen';
import { WebViewContentScreen } from './Screens/WebViewContentScreen';
import { EducationStackParamsList } from './types';

const Stack = createNativeStackNavigator<EducationStackParamsList>();

const stackOptions: Record<Extract<Screens, Screens.EducationMainScreen | Screens.WebViewContent>, NativeStackNavigationOptions> = {
  [Screens.EducationMainScreen]: {
    title: 'Education',
    header: ScreenHeader,
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
  [Screens.WebViewContent]: {
    title: 'Education',
    header: ScreenHeader,
  },
};

export const EducationStack = () => {
  const { data } = useGetAccountsOverview(getApiClient);

  return (
    <Stack.Navigator>
      <Stack.Screen
        component={EducationMainScreen}
        name={Screens.EducationMainScreen}
        options={({ navigation }) => ({
          ...stackOptions[Screens.EducationMainScreen],
          headerRight: () => (
            <Avatar
              onPress={() => {
                navigation.navigate(Screens.Settings);
              }}
              uri={data?.[0]?.avatar?.url || ''}
              username={data?.[0]?.avatar?.initials || ''}
            />
          ),
        })}
      />
      <Stack.Screen
        component={BlogScreen}
        name={Screens.BlogScreen}
      />
      <Stack.Screen
        options={stackOptions[Screens.WebViewContent]}
        component={WebViewContentScreen}
        name={Screens.WebViewContent}
      />
    </Stack.Navigator>
  );
};

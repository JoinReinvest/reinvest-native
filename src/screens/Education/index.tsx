import React from 'react';

import {EducationStackParamsList} from './types';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import Screens from '@navigation/screens';
import {EducationMainScreen} from '@screens/Education/Screens/EducationMainScreen';
import {BlogScreen} from '@screens/Education/Screens/BlogScreen';
import {ScreenHeader} from '@components/CustomHeader';
import {Avatar} from '@components/Avatar';
import {Sygnet} from '@components/Icon/icons';
import {palette} from '@constants/theme';
import {Box} from '@components/Containers/Box/Box';
import {WebViewContentScreen} from '@screens/Education/Screens/WebViewContentScreen';

const Stack = createNativeStackNavigator<EducationStackParamsList>();

const stackOptions: Record<
  Extract<Screens, Screens.EducationMainScreen | Screens.WebViewContent>,
  NativeStackNavigationOptions
> = {
  [Screens.EducationMainScreen]: {
    title: 'Education',
    header: ScreenHeader,
    headerLeft: () => (
      <Box m={'8'} width={32} height={32}>
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
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={EducationMainScreen}
        name={Screens.EducationMainScreen}
        options={({navigation}) => ({
          ...stackOptions[Screens.EducationMainScreen],
          headerRight: () => (
            <Avatar
              onPress={() => {
                navigation.navigate(Screens.Settings);
              }}
              username={'Test'}
              variant={'individual'}
            />
          ),
        })}
      />
      <Stack.Screen component={BlogScreen} name={Screens.BlogScreen} />
      <Stack.Screen
        options={stackOptions[Screens.WebViewContent]}
        component={WebViewContentScreen}
        name={Screens.WebViewContent}
      />
    </Stack.Navigator>
  );
};

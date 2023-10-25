import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenHeader } from '../../components/CustomHeader';
import { HeaderAvatar } from '../../components/HeaderAvatar';
import { HeaderSignet } from '../../components/HeaderSignet';
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
    headerLeft: HeaderSignet,
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
        options={{
          ...stackOptions[Screens.EducationMainScreen],
          headerRight: HeaderAvatar,
        }}
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

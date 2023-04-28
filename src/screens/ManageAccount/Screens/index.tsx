import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenHeader } from '../../../components/CustomHeader';
import { MainWrapper } from '../../../components/MainWrapper';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { SCREENS_CONTENT } from '../constants';

export const ManageAccountScreen = ({ navigation, route }: NativeStackScreenProps<LogInStackParamList, Screens.ManageAccount>) => {
  const { identifier, heading } = route.params;

  return (
    <>
      <ScreenHeader
        options={{
          title: heading,
        }}
        route={route}
        navigation={navigation}
      />
      <MainWrapper>{SCREENS_CONTENT[identifier]}</MainWrapper>
    </>
  );
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import { ScreenHeader } from '../../../components/CustomHeader';
import { HeaderCancel } from '../../../components/HeaderCancel';
import { MainWrapper } from '../../../components/MainWrapper';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { SCREENS_CONTENT } from '../constants';

export const ManageAccountScreen = ({ navigation, route }: NativeStackScreenProps<LogInStackParamList, Screens.ManageAccount>) => {
  const { options } = route.params;

  const getRightHeader = useMemo(
    () =>
      options?.cancellable ? () => <HeaderCancel onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })} /> : undefined,
    [navigation, options?.cancellable],
  );

  return (
    <>
      {options.hideHeader ? null : (
        <ScreenHeader
          options={{
            title: options.label ?? 'Manage Account',
            headerRight: getRightHeader,
          }}
          route={route}
          navigation={navigation}
        />
      )}
      <MainWrapper noPadding>{options?.identifier && SCREENS_CONTENT[options.identifier]}</MainWrapper>
    </>
  );
};

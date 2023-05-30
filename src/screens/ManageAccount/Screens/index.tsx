import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import { ScreenHeader } from '../../../components/CustomHeader';
import { HeaderCancel } from '../../../components/HeaderCancel';
import { MainWrapper } from '../../../components/MainWrapper';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { SCREENS_CONTENT } from '../constants';

export const ManageAccountScreen = ({ navigation, route }: NativeStackScreenProps<LogInStackParamList, Screens.ManageAccount>) => {
  const {
    options: { headerShown = true, cancellable = true, label = 'Manage Account', identifier, title },
  } = route.params;

  const getRightHeader = useMemo(
    () => (cancellable ? () => <HeaderCancel onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })} /> : undefined),
    [navigation, cancellable],
  );

  return (
    <>
      {headerShown ? (
        <ScreenHeader
          options={{
            title: title ?? label,
            headerRight: getRightHeader,
          }}
          route={route}
          navigation={navigation}
        />
      ) : null}
      <MainWrapper
        noPadding
        bottomSafe
      >
        {identifier && SCREENS_CONTENT[identifier]}
      </MainWrapper>
    </>
  );
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import { Box } from '../../../components/Containers/Box/Box';
import { ScreenHeader } from '../../../components/CustomHeader';
import { HeaderCancel } from '../../../components/HeaderCancel';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { SCREENS_CONTENT } from '../constants';

export const ManageAccountScreen = ({ navigation, route }: NativeStackScreenProps<LogInStackParamList, Screens.ManageAccount>) => {
  const {
    options: { headerShown = true, cancellable, label = 'Manage Account', identifier, title },
  } = route.params;

  const getRightHeader = useMemo(
    () => (cancellable ? () => <HeaderCancel onPress={() => navigation.navigate(Screens.ManageAccountMainScreen)} /> : undefined),
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
      <Box
        fw
        flex={1}
      >
        {identifier && SCREENS_CONTENT[identifier]}
      </Box>
    </>
  );
};

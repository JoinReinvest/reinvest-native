import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';

import { ScreenHeader } from '../../../components/CustomHeader';
import { MainWrapper } from '../../../components/MainWrapper';
import { StyledText } from '../../../components/typography/StyledText';
import { LogInStackParamList } from '../../../navigation/LogInNavigator/types';
import Screens from '../../../navigation/screens';
import { SCREENS_CONTENT } from '../constants';

export const ManageAccountScreen = ({ navigation, route }: NativeStackScreenProps<LogInStackParamList, Screens.ManageAccount>) => {
  const { identifier, heading, cancellable } = route.params;

  const getRightHeader = useMemo(
    () =>
      cancellable
        ? () => (
            <StyledText
              variant={'h6'}
              onPress={() => navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
            >
              Cancel
            </StyledText>
          )
        : undefined,
    [cancellable, navigation],
  );

  return (
    <>
      <ScreenHeader
        options={{
          title: heading,
          headerRight: getRightHeader,
        }}
        route={route}
        navigation={navigation}
      />
      <MainWrapper
        bottomSafe
        noPadding
      >
        {SCREENS_CONTENT[identifier]}
      </MainWrapper>
    </>
  );
};

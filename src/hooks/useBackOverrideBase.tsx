import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../api/getApiClient';
import { Icon } from '../components/Icon';
import { IconProps } from '../components/Icon/types';
import { palette } from '../constants/theme';
import { LogInStackParamList } from '../navigation/LogInNavigator/types';
import Screens from '../navigation/screens';

export const useBackOverrideBase = <T extends object, K extends ParamListBase>(
  useCurrentFormContext: () => ContextState<T>,
  navigation: NativeStackNavigationProp<K>,
  dark = true,
) => {
  const {
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  const { data } = useGetUserProfile(getApiClient);

  const navigateFromFormWithProfileCompleted = useCallback(() => {
    (navigation as NativeStackNavigationProp<LogInStackParamList>).navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
  }, [navigation]);

  const iconProps: IconProps = useMemo(
    () => ({
      color: dark ? palette.pureWhite : palette.pureBlack,
      icon: 'down',
      style: { transform: [{ rotate: '90deg' }] },
    }),
    [dark],
  );

  useEffect(() => {
    if (isFirstStep) {
      navigation.setOptions({
        headerLeft: () =>
          navigation.canGoBack() || data?.isCompleted ? (
            <Icon
              {...iconProps}
              /*
              In case we are already completed profile we need to allow user to navigate back to main app *(we are in other stack , stacks are separated from each other
               */
              onPress={data?.isCompleted ? navigateFromFormWithProfileCompleted : () => navigation.goBack()}
            />
          ) : null,
      });

      return;
    } else {
      navigation.setOptions({
        headerLeft: () => (
          <Icon
            {...iconProps}
            onPress={moveToPreviousValidStep}
          />
        ),
      });
    }
  }, [data?.isCompleted, iconProps, isFirstStep, moveToPreviousValidStep, navigateFromFormWithProfileCompleted, navigation]);
};

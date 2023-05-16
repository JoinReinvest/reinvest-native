import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo } from 'react';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';

import { getApiClient } from '../api/getApiClient';
import { Icon } from '../components/Icon';
import { IconProps } from '../components/Icon/types';
import { palette } from '../constants/theme';

export const useBackOverrideBase = <T extends object, K extends ParamListBase>(
  useCurrentFormContext: () => ContextState<T>,
  navigation: NativeStackNavigationProp<K>,
  dark = true,
  notOverrideOtherSteps?: boolean,
) => {
  const {
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  const { data } = useGetUserProfile(getApiClient);

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
              onPress={() => navigation.goBack()}
            />
          ) : null,
      });

      return;
    } else {
      if (!notOverrideOtherSteps) {
        navigation.setOptions({
          headerLeft: () => (
            <Icon
              {...iconProps}
              onPress={moveToPreviousValidStep}
            />
          ),
        });
      }
    }
  }, [data?.isCompleted, iconProps, isFirstStep, moveToPreviousValidStep, navigation, notOverrideOtherSteps]);
};

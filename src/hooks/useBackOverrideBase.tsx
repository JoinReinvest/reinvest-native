import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Icon } from '../components/Icon';
import { palette } from '../constants/theme';

export const useBackOverrideBase = <T extends object>(useCurrentFormContext: () => ContextState<T>) => {
  const {
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (isFirstStep) {
      navigation.setOptions({
        headerLeft: () =>
          navigation.canGoBack() ? (
            <Icon
              color={palette.pureWhite}
              icon={'arrowLeft'}
              onPress={() => navigation.goBack()}
            />
          ) : null,
      });

      return;
    } else {
      navigation.setOptions({
        headerLeft: () => (
          <Icon
            color={palette.pureWhite}
            icon={'arrowLeft'}
            onPress={moveToPreviousValidStep}
          />
        ),
      });
    }
  }, [isFirstStep, moveToPreviousValidStep, navigation]);
};

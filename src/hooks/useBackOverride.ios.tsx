import React, { useEffect } from 'react';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Icon } from '../components/Icon';
import { palette } from '../constants/theme';
import { useLogOutNavigation } from '../navigation/hooks';

export const useStepBackOverride = <T,>(useCurrentFormContext: () => ContextState<T>) => {
  const {
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  const navigation = useLogOutNavigation();
  useEffect(() => {
    if (isFirstStep) {
      navigation.setOptions({
        headerLeft: () => (
          <Icon
            color={palette.pureWhite}
            icon={'arrowLeft'}
            onPress={() => navigation.goBack()}
          />
        ),
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

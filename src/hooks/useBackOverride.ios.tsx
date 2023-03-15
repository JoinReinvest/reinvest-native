import React, {useEffect} from 'react';
import {useLogOutNavigation} from '@navigation/hooks';
import {ContextState} from 'reinvest-app-common/src/form-flow/interfaces';
import {palette} from '@constants/theme';
import {Icon} from '@components/Icon';

export const useStepBackOverride = <T,>(
  useCurrentFormContext: () => ContextState<T>,
) => {
  const {
    meta: {isFirstStep},
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

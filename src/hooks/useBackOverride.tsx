import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { useBackOverrideBase } from './useBackOverrideBase';

export const useStepBackOverride = <T extends object>(useCurrentFormContext: () => ContextState<T>) => {
  const {
    meta: { previousStepIdentifier },
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  useBackOverrideBase(useCurrentFormContext);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (previousStepIdentifier) {
          moveToPreviousValidStep();

          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [moveToPreviousValidStep, previousStepIdentifier]),
  );
};

import { ParamListBase, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { useBackOverrideBase } from './useBackOverrideBase';

export const useStepBackOverride = <T extends object, K extends ParamListBase>(
  useCurrentFormContext: () => ContextState<T>,
  navigation: NativeStackNavigationProp<K>,
  dark?: boolean,
  notOverrideOtherSteps?: boolean,
) => {
  const {
    meta: { previousStepIdentifier },
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  useBackOverrideBase(useCurrentFormContext, navigation, dark, notOverrideOtherSteps);

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

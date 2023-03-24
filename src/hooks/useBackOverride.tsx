import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Icon} from '@components/Icon';
import {palette} from '@constants/theme';
import {ContextState} from 'reinvest-app-common/src/services/form-flow/interfaces';

export const useStepBackOverride = <T,>(
  useCurrentFormContext: () => ContextState<T>,
) => {
  const {
    meta: {previousStepIdentifier, isFirstStep},
    moveToPreviousValidStep,
  } = useCurrentFormContext();
  const navigation = useNavigation();
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

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [moveToPreviousValidStep, previousStepIdentifier]),
  );
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

import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { useBackOverrideBase } from './useBackOverrideBase';

export const useStepBackOverride = <T extends object, K extends ParamListBase>(
  useCurrentFormContext: () => ContextState<T>,
  navigation: NativeStackNavigationProp<K>,
  dark?: boolean,
  notOverrideOtherSteps?: boolean,
) => {
  useBackOverrideBase(useCurrentFormContext, navigation, dark, notOverrideOtherSteps);
};

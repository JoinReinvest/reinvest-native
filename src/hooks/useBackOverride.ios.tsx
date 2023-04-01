import { ContextState } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { useBackOverrideBase } from './useBackOverrideBase';

export const useStepBackOverride = <T extends object>(useCurrentFormContext: () => ContextState<T>) => {
  useBackOverrideBase(useCurrentFormContext);
};

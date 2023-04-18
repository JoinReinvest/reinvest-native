import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { AvoidSoftInput } from 'react-native-avoid-softinput';

/*
 *There is no need to use scroll view with this implementation , use view for one input specific screens
 */

export const useKeyboardAware = (enabled = true, offset?: number, shouldMimic = true) => {
  const onFocusEffect = useCallback(() => {
    if (enabled) {
      AvoidSoftInput.setShouldMimicIOSBehavior(shouldMimic);
      AvoidSoftInput.setEnabled(true);

      if (offset) {
        AvoidSoftInput.setAvoidOffset(offset);
      }
    }

    if (!enabled) {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    }

    return;
  }, [shouldMimic, enabled, offset]);

  useFocusEffect(onFocusEffect);
};

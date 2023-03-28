import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { AvoidSoftInput } from 'react-native-avoid-softinput';

/*
 *There is no need to use scroll view with this implementation , use view for one input specific screens
 */

export const useKeyboardAware = (enabled = true, offset?: number) => {
  const onFocusEffect = useCallback(() => {
    if (enabled) {
      AvoidSoftInput.setShouldMimicIOSBehavior(true);
      AvoidSoftInput.setEnabled(true);

      if (offset) {
        AvoidSoftInput.setAvoidOffset(offset);
      }
      return () => {
        AvoidSoftInput.setEnabled(false);
        AvoidSoftInput.setShouldMimicIOSBehavior(false);
      };
    }
  }, [enabled, offset]);

  useFocusEffect(onFocusEffect);
};

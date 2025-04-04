import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { palette } from '../../../constants/theme';

export const styles = StyleSheet.create({
  mainWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.pureWhite,
    width: '100%',
  },
  dark: {
    backgroundColor: palette.onboarding,
  },
  closeIcon: {
    right: MAIN_WRAPPER_PADDING_HORIZONTAL,
    position: 'absolute',
    zIndex: 100,
    elevation: 100,
  },
  content: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
  fh: { height: '100%' },
});

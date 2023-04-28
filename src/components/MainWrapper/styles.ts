import { StyleSheet } from 'react-native';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../constants/styles';
import { palette } from '../../constants/theme';
import { hexToRgbA } from '../../utils/hexToRgb';

export const styles = StyleSheet.create({
  staticWrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
  },
  wrapper: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  wrapperPadding: {
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
  light: {
    backgroundColor: palette.pureWhite,
  },
  dark: {
    backgroundColor: palette.onboarding,
  },
  noPadding: {
    paddingHorizontal: 0,
  },
  flex: { flex: 1 },
  loaderWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: hexToRgbA(palette.pureWhite, 0.5),
  },
  darkLoader: {
    backgroundColor: hexToRgbA(palette.pureBlack, 0.5),
  },
});

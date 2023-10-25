import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { hexToRgbA } from '../../utils/hexToRgb';
import { xScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: palette.pureWhite,
  },
  dark: {
    backgroundColor: palette.onboarding,
  },
  shadow: {
    shadowColor: palette.pureBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 10,
  },
  handleIndicatorStyle: {
    backgroundColor: palette.darkerGray,
    width: xScale(36),
  },
  handleDark: {
    backgroundColor: palette.pureWhite,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: hexToRgbA(palette.pureBlack, 0.3),
  },
  titleSeparator: {
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: palette.lightGray,
  },
  separatorDark: {
    borderTopColor: palette.pureWhite,
    backgroundColor: palette.onboarding,
  },
});

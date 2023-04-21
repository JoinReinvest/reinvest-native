import { StyleSheet } from 'react-native';

import { isIOS } from '../../../constants/common';
import { HEADER_HEIGHT, MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { STATUS_BAR, yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  header: {
    marginTop: yScale(53),
    marginBottom: yScale(24),
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },

  bottomBordered: { borderBottomWidth: 1, borderBottomColor: palette.dark2 },

  headerWrapper: {
    position: 'absolute',
    top: isIOS ? 0 : -STATUS_BAR,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1,
  },
  fw: {
    width: '100%',
  },
  sheetContentWrapper: {
    flexGrow: 1,
    backgroundColor: palette.pureWhite,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 24,
    paddingBottom: HEADER_HEIGHT,
  },
  dark: {
    backgroundColor: palette.onboarding,
  },
  removeMargin: { margin: 0 },
});

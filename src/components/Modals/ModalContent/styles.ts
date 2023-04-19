import { StyleSheet } from 'react-native';

import { isIOS } from '../../../constants/common';
import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../constants/styles';
import { palette } from '../../../constants/theme';
import { STATUS_BAR, yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  header: {
    marginTop: yScale(53),
    marginBottom: yScale(24),
    paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
  disclaimersContent: {
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
});

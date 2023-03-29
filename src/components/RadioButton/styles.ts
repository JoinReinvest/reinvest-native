import { StyleSheet } from 'react-native';

import { isIOS } from '../../constants/common';
import { palette } from '../../constants/theme';
import { xScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    columnGap: xScale(20),
  },
  label: {
    top: isIOS ? 4 : 0,
    color: palette.pureWhite,
    flexShrink: 1,
    lineHeight: 21 * 1.1,
  },
});

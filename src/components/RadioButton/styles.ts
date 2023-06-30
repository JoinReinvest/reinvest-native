import { StyleSheet } from 'react-native';

import { isIOS } from '../../constants/common';
import { xScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  radio: {
    flexDirection: 'row',
    columnGap: xScale(20),
  },
  label: {
    top: isIOS ? 4 : 0,
    flexShrink: 1,
    lineHeight: 21 * 1.1,
  },
});

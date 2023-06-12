import { StyleSheet } from 'react-native';

import { PADDED_SAFE_WIDTH } from '../../../../constants/styles';
import { palette } from '../../../../constants/theme';
import { yScale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  card: {
    marginBottom: yScale(16),
  },
  description: {
    borderColor: palette.lightGray,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
  image: { width: '100%', height: (PADDED_SAFE_WIDTH * 9) / 16 },
});

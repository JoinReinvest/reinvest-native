import { StyleSheet } from 'react-native';

import { palette } from '../../../constants/theme';
import { yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  signet: {
    width: 72,
    height: 72,
    marginVertical: yScale(80),
  },
  text: {
    color: palette.pureWhite,
    marginBottom: yScale(16),
  },
  descriptionSegment: {
    width: '100%',
    paddingBottom: yScale(8),
  },
});

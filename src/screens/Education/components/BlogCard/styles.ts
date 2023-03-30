import { palette } from '@constants/theme';
import { yScale } from '@utils/scale';
import { StyleSheet } from 'react-native';

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
});

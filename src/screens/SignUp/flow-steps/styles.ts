import { palette } from '@constants/theme';
import { yScale } from '@src/utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginVertical: yScale(12),
  },
  buttonsSection: {
    alignSelf: 'flex-end',
    width: '100%',
  },
});

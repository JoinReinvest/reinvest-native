import { palette } from '@constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  error: { textAlign: 'center', marginBottom: 24 },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginBottom: 12,
  },
  buttonsSection: { alignSelf: 'flex-end', width: '100%' },
});

import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginBottom: 12,
  },
  buttonsSection: {alignSelf: 'flex-end', width: '100%'},
});

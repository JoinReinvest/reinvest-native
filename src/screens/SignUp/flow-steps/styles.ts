import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'center',
  },
  flex: {flex: 1},
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginBottom: yScale(12),
  },
  buttonsSection: {width: '100%'},
});

import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
  },
  flex: {flex: 1},
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  firstStepLink: {
    textDecorationColor: palette.pureWhite,
    marginVertical: yScale(12),
  },
  buttonsSection: {alignSelf: 'flex-end', width: '100%'},
});

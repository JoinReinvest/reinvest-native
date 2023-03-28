import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
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
  buttonsSection: {
    alignSelf: 'flex-end',
    width: '100%',
  },
  fw: {
    width: '100%',
  },
});

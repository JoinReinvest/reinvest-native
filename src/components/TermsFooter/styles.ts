import {yScale} from '@src/utils/scale';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {marginTop: yScale(12)},

  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textCenter: {
    textAlign: 'center',
  },
});

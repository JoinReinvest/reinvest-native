import {StyleSheet} from 'react-native';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  headline: {marginBottom: yScale(8)},
  description: {
    lineHeight: 21,
  },
  wrapper: {
    marginTop: yScale(8),
    marginBottom: yScale(60),
  },
});

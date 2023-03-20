import {yScale} from '@src/utils/scale';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    height: yScale(120),
  },
  inputWrapper: {
    height: '100%',
    textAlignVertical: 'top',
    paddingHorizontal: 0,
  },
  inputStyle: {
    height: '100%',
  },
  inputStyleOnIOS: {
    paddingTop: yScale(16),
  },
});

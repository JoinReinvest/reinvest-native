import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '@src/constants/styles';
import { yScale } from '@src/utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginTop: yScale(4),
  },
  bar: {
    height: 4,
  },
  absolute: {
    position: 'absolute',
    marginHorizontal: -MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
});

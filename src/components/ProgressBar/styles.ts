import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '@src/constants/styles';
import { DEVICE_WIDTH, yScale } from '@src/utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    marginTop: yScale(4),
    marginBottom: yScale(24),
    maxWidth: DEVICE_WIDTH,
  },
  bar: {
    height: yScale(4),
  },
  absolute: {
    position: 'absolute',
    marginHorizontal: -MAIN_WRAPPER_PADDING_HORIZONTAL,
  },
});

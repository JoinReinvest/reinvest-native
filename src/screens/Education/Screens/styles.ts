import { yScale } from '@utils/scale';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  imageBackground: {
    height: yScale(240),
    width: '100%',
    justifyContent: 'flex-end',
    marginVertical: yScale(24),
  },
  webViewLoader: {
    justifyContent: 'center',
    alignItems: 'center',
    ...StyleSheet.absoluteFillObject,
  },
});

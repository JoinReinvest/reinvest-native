import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  signet: {
    width: yScale(72),
    height: yScale(72),
    marginVertical: yScale(10),
  },
  text: {
    color: palette.pureWhite,
    marginBottom: yScale(16),
  },
  descriptionSegment: {
    width: '100%',
    paddingBottom: yScale(8),
  },
});

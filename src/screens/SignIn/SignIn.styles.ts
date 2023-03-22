import {StyleSheet} from 'react-native';
import {hp, wp} from '@utils/sizeUtils';
import {palette} from '@constants/theme';

export const styles = StyleSheet.create({
  signet: {
    width: wp(20),
    height: wp(20),
    marginVertical: hp(10),
  },
  text: {
    color: palette.pureWhite,
    marginBottom: 16,
  },
  descriptionSegment: {
    width: '100%',
    paddingBottom: 8,
  },
});

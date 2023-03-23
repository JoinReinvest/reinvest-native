import {StyleSheet} from 'react-native';
import {palette} from '@constants/theme';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconContainer: {
    backgroundColor: palette.frostGreen,
    width: 96,
    height: 96,
    borderRadius: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerError: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: palette.pureWhite,
  },
  title: {marginTop: yScale(16), textAlign: 'center'},
});

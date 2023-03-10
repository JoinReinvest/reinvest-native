import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 999,
    backgroundColor: palette.deepGreen,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  xl: {
    height: 100,
    width: 100,
  },
  l: {
    height: 72,
    width: 72,
  },
  m: {
    height: 44,
    width: 44,
  },
  s: {
    height: 28,
    width: 28,
  },
  individual: {
    backgroundColor: palette.deepGreen,
    color: palette.pureWhite,
  },
  corporate: {
    backgroundColor: palette.darkerGray,
  },
  trust: {
    backgroundColor: '#DDC59E',
  },
  beneficiary: {
    backgroundColor: palette.frostGreen,
  },
  initials: {
    color: palette.pureBlack,
  },
  edit: {
    height: 32,
    width: 32,
    position: 'absolute',
    backgroundColor: palette.frostGreen,
    bottom: 0,
    right: 0,
    borderRadius: 999,
  },
});

import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';
import {Fonts} from '@src/types/fonts';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 100,
    backgroundColor: palette.deepGreen,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  xl: {
    height: yScale(100),
    width: yScale(100),
  },
  l: {
    height: yScale(72),
    width: yScale(72),
  },
  m: {
    height: yScale(44),
    width: yScale(44),
  },
  s: {
    height: yScale(28),
    width: yScale(28),
  },
  individual: {
    backgroundColor: palette.deepGreen,
    color: palette.pureWhite,
  },
  corporate: {
    backgroundColor: palette.darkerGray,
  },
  trust: {
    backgroundColor: palette.gray,
  },
  beneficiary: {
    backgroundColor: palette.frostGreen,
  },
  initials: {
    color: palette.pureBlack,
  },
  edit: {
    height: yScale(32),
    width: yScale(32),
    position: 'absolute',
    backgroundColor: palette.frostGreen,
    bottom: 0,
    right: 0,
    borderRadius: 32,
  },
  avatarInitialsBase: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    letterSpacing: -0.5,
  },
});

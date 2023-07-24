import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { Fonts } from '../../types/fonts';

export const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 100,
    backgroundColor: palette.deepGreen,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 100,
  },
  '2xl': {
    height: 100,
    width: 100,
  },
  xl: {
    height: 72,
    width: 72,
  },
  l: {
    height: 60,
    width: 60,
  },
  m: {
    height: 44,
    width: 44,
  },
  s: {
    height: 28,
    width: 28,
  },
  INDIVIDUAL: {
    backgroundColor: palette.deepGreen,
    color: palette.pureWhite,
  },
  CORPORATE: {
    backgroundColor: palette.darkerGray,
  },
  TRUST: {
    backgroundColor: palette.gray,
  },
  BENEFICIARY: {
    backgroundColor: palette.frostGreen,
  },
  NEW_BENEFICIARY: {
    backgroundColor: palette.warning,
    color: palette.pureWhite,
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
    borderRadius: 32,
  },
  avatarInitialsBase: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    letterSpacing: -0.5,
  },
});

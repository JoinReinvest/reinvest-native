import { Platform, StyleSheet } from 'react-native';

import { Fonts } from '../../../types/fonts';

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {},
      android: { includeFontPadding: false, textAlignVertical: 'center' },
    }),
  },
  subheading: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 15,
    lineHeight: 18 * 1.1,
  },
  h1: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 54,
    lineHeight: 54 * 1.1,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 36,
    lineHeight: 36 * 1.1,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 30,
    lineHeight: 30 * 1.1,
    letterSpacing: -0.5,
  },
  h4: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 24,
    lineHeight: 24 * 1.1,
    letterSpacing: -0.5,
  },
  h5: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 20,
    lineHeight: 20 * 1.1,
    letterSpacing: -0.5,
  },
  h6: {
    fontFamily: Fonts.GTAmericaMedium,
    fontSize: 16,
  },
  bonusHeading: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 15,
    lineHeight: 18 * 1.1,
  },
  label: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 14,
  },
  paragraph: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 12,
  },
  paragraphLarge: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 14,
  },
  paragraphEmp: {
    fontFamily: Fonts.GTAmericaMedium,
    fontSize: 14,
  },
  paragraphSmall: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 11,
  },
  link: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  bodyText: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 15,
  },
  button: {
    fontFamily: Fonts.GTAmericaMedium,
    fontSize: 15,
    lineHeight: 18 * 1.1,
  },
  avatarBase: {
    fontFamily: Fonts.GTAmericaExtendedRegular,
    letterSpacing: -0.5,
  },
  avatarInitialsDoubleExtraLarge: {
    fontSize: 42,
  },
  avatarInitialsExtraLarge: {
    fontSize: 32,
  },
  avatarInitialsLarge: {
    fontSize: 20,
  },
  avatarInitialsMedium: {
    fontSize: 18,
  },
  avatarInitialsSmall: {
    fontSize: 12,
  },
  today: {
    fontSize: 10,
  },
  todayCondensed: {
    fontSize: 10,
    letterSpacing: -0.9,
  },
  tableHeading: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 20,
    lineHeight: 20 * 1.1,
    letterSpacing: -0.5,
  },
  bold: {
    fontWeight: '700',
  },
  dividend: {
    fontFamily: Fonts.GTAmericaRegular,
    fontSize: 48,
    lineHeight: 48 * 1.1,
  },
});

export default styles;

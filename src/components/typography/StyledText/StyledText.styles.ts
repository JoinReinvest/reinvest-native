import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  text: {
    ...Platform.select({
      ios: {},
      android: {includeFontPadding: false, textAlignVertical: 'center'},
    }),
  },
  h1: {
    fontFamily: 'GTAmerica-ExtendedRegular',
    fontSize: 54,
    lineHeight: 54 * 1.1,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 36,
    lineHeight: 36 * 1.1,
    letterSpacing: -0.5,
  },
  h3: {
    fontFamily: 'GTAmerica-ExtendedRegular',
    fontSize: 30,
    lineHeight: 30 * 1.1,
    letterSpacing: -0.5,
  },
  h4: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 24,
    lineHeight: 24 * 1.1,
    letterSpacing: -0.5,
  },
  h5: {
    fontFamily: 'GTAmerica-ExtendedRegular',
    fontSize: 20,
    lineHeight: 20 * 1.1,
    letterSpacing: -0.5,
  },
  h6: {
    fontFamily: 'GTAmerica-Medium',
    fontSize: 16,
  },
  bonusHeading: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 14,
  },
  label: {
    fontFamily: 'GTAmerica-Medium',
    fontSize: 14,
  },
  paragraph: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 12,
  },
  paragraphLarge: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 12,
  },
  paragraphEmp: {
    fontFamily: 'GTAmerica-Medium',
    fontSize: 14,
  },
  paragraphSmall: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 11,
  },
  link: {
    fontFamily: 'GTAmerica-Extended',
    fontSize: 11,
  },
  bodyText: {
    fontFamily: 'GTAmerica-Regular',
    fontSize: 15,
  },
});

export default styles;

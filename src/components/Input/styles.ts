import { Platform, StyleSheet } from 'react-native';

import { INPUT_HEIGHT, INPUT_PADDING_HORIZONTAL } from '../../constants/styles';
import { palette } from '../../constants/theme';
import { Fonts } from '../../types/fonts';
import { hexToRgbA } from '../../utils/hexToRgb';
import { yScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '100%',
    height: INPUT_HEIGHT,
    marginBottom: yScale(12),
  },
  disabled: {
    borderColor: palette.darkerGray,
    backgroundColor: palette.lightesGray,
  },
  error: {
    borderColor: palette.error,
    borderWidth: 1,
  },
  focused: {
    borderColor: palette.frostGreen,
    borderWidth: 2,
  },
  focusedDark: {
    backgroundColor: hexToRgbA(palette.frostGreen, 0.08),
  },
  errorDark: {
    backgroundColor: hexToRgbA(palette.error, 0.05),
  },
  dark: {
    backgroundColor: 'transparent',
  },
  input: {
    height: INPUT_HEIGHT,
    borderWidth: 1,
    borderColor: palette.darkerGray,
    backgroundColor: palette.pureWhite,
    /*
     * android is applying its own padding to text input values
     */
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  removedHorizontalPadding: {
    paddingHorizontal: 0,
  },
  removeLeftPadding: {
    paddingHorizontal: 0,
    textAlign: 'center',
  },
  smallerPaddingRight: {
    paddingRight: 4,
  },
  mainSection: {
    flex: 1,
    alignSelf: 'flex-end',
  },
  nativeInput: {
    width: '100%',
    color: palette.pureBlack,
    alignSelf: 'flex-end',
    textAlignVertical: 'bottom',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Fonts.GTAmericaExtendedRegular,
    height: '100%',
    ...Platform.select({
      android: { textAlignVertical: 'bottom', paddingBottom: 8 },
      ios: {
        paddingTop: 14,
      },
    }),
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
  },
  darkInput: {
    color: palette.pureWhite,
  },
  placeholder: {
    position: 'absolute',
    left: INPUT_PADDING_HORIZONTAL,
    top: -4,
  },
  placeholderWithLeftSection: {
    left: INPUT_PADDING_HORIZONTAL / 4,
  },
  placeholderText: {
    color: palette.dark3,
    fontWeight: '400',
  },
  errorMessage: {
    maxWidth: '100%',
    color: palette.error,
    marginTop: -4, // 8px top margin in total
    marginBottom: 12,
  },
  centerText: {
    alignSelf: 'center',
    textAlignVertical: 'center',
  },

  nativeInputDisabled: { color: palette.darkerGray },
  rightSegmentDisabled: { opacity: 0.7 },
  predefined: {
    textAlign: 'right',
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 8,
    textAlignVertical: 'center',
  },
  rightSegment: {
    position: 'absolute',
    /*
     * Icons had their own safe area which need to be calculated in
     */
    right: INPUT_PADDING_HORIZONTAL / 2,
  },
  paddingWithLeftSection: {
    paddingLeft: INPUT_PADDING_HORIZONTAL / 4,
  },
  narrowInput: {
    alignSelf: 'flex-start',
    width: '90%',
  },
});

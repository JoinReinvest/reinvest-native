import { isIOS } from '@constants/common';
import { INPUT_HEIGHT, INPUT_PADDING_HORIZONTAL } from '@constants/styles';
import { palette } from '@constants/theme';
import { Fonts } from '@src/types/fonts';
import { yScale } from '@src/utils/scale';
import { hexToRgbA } from '@utils/hexToRgb';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    maxWidth: '100%',
    height: INPUT_HEIGHT,
    marginBottom: yScale(12),
    flexShrink: 1,
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
    paddingHorizontal: INPUT_PADDING_HORIZONTAL,
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
    paddingVertical: 8,
    width: '100%',
  },
  mainSection: {
    flex: 1,
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
  },
  nativeInput: {
    width: '100%',
    color: palette.pureBlack,
    alignSelf: 'flex-end',
    paddingHorizontal: 0,
    paddingVertical: 0,
    textAlignVertical: 'bottom',
    fontSize: 15,
    fontWeight: '400',
    fontFamily: Fonts.GTAmericaExtendedRegular,
    lineHeight: 19,
  },
  darkInput: {
    color: palette.pureWhite,
  },
  placeholder: {
    position: 'absolute',
    left: INPUT_PADDING_HORIZONTAL,
    top: isIOS ? -16 : -8,
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
});

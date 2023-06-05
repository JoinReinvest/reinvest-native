import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';
import { xScale, yScale } from '../../utils/scale';

export const styles = StyleSheet.create({
  button: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
    marginTop: yScale(12),
  },
  labelWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: xScale(8),
  },
  pillLabel: {
    columnGap: 0,
  },
  primary: {
    backgroundColor: palette.frostGreen,
  },
  primaryLabel: {
    color: palette.deepGreen,
  },
  primaryDisabled: {
    backgroundColor: palette.lightGray,
  },
  primaryDestructive: { backgroundColor: palette.error },
  primaryLabelDisabled: {
    color: palette.dark3,
  },
  combo: {
    backgroundColor: palette.frostGreen,
  },
  comboLabel: {
    color: palette.deepGreen,
  },
  comboDestructive: {},
  comboDisabled: {
    backgroundColor: palette.lightGray,
  },
  comboLabelDisabled: {
    color: palette.dark3,
  },
  secondary: {
    backgroundColor: palette.pureWhite,
  },
  secondaryDisabled: {
    backgroundColor: palette.lightGray,
  },
  secondaryLabel: {
    color: palette.deepGreen,
  },
  secondaryDestructive: {},
  secondaryLabelDisabled: {
    color: palette.dark3,
  },
  draftDisabled: {},
  draftDestructive: {},
  draft: {
    backgroundColor: palette.transparent,
    borderStyle: 'dashed',
    borderColor: palette.frostGreen,
    borderWidth: 1,
  },
  draftLabel: {
    backgroundColor: palette.transparent,
  },
  draftLabelDisabled: {
    backgroundColor: palette.transparent,
  },
  outlined: {
    borderWidth: 2,
    borderColor: palette.frostGreen,
  },
  outlinedDisabled: {
    borderWidth: 2,
    borderColor: palette.lightGray,
  },
  outlinedLabel: {
    color: palette.pureBlack,
  },
  outlinedLabelDisabled: {
    color: palette.darkerGray,
  },
  outlinedDestructive: {
    borderColor: palette.error,
  },

  pill: {},
  darkLabel: {
    color: palette.pureWhite,
  },
  warning: {
    backgroundColor: palette.error,
  },
  warningLabel: {
    color: palette.pureWhite,
  },
  warningDisabled: {
    backgroundColor: palette.lightGray,
  },
  warningLabelDisabled: {
    color: palette.dark3,
  },
});

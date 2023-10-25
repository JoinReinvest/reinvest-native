import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: palette.lightGray,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noBorderTop: {
    borderTopWidth: 0,
  },
  day: {
    position: 'relative',
    height: 48,
    width: '14.2%',
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: palette.frostGreen,
  },
  autoSelected: {
    backgroundColor: palette.deepGreen,
    color: palette.pureWhite,
  },
  grid: {
    flexDirection: 'row',
    rowGap: 8,
    flexWrap: 'wrap',
  },
  mark: {
    height: 40,
    width: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabled: {
    color: palette.darkerGray,
  },
});

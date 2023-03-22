import {StyleSheet} from 'react-native';
import {palette} from '@src/constants/theme';

export const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: palette.darkerGray,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardContent: {
    textAlign: 'center',
    maxWidth: 209,
  },
  selected: {
    borderColor: palette.frostGreen,
    backgroundColor: palette.frostGreen,
    color: palette.pureBlack,
  },
});

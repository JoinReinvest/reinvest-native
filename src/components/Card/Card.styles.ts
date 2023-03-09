import {StyleSheet} from 'react-native';
import {theme} from '@src/assets/theme';

export const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    borderWidth: 1,
    borderColor: theme.darkerGray,
  },
  cardTitle: {
    marginBottom: 4,
  },
  cardContent: {
    textAlign: 'center',
    maxWidth: 209,
  },
  selected: {
    borderColor: theme.frostGreen,
    backgroundColor: theme.frostGreen,
    color: theme.pureBlack,
  },
});

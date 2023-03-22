import {StyleSheet} from 'react-native';
import {yScale} from '@src/utils/scale';

export const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    justifyContent: 'flex-start',
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  cardsWrapper: {
    rowGap: yScale(16),
  },
  link: {
    textAlign: 'center',
    marginTop: yScale(24),
  },
  buttonsSection: {
    width: '100%',
  },
  footer: {
    alignItems: 'center',
  },
});

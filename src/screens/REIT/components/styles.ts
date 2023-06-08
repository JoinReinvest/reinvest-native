import { StyleSheet } from 'react-native';

import { yScale } from '../../../utils/scale';

export const styles = StyleSheet.create({
  card: {
    marginBottom: yScale(24),
  },
  ratingPill: { overflow: 'hidden' },
});

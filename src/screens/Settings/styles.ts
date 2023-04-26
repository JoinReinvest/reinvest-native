import { StyleSheet } from 'react-native';

import { palette } from '../../constants/theme';

export const styles = StyleSheet.create({
  fw: { width: '100%' },
  linksContainer: { rowGap: 16 },
  separator: { height: 1, backgroundColor: palette.lightGray, marginTop: 16 },
});

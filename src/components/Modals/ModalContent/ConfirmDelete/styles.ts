import { StyleSheet } from 'react-native';

import { palette } from '../../../../constants/theme';
import { DEVICE_WIDTH, xScale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  modalWrapper: { backgroundColor: palette.pureWhite, minHeight: 174, width: DEVICE_WIDTH - xScale(32), alignSelf: 'center' },
  button: { width: '50%', maxWidth: 140 },
});

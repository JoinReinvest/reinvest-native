import { StyleSheet } from 'react-native';

import { palette } from '../../../../constants/theme';
import { DEVICE_WIDTH, xScale } from '../../../../utils/scale';

export const styles = StyleSheet.create({
  modalWrapper: { backgroundColor: palette.pureWhite, minHeight: 174, width: DEVICE_WIDTH - xScale(32), alignSelf: 'center' },
  modalContent: { width: '100%', display: 'flex', flexDirection: 'column', gap: 32 },
  modalHeader: { width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

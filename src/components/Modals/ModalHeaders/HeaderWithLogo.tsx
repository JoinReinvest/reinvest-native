import { View } from 'react-native';

import { useDialog } from '../../../providers/DialogProvider';
import { Icon } from '../../Icon';
import { LogoWithSygnet } from '../../Icon/icons';

export const HeaderWithLogo = () => {
  const { closeDialog } = useDialog();

  return (
    <View style={{ width: '100%', height: 50, zIndex: 10, elevation: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
      <LogoWithSygnet />
      <Icon
        icon="hamburgerClose"
        onPress={closeDialog}
      />
    </View>
  );
};

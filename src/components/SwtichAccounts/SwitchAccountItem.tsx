import { View } from 'react-native';

import { AccountSummary } from '../AccountSummary';
import { RadioButton } from '../RadioButton';
import { styles } from './styles';
import { SwitchAccountItemProps } from './types';

export const SwitchAccountItem = ({ accountId, selected = false, onPress, ...rest }: SwitchAccountItemProps) => {
  return (
    <View style={styles.switchAccountContainer}>
      <AccountSummary
        accountId={accountId}
        {...rest}
      />
      <RadioButton
        checked={selected}
        onPress={onPress}
        value={accountId}
      />
    </View>
  );
};

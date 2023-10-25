import { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { SwitchAccountItem } from './SwitchAccountItem';
import { SwitchAccountsListProps } from './types';

export const SwitchAccountsList = ({ accounts, onSelect, value, ...rest }: SwitchAccountsListProps) => {
  const [selectedAccountId, setSelectedAccountId] = useState(value);

  const handleSelect = (selectedId: string) => {
    setSelectedAccountId(selectedId);
    onSelect?.(selectedId);
  };

  return (
    <View style={[styles.switchAccountsList]}>
      {accounts.map(account => (
        <SwitchAccountItem
          selected={selectedAccountId === account.id}
          onPress={handleSelect}
          key={account.id}
          {...account}
          {...rest}
        />
      ))}
    </View>
  );
};

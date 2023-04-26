import { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { SwitchAccountItem } from './SwitchAccountItem';
import { SwitchAccountsListProps } from './types';

export const SwitchAccountsList = ({ accounts, onSelect }: SwitchAccountsListProps) => {
  const [selectedAccountId, setSelectedAccountId] = useState('');

  const handleSelect = (selectedId: string) => {
    setSelectedAccountId(selectedId);
    onSelect?.(selectedId);
  };

  return (
    <View style={styles.switchAccountsList}>
      {accounts.map(account => (
        <SwitchAccountItem
          selected={selectedAccountId === account.accountId}
          onPress={handleSelect}
          key={account.accountId}
          {...account}
        />
      ))}
    </View>
  );
};

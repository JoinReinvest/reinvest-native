import { Dropdown } from '@components/Dropdown';
import { Input } from '@components/Input';
import { PHONE_MASK } from '@src/constants/masks';
import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { PhoneInputProps } from './types';

export const PhoneInput = ({ data, onSelect, dark, dropdownValue, ...rest }: PhoneInputProps) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.dropdownWrapper}>
        <Dropdown
          dark={dark}
          data={data}
          onSelect={onSelect}
          value={dropdownValue}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Input
          dark={dark}
          mask={PHONE_MASK}
          placeholder="000-000-000"
          keyboardType="numeric"
          maxLength={11}
          {...rest}
        />
      </View>
    </View>
  );
};

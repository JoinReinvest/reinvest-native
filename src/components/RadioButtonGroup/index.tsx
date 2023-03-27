import { RadioButton } from '@components/RadioButton';
import React, { useState } from 'react';
import { View } from 'react-native';

import { styles } from './styles';
import { RadioButtonGroupProps } from './types';

export const RadioButtonGroup = ({ options, style, onSelect, ...rest }: RadioButtonGroupProps) => {
  const [selectedRadioButtonId, setSelectedRadioButtonId] = useState<string | null>(null);

  const handleSelect = (selectedId: string) => {
    setSelectedRadioButtonId(selectedId);
    onSelect(selectedId);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {options.map(({ id, label }) => (
        <RadioButton
          key={id}
          id={id}
          onPress={handleSelect}
          checked={selectedRadioButtonId === id}
          {...rest}
        >
          {label}
        </RadioButton>
      ))}
    </View>
  );
};

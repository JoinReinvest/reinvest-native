import React, { useState } from 'react';
import { View } from 'react-native';

import { RadioButton } from '../RadioButton';
import { styles } from './styles';
import { RadioButtonGroupProps } from './types';

export const RadioButtonGroup = ({ options, style, onSelect, selectedValue, ...rest }: RadioButtonGroupProps) => {
  const [selectedRadioButtonId, setSelectedRadioButtonId] = useState<string | null>(selectedValue || null);

  const handleSelect = (selectedId: string) => {
    setSelectedRadioButtonId(selectedId);
    onSelect(selectedId);
  };

  return (
    <View style={[styles.wrapper, style]}>
      {options.map(({ title, value }) => (
        <RadioButton
          key={value}
          value={value}
          onPress={handleSelect}
          checked={selectedRadioButtonId === value}
          {...rest}
        >
          {title}
        </RadioButton>
      ))}
    </View>
  );
};

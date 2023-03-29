import React from 'react';
import { ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Button } from './Button';
import { Add } from './Icon/icons';
import { Input } from './Input';

export interface DynamicInput {
  id: string;
  value: string;
}

export interface InputsListProps {
  buttonLabel: string;
  inputs: DynamicInput[];
  onAddInput: () => void;
  onChangeText: (updatedInputs: DynamicInput[]) => void;
  placeholder: string;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

export const InputsList = ({ inputs, buttonLabel, placeholder, onAddInput, onChangeText, style, contentContainerStyle }: InputsListProps) => {
  const handleInputChange = (id: string, enteredText: string) => {
    const updatedInputs = [...inputs];
    const inputToUpdateIndex = inputs.findIndex(dynamicInput => dynamicInput.id === id);

    updatedInputs[inputToUpdateIndex] = { id, value: enteredText };
    onChangeText(updatedInputs);
  };

  return (
    <ScrollView
      style={[style]}
      contentContainerStyle={[styles.baseContentContainerStyle, contentContainerStyle]}
    >
      {inputs.map(({ id, value }) => (
        <Input
          key={id}
          id={id}
          value={value}
          placeholder={placeholder}
          onChangeText={enteredText => handleInputChange(id, enteredText)}
        />
      ))}
      <Button
        startIcon={<Add />}
        onPress={onAddInput}
      >
        {buttonLabel}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  baseContentContainerStyle: {
    flexGrow: 1,
  },
});

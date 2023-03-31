import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { RadioButtonProps } from '../RadioButton/types';

export interface RadioButtonOption extends Pick<RadioButtonProps, 'value'> {
  title: ReactNode;
}

export interface RadioButtonGroupProps extends Pick<RadioButtonProps, 'labelStyles' | 'radioStyles'> {
  onSelect: (selectedId: string) => void;
  options: RadioButtonOption[];
  selectedValue?: string;
  style?: StyleProp<ViewStyle>;
}

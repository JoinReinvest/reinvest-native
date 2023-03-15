import {ReactNode} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {RadioButtonProps} from '@components/RadioButton/types';

export interface RadioButtonOption extends Pick<RadioButtonProps, 'id'> {
  label: ReactNode;
}

export interface RadioButtonGroupProps
  extends Pick<RadioButtonProps, 'labelStyles' | 'radioStyles'> {
  options: RadioButtonOption[];
  onSelect: (selectedId: string) => void;
  style?: StyleProp<ViewStyle>;
}

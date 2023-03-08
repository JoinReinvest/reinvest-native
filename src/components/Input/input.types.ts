import type {TextInput, TextInputProps, ViewStyle} from 'react-native';
import {type ReactNode, type RefObject} from 'react';

export interface InputProps extends Omit<TextInputProps, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  error?: string;
  inputRef: RefObject<TextInput> | null;
  inputStyle?: ViewStyle;
  disabled?: boolean;
  dark?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

import type {TextInput, TextInputProps, ViewStyle} from 'react-native';
import {type ReactNode, type RefObject} from 'react';

export interface InputProps extends TextInputProps {
  value: string;
  onSubmit?: () => void;
  error?: string;
  inputRef: RefObject<TextInput> | null;
  inputStyle?: ViewStyle;
  disabled?: boolean;
  dark?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
}

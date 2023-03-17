import type {StyleProp, TextInput, ViewStyle} from 'react-native';
import {type ReactNode, type RefObject} from 'react';
import {MaskInputProps} from 'react-native-mask-input';

export interface InputProps extends MaskInputProps {
  value: string;
  onSubmit?: () => void;
  error?: string;
  inputRef?: RefObject<TextInput> | null;
  nativeInputStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  dark?: boolean;
  leftSection?: ReactNode;
  rightSection?: ReactNode;
  onBlur?: () => void;
  maskedPlaceholder?: string;
}

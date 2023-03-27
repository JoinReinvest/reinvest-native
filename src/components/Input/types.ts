import { type ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { MaskInputProps } from 'react-native-mask-input';

export interface InputProps extends MaskInputProps {
  value: string;
  dark?: boolean;
  disabled?: boolean;
  error?: string;
  inputStyle?: StyleProp<ViewStyle>;
  leftSection?: ReactNode;
  maskedPlaceholder?: string;
  nativeInputStyle?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  onSubmit?: () => void;
  rightSection?: ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
}

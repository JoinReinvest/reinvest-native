import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { MaskInputProps } from 'react-native-mask-input';

export interface InputProps extends MaskInputProps {
  dark?: boolean;
  disabled?: boolean;
  error?: string;
  inputStyle?: StyleProp<ViewStyle>;
  leftSection?: ReactNode;
  maskedPlaceholder?: string;
  nativeInputStyle?: StyleProp<ViewStyle>;
  onBlur?: () => void;
  onSubmit?: () => void;
  /*
    while using predefined for smaller not editable values mainly as a dropdown component
   */
  predefined?: boolean;
  rightSection?: ReactNode;
  value?: string;
  wrapperStyle?: StyleProp<ViewStyle>;
}

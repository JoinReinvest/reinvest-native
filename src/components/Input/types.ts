import type {ReactNode} from 'react';
import type {StyleProp, ViewStyle} from 'react-native';
import {MaskInputProps} from 'react-native-mask-input';

export interface InputProps extends MaskInputProps {
  value?: string;
  onSubmit?: () => void;
  error?: string;
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

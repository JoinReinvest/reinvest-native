import { ReactNode } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'combo' | 'draft' | 'warning';

export interface ButtonProps extends PressableProps {
  dark?: boolean;
  endIcon?: ReactNode;
  isDestructive?: boolean;
  isLoading?: boolean;
  isPill?: boolean;
  labelStyle?: StyleProp<ViewStyle>;
  startIcon?: ReactNode;
  variant?: ButtonVariant;
  vessel?: boolean;
}

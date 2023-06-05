import { ReactNode } from 'react';
import { PressableProps } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'combo' | 'draft' | 'warning';

export interface ButtonProps extends PressableProps {
  dark?: boolean;
  endIcon?: ReactNode;
  isLoading?: boolean;
  isPill?: boolean;
  startIcon?: ReactNode;
  variant?: ButtonVariant;
  vessel?: boolean;
}

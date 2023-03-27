import { ReactNode } from 'react';
import { PressableProps } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'combo';

export interface ButtonProps extends PressableProps {
  endIcon?: ReactNode;
  isLoading?: boolean;
  startIcon?: ReactNode;
  variant?: ButtonVariant;
}

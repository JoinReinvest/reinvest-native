import {ReactNode} from 'react';
import {PressableProps} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'combo';

export interface ButtonProps extends PressableProps {
  variant?: ButtonVariant;
  isLoading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isPill?: boolean;
}

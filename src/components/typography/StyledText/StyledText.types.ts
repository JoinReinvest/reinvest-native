import {TextProps} from 'react-native';

export interface StyledTextProps extends TextProps {
  color?: string;
  variant?: TextVariants;
}

export type TextVariants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bonusHeading'
  | 'label'
  | 'paragraph'
  | 'paragraphLarge'
  | 'paragraphEmp'
  | 'paragraphSmall'
  | 'link'
  | 'bodyText'
  | 'button';

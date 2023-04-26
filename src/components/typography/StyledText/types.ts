import { TextProps } from 'react-native';

import { Theme } from '../../../constants/theme';

export interface StyledTextProps extends TextProps {
  color?: Theme;
  opacity?: number;
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
  | 'button'
  | 'avatarInitialsDoubleExtraLarge'
  | 'avatarInitialsExtraLarge'
  | 'avatarInitialsLarge'
  | 'avatarInitialsMedium'
  | 'avatarInitialsSmall'
  | 'today';

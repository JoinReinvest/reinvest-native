import { TextProps, TextStyle } from 'react-native';

import { Theme } from '../../../constants/theme';

type TextAlign = TextStyle['textAlign'];
export interface StyledTextProps extends TextProps {
  bold?: boolean;
  color?: Theme;
  opacity?: number;
  textAlign?: TextAlign;
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
  | 'today'
  | 'tableHeading'
  | 'subheading'
  | 'dividend';

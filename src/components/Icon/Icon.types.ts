import {SvgProps} from 'react-native-svg';

type IconVariant =
  | 'add'
  | 'add-user'
  | 'alert'
  | 'arrow-down'
  | 'arrow-left'
  | 'arrow-right'
  | 'arrow-up'
  | 'bank'
  | 'calendar'
  | 'checkbox'
  | 'disabled'
  | 'down'
  | 'edit'
  | 'eye-hide'
  | 'file'
  | 'hamburger-close'
  | 'hamburger-open'
  | 'info'
  | 'link'
  | 'loading'
  | 'loading-half'
  | 'mailbox'
  | 'more-menu'
  | 'percent'
  | 'refresh'
  | 'search'
  | 'share'
  | 'tick'
  | 'trash'
  | 'trophy'
  | 'up'
  | 'upload'
  | 'circle-alert'
  | 'notification-bell'
  | 'notification';

export interface IconProps extends SvgProps {
  variant: IconVariant;
}

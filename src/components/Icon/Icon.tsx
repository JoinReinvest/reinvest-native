import {
  Add,
  AddUser,
  Alert,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bank,
  Calendar,
  Checkbox,
  Disabled,
  Down,
  Edit,
  EyeHide,
  File,
  HamburgerClose,
  HamburgerOpen,
  Info,
  Link,
  Loading,
  LoadingHalf,
  Mailbox,
  MoreMenu,
  Percent,
  Refresh,
  Search,
  Share,
  Trash,
  Trophy,
  Up,
  Upload,
  Tick,
  CircleAlert,
  Notification,
  NotificationBell,
} from '@src/assets/icons';
import React from 'react';
import {IconProps} from './Icon.types';

const Icon = ({variant, ...rest}: IconProps) => {
  switch (variant) {
    case 'add':
      return <Add {...rest} />;
    case 'add-user':
      return <AddUser {...rest} />;
    case 'alert':
      return <Alert {...rest} />;
    case 'arrow-down':
      return <ArrowDown {...rest} />;
    case 'arrow-left':
      return <ArrowLeft {...rest} />;
    case 'arrow-right':
      return <ArrowRight {...rest} />;
    case 'arrow-up':
      return <ArrowUp {...rest} />;
    case 'bank':
      return <Bank {...rest} />;
    case 'calendar':
      return <Calendar {...rest} />;
    case 'checkbox':
      return <Checkbox {...rest} />;
    case 'disabled':
      return <Disabled {...rest} />;
    case 'down':
      return <Down {...rest} />;
    case 'edit':
      return <Edit {...rest} />;
    case 'eye-hide':
      return <EyeHide {...rest} />;
    case 'file':
      return <File {...rest} />;
    case 'hamburger-close':
      return <HamburgerClose {...rest} />;
    case 'hamburger-open':
      return <HamburgerOpen {...rest} />;
    case 'info':
      return <Info {...rest} />;
    case 'link':
      return <Link {...rest} />;
    case 'loading':
      return <Loading {...rest} />;
    case 'loading-half':
      return <LoadingHalf {...rest} />;
    case 'mailbox':
      return <Mailbox {...rest} />;
    case 'more-menu':
      return <MoreMenu {...rest} />;
    case 'percent':
      return <Percent {...rest} />;
    case 'refresh':
      return <Refresh {...rest} />;
    case 'search':
      return <Search {...rest} />;
    case 'share':
      return <Share {...rest} />;
    case 'tick':
      return <Tick {...rest} />;
    case 'trash':
      return <Trash {...rest} />;
    case 'trophy':
      return <Trophy {...rest} />;
    case 'up':
      return <Up {...rest} />;
    case 'upload':
      return <Upload {...rest} />;
    case 'circle-alert':
      return <CircleAlert {...rest} />;
    case 'notification-bell':
      return <NotificationBell {...rest} />;
    case 'notification':
      return <Notification {...rest} />;
  }
};

export default Icon;

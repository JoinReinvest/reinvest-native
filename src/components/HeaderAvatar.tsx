import React from 'react';

import { useLogInNavigation } from '../navigation/hooks';
import Screens from '../navigation/screens';
import { currentAccount, useAtom } from '../store/atoms';
import { Avatar } from './Avatar';

export const HeaderAvatar = () => {
  const { navigate } = useLogInNavigation();
  const [account] = useAtom(currentAccount);

  return (
    <Avatar
      onPress={() => {
        navigate(Screens.Settings);
      }}
      uri={account?.avatar?.url || ''}
      initials={account?.avatar?.initials || ''}
    />
  );
};

import React from 'react';

import { useLogInNavigation } from '../navigation/hooks';
import Screens from '../navigation/screens';
import { currentAccount, useAtom } from '../store/atoms';
import { Avatar } from './Avatar';

export const HeaderAvatar = ({ disabled }: { disabled?: boolean }) => {
  const { navigate } = useLogInNavigation();
  const [account] = useAtom(currentAccount);

  return (
    <Avatar
      onPress={
        disabled
          ? undefined
          : () => {
              navigate(Screens.Settings);
            }
      }
      uri={account?.avatar?.url || ''}
      initials={account?.avatar?.initials || ''}
    />
  );
};

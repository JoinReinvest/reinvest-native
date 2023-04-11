import React, { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { Icon } from '../../Icon';
import { styles } from './styles';

export const MainModalWrapper = ({ dialogContent, children, dark }: PropsWithChildren<{ dark?: boolean; dialogContent?: ReactNode }>) => {
  const { closeDialog } = useDialog();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.mainWrapper, dark && styles.dark, { paddingTop: top }, styles.content]}>
      {dialogContent || children}
      <Icon
        onPress={closeDialog}
        style={[styles.closeIcon, { top: top || 12 }]}
        icon="hamburgerClose"
        color={dark ? palette.pureWhite : palette.pureBlack}
      />
    </View>
  );
};

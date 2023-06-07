import React, { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { isIOS } from '../../../constants/common';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { xScale, yScale } from '../../../utils/scale';
import { Box } from '../../Containers/Box/Box';
import { Icon } from '../../Icon';
import { Sygnet } from '../../Icon/icons';
import { styles } from './styles';

export interface MainModalWrapperProps {
  closeIcon?: boolean;
  dark?: boolean;
  dialogContent?: ReactNode;
  header?: ReactNode | null;
  showLogo?: boolean;
}

export const MainModalWrapper = ({
  dialogContent,
  children,
  dark,
  closeIcon = true,
  showLogo = false,
  header = null,
}: PropsWithChildren<MainModalWrapperProps>) => {
  const { closeDialog } = useDialog();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.mainWrapper, dark && styles.dark]}>
      {showLogo && (
        <View style={{ position: 'absolute', height: yScale(459), width: yScale(459), opacity: 0.4, bottom: yScale(-29), left: xScale(53) }}>
          <Sygnet color={palette.lightGray} />
        </View>
      )}
      {!!header && (
        <Box
          px="24"
          style={{ paddingTop: isIOS ? top + 24 : 24 }}
        >
          {header}
        </Box>
      )}
      {dialogContent || children}
      {!header && closeIcon && (
        <Icon
          onPress={closeDialog}
          style={[styles.closeIcon, { top: top || 12 }]}
          icon="hamburgerClose"
          color={dark ? palette.pureWhite : palette.pureBlack}
        />
      )}
    </View>
  );
};

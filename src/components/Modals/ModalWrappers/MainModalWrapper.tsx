import React, { PropsWithChildren, ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '../../../components/Containers/Box/Box';
import { Sygnet } from '../../../components/Icon/icons';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { xScale, yScale } from '../../../utils/scale';
import { Icon } from '../../Icon';
import { styles } from './styles';

export interface MainModalWrapperProps {
  closeIcon?: boolean;
  dark?: boolean;
  dialogContent?: ReactNode;
  header?: JSX.Element | null;
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
    <View style={[styles.mainWrapper, dark && styles.dark, { paddingTop: top }]}>
      {showLogo && (
        <View style={{ position: 'absolute', height: yScale(459), width: yScale(459), opacity: 0.4, bottom: yScale(-29), left: xScale(53) }}>
          <Sygnet />
        </View>
      )}
      {!!header && (
        <Box
          px="24"
          mt="24"
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

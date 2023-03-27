import {View} from 'react-native';
import React, {ReactNode} from 'react';
import {styles} from './styles';
import {Icon} from '@components/Icon';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDialog} from '@providers/DialogProvider';
import {palette} from '@constants/theme';

export const MainModalWrapper = ({
  dialogContent,
  dark,
}: {
  dialogContent: ReactNode;
  dark?: boolean;
}) => {
  const {closeDialog} = useDialog();
  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.mainWrapper, dark && styles.dark, {paddingTop: top}]}>
      {dialogContent}
      <Icon
        onPress={closeDialog}
        style={[styles.closeIcon, {top: top || 12}]}
        icon={'hamburgerClose'}
        color={dark ? palette.pureWhite : palette.pureBlack}
      />
    </View>
  );
};

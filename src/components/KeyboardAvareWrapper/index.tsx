import { isIOS } from '@constants/common';
import { HEADER_HEIGHT } from '@constants/styles';
import React, { PropsWithChildren } from 'react';
import { KeyboardAvoidingView, StatusBar, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';

export interface Props {
  style?: StyleProp<ViewStyle>;
}

export const KeyboardAwareWrapper = ({ children, style }: PropsWithChildren<Props>) => {
  const { top } = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={HEADER_HEIGHT + top + (!isIOS ? StatusBar.currentHeight || 0 : 0)}
      behavior={isIOS ? 'padding' : 'height'}
      style={[styles.container, style, isIOS && { flex: 1 }]}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

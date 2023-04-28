import React, { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { styles } from './styles';

export const PaddedScrollView = ({
  children,
  dark = true,
  safeInset = false,
  style,
  ...props
}: PropsWithChildren<ScrollViewProps & { dark?: boolean; safeInset?: boolean }>) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <ScrollView
      style={[styles.wrapper, style && style]}
      indicatorStyle={dark ? 'white' : 'default'}
      {...props}
      contentContainerStyle={[props.contentContainerStyle, safeInset && { paddingBottom: bottom }]}
    >
      {children}
    </ScrollView>
  );
};

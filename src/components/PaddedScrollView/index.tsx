import React, { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';

import { styles } from './styles';

export const PaddedScrollView = ({ children, dark = true, style, ...props }: PropsWithChildren<ScrollViewProps & { dark?: boolean }>) => {
  return (
    <ScrollView
      style={[styles.wrapper, style && style]}
      indicatorStyle={dark ? 'white' : 'default'}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

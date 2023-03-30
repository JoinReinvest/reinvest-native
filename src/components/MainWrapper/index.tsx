import React, { PropsWithChildren } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

import { styles } from './styles';
import { MainWrapperProps } from './types';

export const MainWrapper = ({
  children,
  isScroll,
  noScrollableContent,
  contentContainerStyle,
  dark,
  style,
  noPadding,
}: PropsWithChildren<MainWrapperProps>) => {
  return (
    <View style={[!dark ? styles.light : styles.dark]}>
      <StatusBar
        hidden={false}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      {isScroll ? (
        <>
          <ScrollView contentContainerStyle={[styles.wrapper, noPadding && styles.noPadding, contentContainerStyle, dark && styles.dark]}>
            {children}
          </ScrollView>
          {noScrollableContent?.(styles.wrapperPadding)}
        </>
      ) : (
        <View style={[styles.wrapper, styles.staticWrapper, noPadding && styles.noPadding, dark && styles.dark, style]}>{children}</View>
      )}
    </View>
  );
};

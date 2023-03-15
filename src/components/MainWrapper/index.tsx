import React, {PropsWithChildren} from 'react';
import {ScrollView, StatusBar, View} from 'react-native';
import {styles} from './styles';
import {MainWrapperProps} from './types';

export const MainWrapper = ({
  children,
  isScroll,
  noScrollableContent,
  contentContainerStyle,
  dark,
  style,
}: PropsWithChildren<MainWrapperProps>) => {
  return (
    <View style={[!dark ? styles.light : styles.dark]}>
      <StatusBar
        hidden={false}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      {isScroll ? (
        <>
          <ScrollView
            contentContainerStyle={[
              styles.wrapper,
              contentContainerStyle,
              dark && styles.dark,
            ]}>
            {children}
          </ScrollView>
          {noScrollableContent?.(styles.wrapperPadding)}
        </>
      ) : (
        <View
          style={[
            styles.wrapper,
            styles.staticWrapper,
            dark && styles.dark,
            style,
          ]}>
          {children}
        </View>
      )}
    </View>
  );
};

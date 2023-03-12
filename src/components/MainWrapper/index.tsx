import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {styles} from './styles';
import {MainWrapperProps} from './types';

export const MainWrapper = ({
  children,
  isLoading,
  isScroll,
  noScrollableContent,
  contentContainerStyle,
  dark,
  shouldSafeArea = true,
  style,
}: PropsWithChildren<MainWrapperProps>) => {
  const Wrapper = shouldSafeArea ? SafeAreaView : View;
  return (
    <Wrapper style={[dark && styles.dark]}>
      <StatusBar hidden={false} barStyle="dark-content" />
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
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </Wrapper>
  );
};

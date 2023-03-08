import React, {PropsWithChildren} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import styles from './MainWrapper.styles';
import {MainWrapperProps} from './MainWrapper.types';

const MainWrapper = ({
  children,
  isLoading,
  isScroll,
  noScrollableContent,
  contentContainerStyle,
  dark,
}: PropsWithChildren<MainWrapperProps>) => (
  <SafeAreaView>
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
      <View style={[styles.wrapper, styles.staticWrapper, dark && styles.dark]}>
        {children}
      </View>
    )}
    {isLoading && (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size="large" />
      </View>
    )}
  </SafeAreaView>
);

export default MainWrapper;

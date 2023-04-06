import React, { PropsWithChildren } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

import { Loader } from '../../components/Loader';
import { palette } from '../../constants/theme';
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
  isLoading,
}: PropsWithChildren<MainWrapperProps>) => {
  const LoaderComp = isLoading && (
    <View style={[styles.loaderWrapper]}>
      <Loader color={palette.deepGreen} />
    </View>
  );

  return (
    <View style={[!dark ? styles.light : styles.dark, styles.flex]}>
      <StatusBar
        hidden={false}
        barStyle={dark ? 'light-content' : 'dark-content'}
      />
      {isScroll ? (
        <>
          <ScrollView contentContainerStyle={[styles.wrapper, noPadding && styles.noPadding, contentContainerStyle, dark && styles.dark]}>
            {children}
            {LoaderComp}
          </ScrollView>
          {noScrollableContent?.(styles.wrapperPadding)}
        </>
      ) : (
        <View style={[styles.wrapper, styles.staticWrapper, noPadding && styles.noPadding, dark && styles.dark, style]}>
          {children}
          {LoaderComp}
        </View>
      )}
    </View>
  );
};

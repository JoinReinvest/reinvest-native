import React, { PropsWithChildren } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../constants/theme';
import { Loader } from '../Loader';
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
  bottomSafe,
  topSafe,
}: PropsWithChildren<MainWrapperProps>) => {
  const { bottom, top } = useSafeAreaInsets();
  const LoaderComp = isLoading && (
    <View style={[styles.loaderWrapper, dark && styles.darkLoader]}>
      <Loader color={dark ? palette.pureWhite : palette.deepGreen} />
    </View>
  );

  return (
    <View style={[!dark ? styles.light : styles.dark, styles.flex, bottomSafe && { paddingBottom: bottom }, topSafe && { paddingTop: top }]}>
      <StatusBar
        hidden={false}
        backgroundColor="transparent"
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

import React, { PropsWithChildren, useMemo } from 'react';
import { Platform, ScrollView, StatusBar, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../constants/theme';
import { NAVBAR_HEIGHT } from '../../utils/scale';
import { ContainerOverlay } from '../Containers/ContainerOverlay';
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
    <ContainerOverlay dark={dark}>
      <Loader color={dark ? palette.pureWhite : palette.deepGreen} />
    </ContainerOverlay>
  );

  const bottomSafeStyle = useMemo(() => {
    const minBottom = bottom ? bottom : 16;

    return Platform.select({
      ios: { paddingBottom: minBottom },
      android: { paddingBottom: 16 + NAVBAR_HEIGHT },
    });
  }, [bottom]);

  return (
    <View style={[!dark ? styles.light : styles.dark, styles.flex, bottomSafe && bottomSafeStyle, topSafe && { paddingTop: top }]}>
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

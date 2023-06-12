import React, { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { palette } from '../../constants/theme';
import { ContainerOverlay } from '../Containers/ContainerOverlay';
import { Loader } from '../Loader';
import { styles } from './styles';

export const PaddedScrollView = ({
  children,
  dark,
  safeInset = false,
  isLoading,
  style,
  noPadding = false,
  ...props
}: PropsWithChildren<ScrollViewProps & { dark?: boolean; isLoading?: boolean; noPadding?: boolean; safeInset?: boolean }>) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <ScrollView
        style={[styles.wrapper, noPadding && styles.noPadding, style && style]}
        indicatorStyle={dark ? 'white' : 'default'}
        {...props}
        contentContainerStyle={[props.contentContainerStyle, safeInset && { paddingBottom: bottom }]}
      >
        {children}
      </ScrollView>
      {isLoading && (
        <ContainerOverlay dark={dark}>
          <Loader color={dark ? palette.pureWhite : palette.pureBlack} />
        </ContainerOverlay>
      )}
    </>
  );
};

import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { gradients, palette } from '../../constants/theme';
import DefaultLeftHeaderColumn from '../CustomHeader/DefaultLeftHeaderColumn';
import { Logo } from '../Icon/icons';
import { StyledText } from '../typography/StyledText';
import styles from './styles';

export const CustomHeader = ({ children, style, dark, ...rest }: PropsWithChildren<ViewProps & { dark?: boolean }>) => {
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={[styles.wrapper, dark && styles.wrapperDark, { paddingTop: top }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};

export const ScreenHeader = ({
  navigation,
  dark,
  options: { title, headerRight, headerLeft, headerShown },
  showGradient = true,
}: (NativeStackHeaderProps | BottomTabHeaderProps) & {
  dark?: boolean;
  showGradient?: boolean;
  title?: string | 'logo';
}) => {
  const headerProps = { canGoBack: navigation.canGoBack(), tintColor: '' };
  const renderHeaderLeft = () => {
    if (headerLeft) {
      return headerLeft?.(headerProps);
    }

    return (
      <DefaultLeftHeaderColumn
        dark={dark}
        {...headerProps}
      />
    );
  };

  if (!headerShown && typeof headerShown !== 'undefined') {
    return null;
  }

  return (
    <CustomHeader dark={dark}>
      {showGradient && (
        <LinearGradient
          colors={gradients.headerGradient}
          style={{ ...StyleSheet.absoluteFillObject }}
        />
      )}
      <View style={[styles.innerWrapper]}>
        <View style={styles.sideSegment}>{renderHeaderLeft()}</View>
        {title === 'logo' ? (
          <View style={styles.logo}>
            <Logo color={dark ? palette.pureWhite : palette.pureBlack} />
          </View>
        ) : (
          <StyledText
            color={dark ? 'pureWhite' : 'pureBlack'}
            variant="h5"
          >
            {title}
          </StyledText>
        )}
        <View style={styles.sideSegment}>{headerRight && <View style={styles.rightColumn}>{headerRight?.(headerProps)}</View>}</View>
      </View>
    </CustomHeader>
  );
};

export const DarkScreenHeader = (props: NativeStackHeaderProps) => {
  return (
    <ScreenHeader
      dark
      showGradient={false}
      {...props}
    />
  );
};

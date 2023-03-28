import DefaultLeftHeaderColumn from '@components/CustomHeader/DefaultLeftHeaderColumn';
import { Logo } from '@components/Icon/icons';
import { StyledText } from '@components/typography/StyledText';
import { palette } from '@constants/theme';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  options: { title, headerRight, headerLeft },
}: NativeStackHeaderProps & {
  dark?: boolean;
  title?: string | 'logo';
}) => {
  const headerProps = useMemo(() => ({ canGoBack: navigation.canGoBack(), tintColor: '' }), [navigation]);
  const renderHeaderLeft = useCallback(() => {
    if (headerLeft) {
      return headerLeft?.(headerProps);
    }
    return <DefaultLeftHeaderColumn dark={dark} />;
  }, [dark, headerLeft, headerProps]);

  return (
    <CustomHeader dark={dark}>
      <View style={[styles.innerWrapper]}>
        <View style={styles.sideSegment}>{renderHeaderLeft()}</View>
        {title === 'logo' ? (
          <View style={styles.logo}>
            <Logo color={dark ? palette.pureWhite : palette.pureBlack} />
          </View>
        ) : (
          <StyledText
            color={dark ? palette.pureWhite : palette.pureBlack}
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
      {...props}
    />
  );
};

import { PropsWithChildren } from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Icon } from './Icon';
import { Icons } from './Icon/types';
import { StyledText } from './typography/StyledText';

export interface NavigationButtonProps extends PressableProps {
  startIcon: Icons;
  showChevron?: boolean;
  size?: 'sm' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export const NavigationButton = ({ startIcon, size = 'sm', showChevron = true, style, children, ...rest }: PropsWithChildren<NavigationButtonProps>) => {
  return (
    <Pressable
      style={[styles.row, styles.container, style && style]}
      {...rest}
    >
      <View style={[styles.row, styles.label]}>
        <Icon icon={startIcon} />
        <StyledText
          color="pureBlack"
          variant={size === 'sm' ? 'button' : 'h6'}
        >
          {children}
        </StyledText>
      </View>
      {showChevron && <Icon icon="arrowRight" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    justifyContent: 'space-between',
    width: '100%',
  },

  label: {
    columnGap: 12,
  },
});

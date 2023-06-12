import React from 'react';
import { StyleSheet } from 'react-native';

import { palette } from '../constants/theme';
import { Box } from './Containers/Box/Box';
import { BoxProps } from './Containers/Box/types';
import { Row } from './Containers/Row';

export const BorderedDescription = (props: BoxProps & { isRow?: boolean }) => {
  const Component = props.isRow ? Row : Box;

  return (
    <Component
      px="16"
      py="12"
      fw
      style={styles.wrapper}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderColor: palette.lightGray,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

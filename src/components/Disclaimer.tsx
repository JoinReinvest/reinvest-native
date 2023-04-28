import React, { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { palette } from '../constants/theme';
import { Box } from './Containers/Box/Box';
import { Icon } from './Icon';
import { Icons } from './Icon/types';
import { StyledText } from './typography/StyledText';

interface DisclaimerProps {
  content: string;
  heading: string;
  icon: Icons;
}

export const Disclaimer = ({ icon, heading, content, children }: PropsWithChildren<DisclaimerProps>) => {
  return (
    <>
      <View style={styles.row}>
        <Icon
          size="s"
          color={palette.pureBlack}
          icon={icon}
        />
        <StyledText variant="paragraphEmp">{heading}</StyledText>
      </View>
      <Box ml="32">
        <StyledText variant="paragraphLarge">{content || children}</StyledText>
      </Box>
    </>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', columnGap: 8 },
});

import React from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { Icons } from '../../../components/Icon/types';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { CharacteristicT, CharacteristicType } from '../types';

interface Props {
  char: CharacteristicT;
  underlined?: boolean;
}

const typeToIcon = {
  education: 'school',
  transport: 'car',
} as Record<CharacteristicType, Icons>;
export const Characteristic = ({ char, underlined }: Props) => {
  return (
    <Row
      py="16"
      style={[underlined && styles.separator]}
      alignItems="center"
    >
      <Icon
        icon={typeToIcon[char.type]}
        size={'xl'}
      />
      <Box pl="12">
        <StyledText variant="button">{char.value}</StyledText>
        <StyledText
          color="dark2"
          variant="paragraphSmall"
        >
          {char.info}
        </StyledText>
      </Box>
    </Row>
  );
};

const styles = StyleSheet.create({
  separator: { borderBottomColor: palette.lightGray, borderBottomWidth: 1 },
});

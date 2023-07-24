import React, { ReactNode } from 'react';

import { useDialog } from '../../../../providers/DialogProvider';
import { Box } from '../../../Containers/Box/Box';
import { Icon } from '../../../Icon';
import { StyledText } from '../../../typography/StyledText';
import { styles } from './styles';

interface Props {
  content: ReactNode;
  heading: string;
}

export const ModalInformation = ({ heading, content }: Props) => {
  const { closeDialog } = useDialog();

  return (
    <Box
      flex={1}
      justifyContent="center"
    >
      <Box
        px="24"
        py="24"
        style={styles.modalWrapper}
      >
        <Box style={styles.modalContent}>
          <Box style={styles.modalHeader}>
            <StyledText variant="h6">{heading}</StyledText>

            <Icon
              icon="hamburgerClose"
              onPress={closeDialog}
            />
          </Box>

          <StyledText variant="bodyText">{content}</StyledText>
        </Box>
      </Box>
    </Box>
  );
};

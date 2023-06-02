import React from 'react';

import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { Row } from '../../../Containers/Row';
import { StyledText } from '../../../typography/StyledText';
import { styles } from './styles';

interface Props {
  heading: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export const ConfirmDelete = ({ heading, onSuccess, onCancel }: Props) => {
  const { closeDialog } = useDialog();

  const handleSuccess = () => {
    onSuccess();
    closeDialog();
  };

  const handleCancel = () => {
    onCancel?.();
    closeDialog();
  };

  return (
    <Box
      flex={1}
      justifyContent="center"
    >
      <Box
        px="default"
        py="32"
        style={styles.modalWrapper}
      >
        <StyledText variant="bonusHeading">{heading}</StyledText>
        <Row
          mt="24"
          justifyContent="space-between"
        >
          <Button
            variant="outlined"
            style={styles.button}
            onPress={handleCancel}
          >
            No
          </Button>
          <Button
            variant="primary"
            style={styles.button}
            onPress={handleSuccess}
          >
            Yes
          </Button>
        </Row>
      </Box>
    </Box>
  );
};

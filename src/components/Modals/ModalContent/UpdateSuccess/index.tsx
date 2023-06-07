import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogInNavigation } from '../../../../navigation/hooks';
import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { StatusCircle } from '../../../StatusCircle';

interface Props {
  info: string;
  buttonLabel?: string;
  onProceed?: () => void;
}

export const UpdateSuccess = ({ info, onProceed, buttonLabel }: Props) => {
  const { closeDialog } = useDialog();
  const { goBack } = useLogInNavigation();
  const { bottom } = useSafeAreaInsets();

  const buttonHandler = () => {
    if (!onProceed) {
      goBack();
    }

    onProceed?.();
    closeDialog();
  };

  return (
    <Box
      flex={1}
      style={{ paddingBottom: bottom }}
    >
      <Box flex={1}>
        <StatusCircle
          title={info}
          variant={'success'}
        />
      </Box>
      <Box
        fw
        px="default"
      >
        {!!buttonLabel && <Button onPress={buttonHandler}>{buttonLabel}</Button>}
      </Box>
    </Box>
  );
};

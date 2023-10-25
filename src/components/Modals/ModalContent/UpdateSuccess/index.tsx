import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useLogInNavigation } from '../../../../navigation/hooks';
import { useDialog } from '../../../../providers/DialogProvider';
import { NAVBAR_HEIGHT } from '../../../../utils/scale';
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

  const bottomSafeStyle = useMemo(() => {
    const minBottom = bottom ? bottom : 16;

    return Platform.select({
      ios: { paddingBottom: minBottom },
      android: { paddingBottom: 16 + NAVBAR_HEIGHT },
    });
  }, [bottom]);

  return (
    <Box
      flex={1}
      style={[bottomSafeStyle]}
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

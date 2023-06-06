import React from 'react';

import { Theme } from '../../../../constants/theme';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { useDialog } from '../../../../providers/DialogProvider';
import { Button } from '../../../Button';
import { Box } from '../../../Containers/Box/Box';
import { FormDisclaimer } from '../../../FormDisclaimer';
import { MainWrapper } from '../../../MainWrapper';
import { StatusCircle } from '../../../StatusCircle';
import { StyledText } from '../../../typography/StyledText';

interface Props {
  accountNumber: string;
  disclaimer?: string;
  iconFillColor?: Theme;
  label?: string;
  onProceed?: () => void;
}
export const AccountUpdateConfirmation = ({ accountNumber, iconFillColor = 'frostGreen', disclaimer, onProceed, label = 'Dashboard' }: Props) => {
  const { reset } = useLogInNavigation();
  const { closeDialog } = useDialog();

  const onContinue = () => {
    closeDialog();

    if (onProceed) {
      return onProceed();
    }

    return reset({ index: 0, routes: [{ name: Screens.BottomNavigator }] });
  };

  return (
    <MainWrapper bottomSafe>
      <Box
        flex={1}
        pt="24"
      >
        <StatusCircle
          variant="success"
          fillColor={iconFillColor}
          justifyContent="flex-start"
        >
          <Box py="8">
            <StyledText variant={'h5'}>{`Your bank account ending in ${accountNumber} has been removed.`} </StyledText>
          </Box>
          <FormDisclaimer
            pt="24"
            fw
          >
            {disclaimer}
          </FormDisclaimer>
        </StatusCircle>
      </Box>
      <Button onPress={onContinue}>{label}</Button>
    </MainWrapper>
  );
};

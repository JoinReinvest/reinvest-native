import { useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { TextArea } from '../../../../../components/TextArea';
import { StyledText } from '../../../../../components/typography/StyledText';
import { WithdrawalFundsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepReason: StepParams<WithdrawalFundsFormFields> = {
  identifier: Identifiers.REASON,

  Component: ({ storeFields, moveToNextStep, updateStoreFields }: StepComponentProps<WithdrawalFundsFormFields>) => {
    const [reason, setReason] = useState(storeFields.reason ?? '');

    const onSubmit = async () => {
      await updateStoreFields({ reason });
      moveToNextStep();
    };

    return (
      <Box
        fw
        flex={1}
      >
        <StyledText variant="h5">Why are you requesting to withdraw funds?</StyledText>
        <Box
          fw
          flex={1}
          mt="24"
        >
          <TextArea
            placeholder="Reason"
            value={reason}
            onChangeText={setReason}
          />
        </Box>
        <Box fw>
          <Button
            variant="warning"
            onPress={onSubmit}
          >
            Continue
          </Button>
        </Box>
      </Box>
    );
  },
};

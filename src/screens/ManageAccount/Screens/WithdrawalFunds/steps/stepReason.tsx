import { useState } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
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
        <PaddedScrollView
          noPadding
          style={{ marginTop: 24 }}
        >
          <TextArea
            placeholder="Reason"
            value={reason}
            onChangeText={setReason}
          />
        </PaddedScrollView>
        <Box fw>
          <Button
            isDestructive
            onPress={onSubmit}
          >
            Continue
          </Button>
        </Box>
      </Box>
    );
  },
};

import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { InvestingAmountTable } from '../ components/InvestingAmountTable';
import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { useInvestFlow } from '.';
import { styles } from './styles';

export const InitialInvestment: StepParams<InvestFormFields> = {
  identifier: Identifiers.INITIAL_INVESTMENT,

  Component: ({ moveToNextStep, storeFields, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const { progressPercentage } = useInvestFlow();
    const [amount, setAmount] = useState<string | undefined>(storeFields.investAmount);

    const handleContinue = async () => {
      await updateStoreFields({ investAmount: amount });
      moveToNextStep();
    };

    const handleSkip = () => {
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView keyboardShouldPersistTaps={'handled'}>
          <FormTitle headline="Make your initial one-time investment" />
          <InvestingAmountTable
            amount={amount}
            bankAccount={'*** *** *** *** 00000 '}
            setAmount={setAmount}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleSkip}
            disabled
            variant={'outlined'}
          >
            Skip
          </Button>
          <Button
            onPress={handleContinue}
            disabled={!amount?.length}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

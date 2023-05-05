import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

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

  Component: ({ moveToNextStep }: StepComponentProps<InvestFormFields>) => {
    const { progressPercentage } = useInvestFlow();

    const handleContinue = async () => {
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
        <PaddedScrollView>
          <FormTitle headline="Make your initial one-time investment" />
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
            // disabled={false || isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

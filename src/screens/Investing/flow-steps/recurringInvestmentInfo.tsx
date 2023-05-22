import React from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Icon } from '../../../components/Icon';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { useInvestFlow } from './index';
import { styles } from './styles';

export const RecurringInvestmentInfo: StepParams<InvestFormFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT,
  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<InvestFormFields>) => {
    const { resetStoreFields } = useInvestFlow();
    const { goBack } = useLogInNavigation();
    const handleContinue = async () => {
      await updateStoreFields({ isRecurringInvestment: true });
      moveToNextStep();
    };

    const handleSkip = async () => {
      if (!storeFields.oneTimeInvestmentId) {
        await resetStoreFields();

        return goBack();
      }

      await updateStoreFields({ isRecurringInvestment: false });

      moveToNextStep();
    };

    return (
      <>
        <Box
          flex={1}
          justifyContent={'center'}
          px={'default'}
        >
          <Box alignSelf={'center'}>
            <Icon
              size={'xxl'}
              icon={'recurringBig'}
            />
          </Box>
          <Box py={'24'}>
            <StyledText variant={'h5'}>Would you like to set up a recurring investment?</StyledText>
          </Box>
          <StyledText variant={'paragraphLarge'}>
            Regular contributions can help your investments grow over time. By scheduling a recurring investment, you can take advantage of the power of
            compound interest and watch your wealth accumulate.
          </StyledText>
        </Box>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleSkip}
            variant={'outlined'}
          >
            Skip
          </Button>
          <Button onPress={handleContinue}>Continue</Button>
        </View>
      </>
    );
  },
};

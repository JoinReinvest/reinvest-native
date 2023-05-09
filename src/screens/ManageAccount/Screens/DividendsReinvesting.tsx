import React from 'react';
import { Alert, View } from 'react-native';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormDisclaimer } from '../../../components/FormDisclaimer';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { InvestingDisclaimers } from '../../../constants/strings';
import { useLogInNavigation } from '../../../navigation/hooks';
import { useDialog } from '../../../providers/DialogProvider';
import { styles } from '../../Investing/flow-steps/styles';

const { headline, content } = InvestingDisclaimers.whatIsAutomaticDividendReinvesting;

export const DividendsReinvesting = () => {
  const { openDialog } = useDialog();
  const { goBack } = useLogInNavigation();
  const handleSkip = async () => {
    goBack();
  };

  const handleOptIn = () => {
    Alert.alert('Reinvesting dividend', 'Your dividends will be automatically reinvested', [{ text: 'OK', onPress: goBack }]);
  };

  const showInfo = () => {
    openDialog(
      <FormModalDisclaimer
        headline={headline}
        content={content}
      />,
    );
  };

  return (
    <>
      <PaddedScrollView>
        <Box py={'24'}>
          <StyledText variant={'h5'}>Opt in for automatic dividend reinvesting?</StyledText>
        </Box>
        <FormDisclaimer>
          <StyledText
            variant="link"
            onPress={showInfo}
          >
            What is automatic dividend reinvesting?
          </StyledText>
        </FormDisclaimer>
      </PaddedScrollView>
      <View
        key="buttons_section"
        style={styles.buttonsSection}
      >
        <Button
          variant="outlined"
          onPress={handleSkip}
        >
          Opt Out
        </Button>
        <Button onPress={handleOptIn}>Opt In</Button>
      </View>
    </>
  );
};

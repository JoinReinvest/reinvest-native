import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { LogoWithSygnet } from '../../../components/Icon/icons';
import { PlaidLogo } from '../../../components/Icon/icons/PlaidLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { HEADER_HEIGHT } from '../../../constants/styles';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { styles } from './styles';

export const PlaidInformation: StepParams<InvestFormFields> = {
  identifier: Identifiers.PLAID_INFORMATION,

  doesMeetConditionFields: fields => {
    return !fields.bankAccount;
  },

  Component: ({ moveToNextStep }: StepComponentProps<InvestFormFields>) => {
    const { top } = useSafeAreaInsets();
    const handleContinue = async () => {
      moveToNextStep();
    };

    return (
      <>
        <PaddedScrollView style={{ paddingTop: top + HEADER_HEIGHT }}>
          <Row
            justifyContent="center"
            alignItems="center"
          >
            <Box
              width={100}
              height={25}
              alignItems="flex-end"
            >
              <LogoWithSygnet />
            </Box>
            <Box
              mx="16"
              style={{ borderLeftColor: 'black', borderLeftWidth: 1, width: 1, height: 24 }}
            />
            <PlaidLogo />
          </Row>
          <Box
            pt="24"
            pb="16"
          >
            <StyledText variant="h5">REINVEST uses Plaid to connect your account</StyledText>
          </Box>
          <Box pt="24">
            <Row alignItems="center">
              <Icon
                icon="link"
                size="s"
              />
              <StyledText variant="paragraphEmp">Connect effortlessly</StyledText>
            </Row>
            <Box
              pl="24"
              pt="8"
            >
              <StyledText variant="paragraphLarge">Plaid lets you securely connect your financial accounts in seconds.</StyledText>
            </Box>
          </Box>
          <Box pt="24">
            <Row alignItems="center">
              <Icon
                icon="eyeHide"
                size="s"
              />
              <StyledText variant="paragraphEmp">Your data belongs to you</StyledText>
            </Row>
            <Box
              pl="24"
              pt="8"
            >
              <StyledText variant="paragraphLarge">Plaid doesn’t sell personal info, ad will only use it with your permission.</StyledText>
            </Box>
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button onPress={handleContinue}>Continue</Button>
        </View>
      </>
    );
  },
};

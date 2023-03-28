import React, {useState} from 'react';
import {FormTitle} from '@src/components/Forms/FormTitle';
import {styles} from './styles';
import {ACCOUNT_TYPES, AccountTypeValue} from '@src/constants/account-types';
import {Card} from '@src/components/Card';
import {ScrollView, View} from 'react-native';
import {StyledText} from '@src/components/typography/StyledText';
import {palette} from '@src/constants/theme';
import {Button} from '@src/components/Button';
import {OnboardingFormFields} from '../types';
import {Identifiers} from '../identifiers';
import {
  StepComponentProps,
  StepParams,
} from 'reinvest-app-common/src/services/form-flow';
import {useDialog} from '@providers/DialogProvider';
import {FormModalDisclaimer} from '@components/Modals/ModalContent/FormModalDisclaimer';
import {onBoardingDisclaimers} from '@constants/strings';

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({
    storeFields,
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<OnboardingFormFields>) => {
    const [selectedAccountType, setSelectedAccountType] = useState<
      AccountTypeValue | undefined
    >(storeFields.accountType);
    const {openDialog} = useDialog();

    const handleContinue = () => {
      updateStoreFields({accountType: selectedAccountType});
      moveToNextStep();
    };

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          headline={'Account types'}
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    return (
      <>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Which type of account would you like to open?"
          />
          <View style={styles.cardsWrapper}>
            {ACCOUNT_TYPES.map(account => (
              <Card
                selected={account.value === selectedAccountType}
                key={account.value}
                id={account.value}
                title={account.label}
                onCardPress={setSelectedAccountType}>
                {account.description}
              </Card>
            ))}
          </View>
          <StyledText
            style={styles.link}
            color={palette.frostGreen}
            variant="link"
            onPress={openDisclaimer}>
            Not sure which is best for you?
          </StyledText>
        </ScrollView>
        <View key={'buttons_section'} style={styles.buttonsSection}>
          <Button onPress={handleContinue} disabled={!selectedAccountType}>
            Continue
          </Button>
        </View>
      </>
    );
  },
};

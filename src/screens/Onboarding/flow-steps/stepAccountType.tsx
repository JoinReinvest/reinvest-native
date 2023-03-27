import { Button } from '@src/components/Button';
import { Card } from '@src/components/Card';
import { FormTitle } from '@src/components/Forms/FormTitle';
import { KeyboardAwareWrapper } from '@src/components/KeyboardAvareWrapper';
import { StyledText } from '@src/components/typography/StyledText';
import { ACCOUNT_TYPES, AccountTypeValue } from '@src/constants/account-types';
import { palette } from '@src/constants/theme';
import React, { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/form-flow';

import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { styles } from './styles';

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [selectedAccountType, setSelectedAccountType] = useState<AccountTypeValue | undefined>(storeFields.accountType);

    const handleContinue = () => {
      updateStoreFields({ accountType: selectedAccountType });
      moveToNextStep();
    };

    return (
      <KeyboardAwareWrapper style={styles.wrapper}>
        <ScrollView>
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
                onCardPress={setSelectedAccountType}
              >
                {account.description}
              </Card>
            ))}
          </View>
          <StyledText
            style={styles.link}
            color={palette.frostGreen}
            variant="link"
            onPress={() => Alert.alert('Not sure which is best for you?')}
          >
            Not sure which is best for you?
          </StyledText>
        </ScrollView>
        <View
          key={'buttons_section'}
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedAccountType}
          >
            Continue
          </Button>
        </View>
      </KeyboardAwareWrapper>
    );
  },
};

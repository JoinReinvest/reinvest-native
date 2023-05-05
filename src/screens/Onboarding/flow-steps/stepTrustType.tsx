import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { TRUST_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType, TrustCompanyTypeEnum } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { onBoardingDisclaimers } from '../../../constants/strings';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepTrustType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_TYPE,

  doesMeetConditionFields(fields) {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;

    return hasProfileFields && isTrustAccount;
  },

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedTrustType, setSelectedTrustType] = useState<TrustCompanyTypeEnum | undefined>(storeFields.trustType);
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const { openDialog } = useDialog();

    const handleContinue = async () => {
      await updateStoreFields({ trustType: selectedTrustType });

      if (storeFields.accountId && selectedTrustType) {
        await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { companyType: { type: selectedTrustType } } });
      }
    };

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          dark
          headline="Account types"
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    const handleSelectTrustType = (selectedType: TrustCompanyTypeEnum) => setSelectedTrustType(selectedType);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Which type of Trust do you have?"
          />
          {error && (
            <FormMessage
              variant="error"
              message={error.response.errors.map(err => err.message).join(', ')}
            />
          )}
          <View style={styles.cardsWrapper}>
            {TRUST_TYPES_AS_OPTIONS.map(({ title, value, description }) => (
              <Card<TrustCompanyTypeEnum>
                selected={value === selectedTrustType}
                key={value}
                id={value}
                value={value as TrustCompanyTypeEnum}
                title={title}
                description={description}
                onCardPress={handleSelectTrustType}
              />
            ))}
          </View>
          <StyledText
            style={styles.link}
            color="frostGreen"
            variant="link"
            onPress={openDisclaimer}
          >
            Not sure which is best for you?
          </StyledText>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedTrustType || isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

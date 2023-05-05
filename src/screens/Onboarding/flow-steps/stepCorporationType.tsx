import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { CORPORATION_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { CorporateCompanyTypeEnum, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
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

export const StepCorporationType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_TYPE,
  doesMeetConditionFields(fields) {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isCorporateAccount = fields.accountType === DraftAccountType.Corporate;

    return hasProfileFields && isCorporateAccount;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedCorporationType, setSelectedCorporationType] = useState<CorporateCompanyTypeEnum | undefined>(
      storeFields.corporationType as CorporateCompanyTypeEnum,
    );
    const { openDialog } = useDialog();
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);

    const handleContinue = async () => {
      updateStoreFields({ corporationType: selectedCorporationType });

      if (storeFields.accountId && selectedCorporationType) {
        await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { companyType: { type: selectedCorporationType } } });
      }

      moveToNextStep();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          dark
          headline="Account types"
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="What type of Corporation do you have?"
          />
          {error && <ErrorMessagesHandler error={error} />}
          <View style={styles.cardsWrapper}>
            {CORPORATION_TYPES_AS_OPTIONS.map(({ title, value, description }) => (
              <Card
                selected={value === selectedCorporationType}
                key={value}
                id={value}
                value={value}
                title={title}
                description={description}
                onCardPress={value => setSelectedCorporationType(value as CorporateCompanyTypeEnum)}
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
            disabled={!selectedCorporationType || isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

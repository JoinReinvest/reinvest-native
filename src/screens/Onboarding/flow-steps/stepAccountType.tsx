import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { ACCOUNT_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useGetListAccount } from 'reinvest-app-common/src/services/queries/getListAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { onBoardingDisclaimers } from '../../../constants/strings';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedAccountType, setSelectedAccountType] = useState<DraftAccountType | undefined>(storeFields.accountType);
    const { openDialog } = useDialog();

    const { isSuccess, mutateAsync: createDraftAccount } = useCreateDraftAccount(getApiClient);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const { data: draftAccountList } = useGetListAccount(getApiClient);

    const handleContinue = async () => {
      const existingDraft = draftAccountList?.find(draft => draft?.type === selectedAccountType);

      if (existingDraft) {
        await updateStoreFields({ accountType: existingDraft.type || undefined, accountId: existingDraft?.id || undefined });

        return moveToNextStep();
      }

      await createDraftAccount({ type: selectedAccountType! });

      await updateStoreFields({ accountType: selectedAccountType });
      moveToNextStep();
    };

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          headline="Account types"
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Which type of account would you like to open?"
          />
          <View style={styles.cardsWrapper}>
            {ACCOUNT_TYPES_AS_OPTIONS.map(({ title, value, description }) => (
              <Card<DraftAccountType>
                selected={value === selectedAccountType}
                key={value}
                id={value}
                value={value as DraftAccountType}
                title={title}
                description={description}
                onCardPress={setSelectedAccountType}
              />
            ))}
          </View>
          <StyledText
            style={styles.link}
            color={palette.frostGreen}
            variant="link"
            onPress={openDisclaimer}
          >
            Not sure which is best for you?
          </StyledText>
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!selectedAccountType}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

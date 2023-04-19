import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ACCOUNT_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useGetIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/getIndividualDraftAccount';
import { useGetListAccount } from 'reinvest-app-common/src/services/queries/getListAccount';
import { useGetPhoneCompleted } from 'reinvest-app-common/src/services/queries/getPhoneCompleted';
import { DraftAccount, DraftAccountType, Employer, EmploymentStatus, IndividualDraftAccount } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
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

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedAccountType, setSelectedAccountType] = useState<DraftAccountType | undefined>(storeFields.accountType);
    const { openDialog } = useDialog();
    const [accountId, setAccountId] = useState<string>('');

    const { isSuccess, mutateAsync: createDraftAccount } = useCreateDraftAccount(getApiClient);
    const { data: draftAccountList } = useGetListAccount(getApiClient);
    const { data: phoneCompleted } = useGetPhoneCompleted(getApiClient);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    useEffect(() => {
      if (phoneCompleted) {
        updateStoreFields({
          ...storeFields,
          _isPhoneCompleted: phoneCompleted,
        });
      }
    }, [phoneCompleted, storeFields, updateStoreFields]);

    const { refetch: refetchIndividualDraft } = useGetIndividualDraftAccount(getApiClient, {
      accountId,
      config: { enabled: false },
    });

    const selectType = (type: DraftAccountType | undefined) => {
      if (draftAccountList) {
        const specificTypeDraftID = draftAccountList.find(el => (el as DraftAccount).type === type)?.id || '';
        setAccountId(specificTypeDraftID);
      }

      setSelectedAccountType(type);
    };

    const handleContinue = async () => {
      const existingDraft = draftAccountList?.find(draft => draft?.type === selectedAccountType);

      if (existingDraft) {
        let draftAccountDetails;

        /*
        For each type of account we will need to map values to feed form
         */
        if (existingDraft.type === DraftAccountType.Individual) {
          const response = await refetchIndividualDraft();
          draftAccountDetails = response.data;

          await updateStoreFields({
            accountType: existingDraft.type || undefined,
            accountId: existingDraft?.id || undefined,
            profilePicture: draftAccountDetails?.avatar?.url || '',
            ...((draftAccountDetails?.details as Exclude<IndividualDraftAccount, null | undefined>) || {}),
            employmentStatus: draftAccountDetails?.details?.employmentStatus?.status as EmploymentStatus,
            employer: draftAccountDetails?.details?.employer as Employer,
            netWorth: draftAccountDetails?.details?.netWorth?.range as string,
            netIncome: draftAccountDetails?.details?.netIncome?.range as string,
          });
        } else {
          await updateStoreFields({ accountType: existingDraft.type || undefined, accountId: existingDraft?.id || undefined });
        }

        return moveToNextStep();
      }

      await createDraftAccount({ type: selectedAccountType as DraftAccountType });

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
        <PaddedScrollView>
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
                onCardPress={selectType}
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
            disabled={!selectedAccountType}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { ACCOUNT_TYPES_AS_OPTIONS } from 'reinvest-app-common/src/constants/account-types';
import { CorporationAnnualRevenue, CorporationNumberOfEmployees } from 'reinvest-app-common/src/constants/corporation';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useGetCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/getCorporateDraftAccount';
import { useGetIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/getIndividualDraftAccount';
import { useGetListAccount } from 'reinvest-app-common/src/services/queries/getListAccount';
import { useGetListAccountTypesUserCanOpen } from 'reinvest-app-common/src/services/queries/getListAccountTypesUserCanOpen';
import { useGetPhoneCompleted } from 'reinvest-app-common/src/services/queries/getPhoneCompleted';
import { useGetTrustDraftAccount } from 'reinvest-app-common/src/services/queries/getTrustDraftAccount';
import {
  AccountType,
  Address,
  DraftAccount,
  DraftAccountType,
  Employer,
  EmploymentStatus,
  IndividualDraftAccount,
  TrustCompanyTypeEnum,
} from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Card } from '../../../components/Card';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { onBoardingDisclaimers } from '../../../constants/strings';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { apiStakeholderToApplicant } from '../../../utils/mappers';
import { Identifiers } from '../identifiers';
import { IdentificationDocuments, OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedAccountType, setSelectedAccountType] = useState<DraftAccountType | undefined>(storeFields.accountType);
    const { openDialog } = useDialog();
    const [accountId, setAccountId] = useState<string>('');

    const { isSuccess, mutateAsync: createDraftAccount, isLoading } = useCreateDraftAccount(getApiClient);
    const { data: draftAccountList } = useGetListAccount(getApiClient);
    const { data: phoneCompleted } = useGetPhoneCompleted(getApiClient);
    const { data: listAccountTypesUserCanOpen, isLoading: isListAccountTypesUserCanOpenLoading } = useGetListAccountTypesUserCanOpen(getApiClient);

    const { refetch: refetchTrustDraftAccount } = useGetTrustDraftAccount(getApiClient, {
      accountId: accountId,
      config: { enabled: false },
    });

    const { refetch: refetchIndividualDraft } = useGetIndividualDraftAccount(getApiClient, {
      accountId,
      config: { enabled: false },
    });

    const { refetch: refetchCorporateDraft } = useGetCorporateDraftAccount(getApiClient, {
      accountId: accountId,
      config: { enabled: false },
    });

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

        switch (existingDraft.type) {
          case DraftAccountType.Individual:
            {
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
            }
            break;
          case DraftAccountType.Trust:
            {
              const response = await refetchTrustDraftAccount();
              const trustDraftAccountData = response.data;
              await updateStoreFields({
                ...storeFields,
                accountType: existingDraft.type || undefined,
                businessAddress: trustDraftAccountData?.details?.address as Address,
                trustLegalName: trustDraftAccountData?.details?.companyName?.name as string,
                trustType: trustDraftAccountData?.details?.companyType?.type as unknown as TrustCompanyTypeEnum,
                ein: trustDraftAccountData?.details?.ein?.ein as string,
                accountId: trustDraftAccountData?.id || '',
                fiduciaryEntityInformation: {
                  industry: trustDraftAccountData?.details?.industry?.value ?? '',
                  numberOfEmployees: trustDraftAccountData?.details?.numberOfEmployees?.range as CorporationNumberOfEmployees,
                  annualRevenue: trustDraftAccountData?.details?.annualRevenue?.range as CorporationAnnualRevenue,
                },
                documentsForTrust: (trustDraftAccountData?.details?.companyDocuments as IdentificationDocuments) ?? [],
                trustTrusteesGrantorsOrProtectors: trustDraftAccountData?.details?.stakeholders?.map(apiStakeholderToApplicant),
              });
            }
            break;
          case DraftAccountType.Corporate:
            {
              const response = await refetchCorporateDraft();
              const corporateDraftAccount = response.data;
              await updateStoreFields({
                ...storeFields,
                accountType: existingDraft.type || undefined,
                businessAddress: corporateDraftAccount?.details?.address as Address,
                corporationType: corporateDraftAccount?.details?.companyType?.type || undefined,
                ein: corporateDraftAccount?.details?.ein?.ein as string,
                accountId: corporateDraftAccount?.id || '',
                corporationLegalName: corporateDraftAccount?.details?.companyName?.name || '',
                documentsForCorporation: (corporateDraftAccount?.details?.companyDocuments as IdentificationDocuments) ?? [],
                fiduciaryEntityInformation: {
                  industry: corporateDraftAccount?.details?.industry?.value ?? '',
                  numberOfEmployees: corporateDraftAccount?.details?.numberOfEmployees?.range as CorporationNumberOfEmployees,
                  annualRevenue: corporateDraftAccount?.details?.annualRevenue?.range as CorporationAnnualRevenue,
                },
                companyMajorStakeholderApplicants: corporateDraftAccount?.details?.stakeholders?.map(apiStakeholderToApplicant),
              });
            }
            break;
          default:
            {
              await updateStoreFields({ accountType: existingDraft.type || undefined, accountId: existingDraft?.id || undefined });
            }
            break;
        }

        return moveToNextStep();
      }

      const response = await createDraftAccount({ type: selectedAccountType as DraftAccountType });

      await updateStoreFields({ accountType: selectedAccountType, accountId: response?.id ?? '' });
      moveToNextStep();
    };

    const openDisclaimer = () =>
      openDialog(
        <FormModalDisclaimer
          dark
          headline="Account types"
          content={onBoardingDisclaimers.notSureWhichBestForYou}
        />,
      );

    const accountsAvailableToOpen = ACCOUNT_TYPES_AS_OPTIONS.filter(accountType => listAccountTypesUserCanOpen?.includes(accountType.value as AccountType));

    if (isListAccountTypesUserCanOpenLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Loader
            size="xl"
            color={palette.pureWhite}
          />
        </View>
      );
    }

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Which type of account would you like to open?"
          />
          <View style={styles.cardsWrapper}>
            {accountsAvailableToOpen.map(({ title, value, description }) => (
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
            disabled={!selectedAccountType || isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

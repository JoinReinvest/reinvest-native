import React, { useRef } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { AddressInput, DocumentFileLinkInput, DraftAccountType, SimplifiedDomicileType } from 'reinvest-app-common/src/types/graphql';
import { formatDateForApi } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { ApplicantFormModal } from '../../../components/Modals/ModalContent/ApplicantForm';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { EMPTY_APPLICANT_FORM } from '../../../constants/applicants';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { MAX_APPLICANTS_COUNT } from '../../../utils/formValidationRules';
import { apiStakeholderToApplicant } from '../../../utils/mappers';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { apiSSN } from '../../../utils/regexes';
import { Identifiers } from '../identifiers';
import { Applicant, IndexedSchema, OnboardingFormFields } from '../types';
import { getDefaultValuesForApplicantWithoutIdentification } from '../utilities';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepCorporateApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields: fields => {
    return fields.accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { companyMajorStakeholderApplicants, corporationLegalName } = storeFields;
    const lowerCasedCorporationLegalName = lowerCaseWithoutSpacesGenerator(corporationLegalName || '');
    const applicantsRef = useRef<Applicant[]>(companyMajorStakeholderApplicants ?? []);
    const { mutateAsync: mutateCorporate } = useCompleteCorporateDraftAccount(getApiClient);

    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog, closeDialog } = useDialog();

    const hasApplicants = !!applicantsRef.current.length;

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = applicantsRef.current.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const uploadApplicant = async (applicant: Applicant) => {
      if (!storeFields.accountId) {
        return;
      }

      const stakeholders = [
        {
          id: applicant.id,
          name: {
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            middleName: applicant.middleName,
          },
          dateOfBirth: {
            dateOfBirth: applicant.dateOfBirth ? formatDateForApi(applicant.dateOfBirth) : '',
          },
          address: { ...applicant.residentialAddress, country: 'USA' } as AddressInput,
          idScan: applicant.idScan as DocumentFileLinkInput[],
          // when ssn is anonymized we need to send null
          ssn: !apiSSN.test(applicant?.socialSecurityNumber || '')
            ? {
                ssn: applicant.socialSecurityNumber,
              }
            : undefined,
          domicile: {
            type: applicant.domicile || SimplifiedDomicileType.Citizen,
          },
        },
      ];
      const response = await mutateCorporate({ accountId: storeFields.accountId, input: { stakeholders } });
      const currentStakeholders = response?.details?.stakeholders?.map(apiStakeholderToApplicant);
      applicantsRef.current = currentStakeholders || [];

      return updateStoreFields({ companyMajorStakeholderApplicants: currentStakeholders });
    };

    const updateApplicants = async (submittedApplicant: Applicant, applicantIndex: number | undefined) => {
      if (applicantIndex === undefined) {
        applicantsRef.current = [...applicantsRef.current, submittedApplicant];
      }

      if (applicantIndex !== undefined && applicantIndex >= 0) {
        applicantsRef.current = applicantsRef.current.map((applicant, index) => (applicantIndex === index ? submittedApplicant : applicant));
      }

      if (typeof applicantIndex === 'number') {
        submittedApplicant.id = indexedStakeholderApplicants[applicantIndex]?.id;
      }

      await uploadApplicant(submittedApplicant);
      closeDialog();
    };

    const onAddNewApplicant = () => {
      openDialog(
        <ApplicantFormModal
          onSubmit={updateApplicants}
          onClose={closeDialog}
          defaultValues={EMPTY_APPLICANT_FORM}
        />,
        {
          animationType: 'none',
          closeIcon: false,
        },
      );
    };

    const onContinue = async () => {
      await updateStoreFields({
        companyMajorStakeholderApplicants: applicantsRef.current,
      });
      moveToNextStep();
    };

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      const defaultValues = getDefaultValuesForApplicantWithoutIdentification(applicantsRef.current, applicant._index);

      if (applicant._index !== undefined) {
        openDialog(
          <ApplicantFormModal
            defaultValues={defaultValues}
            applicantIndex={applicant._index}
            onSubmit={updateApplicants}
            onClose={closeDialog}
          />,
          {
            animationType: 'none',
            closeIcon: false,
          },
        );
      }
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline={hasApplicants ? 'Your applicants.' : 'Major Stakeholder Applicants'}
            description={hasApplicants ? '' : 'For each major stakeholder with a 20% or greater equity stake, we require their information.'}
          />
          {hasApplicants && (
            <Box mb="20">
              {indexedStakeholderApplicants.map(applicant => (
                <View
                  style={{ flexDirection: 'row', columnGap: 27, justifyContent: 'space-between' }}
                  key={`${lowerCasedCorporationLegalName}-${applicant._index}`}
                >
                  <StyledText color="pureWhite">
                    {applicant.firstName} {applicant.lastName}
                  </StyledText>
                  <Icon
                    icon="edit"
                    color={palette.pureWhite}
                    onPress={() => onEditApplicant(applicant)}
                  />
                </View>
              ))}
            </Box>
          )}
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection, { flexDirection: hasApplicants ? 'column-reverse' : 'column' }]}
        >
          <Button
            variant={hasApplicants ? 'primary' : 'outlined'}
            onPress={onContinue}
          >
            {hasApplicants ? 'Continue' : 'Skip'}
          </Button>
          <Button
            disabled={applicantsRef.current.length >= MAX_APPLICANTS_COUNT}
            variant={hasApplicants ? 'outlined' : 'primary'}
            onPress={onAddNewApplicant}
          >
            Add Applicant
          </Button>
        </View>
      </>
    );
  },
};

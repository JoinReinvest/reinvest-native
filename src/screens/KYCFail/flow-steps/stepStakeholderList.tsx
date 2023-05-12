import React, { useRef } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { AddressInput, DocumentFileLinkInput, SimplifiedDomicileType, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { ApplicantFormModal } from '../../../components/Modals/ModalContent/ApplicantForm';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { apiStakeholderToApplicant } from '../../../utils/mappers';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { apiSSN } from '../../../utils/regexes';
import { Applicant, IndexedSchema } from '../../Onboarding/types';
import { getDefaultValuesForApplicantWithoutIdentification } from '../../Onboarding/utilities';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';
import { useKYCFailedFlow } from '.';
import { styles } from './styles';

export const StepStakeholderList: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.STAKEHOLDER_LIST,

  doesMeetConditionFields({ _actions }) {
    return !!_actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
  },
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { stakeholders } = storeFields;
    const lowerCasedCorporationLegalName = lowerCaseWithoutSpacesGenerator('company' || '');
    const { mutateAsync: completeTrustDraftAccount } = useCompleteTrustDraftAccount(getApiClient);
    const applicantsRef = useRef<Applicant[]>(stakeholders ?? []);

    const { progressPercentage } = useKYCFailedFlow();
    const { openDialog, closeDialog } = useDialog();

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
            dateOfBirth: applicant.dateOfBirth ? formatDate(applicant.dateOfBirth, 'API', { currentFormat: 'DEFAULT' }) : '',
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
      const response = await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { stakeholders } });
      const currentStakeholders = response?.details?.stakeholders?.map(apiStakeholderToApplicant);
      applicantsRef.current = currentStakeholders || [];

      return updateStoreFields({ stakeholders: currentStakeholders });
    };

    const updateApplicants = async (submittedApplicant: Applicant, applicantIndex: number | undefined) => {
      // add as new applicant if it doesn't have index
      if (applicantIndex === undefined) {
        applicantsRef.current = [...applicantsRef.current, submittedApplicant];
      }

      // update existing one otherwise,
      if (applicantIndex !== undefined && applicantIndex >= 0) {
        applicantsRef.current = applicantsRef.current.map((applicant, index) => (applicantIndex === index ? submittedApplicant : applicant));
      }

      await updateStoreFields({
        stakeholders: applicantsRef.current,
      });

      if (typeof applicantIndex === 'number') {
        submittedApplicant.id = indexedStakeholderApplicants[applicantIndex]?.id;
      }

      await uploadApplicant(submittedApplicant);
      closeDialog();
    };

    const onContinue = async () => {
      moveToNextStep();
    };

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      const defaultValues = getDefaultValuesForApplicantWithoutIdentification(applicantsRef.current, applicant._index);

      if (applicant._index !== undefined) {
        openDialog(
          <ApplicantFormModal
            defaultValues={defaultValues}
            applicantIndex={applicant._index}
            applicantId={applicant.id}
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
            headline="Verify your applicant's details and edit if necessary"
          />
          <Box mb="20">
            {indexedStakeholderApplicants.map(applicant => (
              <Row
                style={styles.stakeholderRow}
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
              </Row>
            ))}
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button onPress={onContinue}>Submit</Button>
        </View>
      </>
    );
  },
};

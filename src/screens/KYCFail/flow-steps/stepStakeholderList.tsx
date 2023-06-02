import isEqual from 'lodash.isequal';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useGetTrustAccount } from 'reinvest-app-common/src/services/queries/getTrustAccount';
import { useUpdateStakeholderForVerification } from 'reinvest-app-common/src/services/queries/updateStakeholderForVerification';
import { AccountType, ActionName, UpdateStakeholderForVerificationInput, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { ApplicantFormModal } from '../../../components/Modals/ModalContent/ApplicantForm';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { apiStakeholderToApplicant, mapApplicantToApiStakeholder } from '../../../utils/mappers';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { Applicant, IndexedSchema } from '../../Onboarding/types';
import { getDefaultValuesForApplicantWithoutIdentification } from '../../Onboarding/utilities';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';
import { styles } from './styles';

export const StepStakeholderList: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.STAKEHOLDER_LIST,

  doesMeetConditionFields({ _actions, accountType, _forceManualReviewScreen, _bannedAction }) {
    const stakeholderVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
    const doesRequireManualReview = stakeholderVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return !!stakeholderVerificationAction && !doesRequireManualReview && accountType !== AccountType.Individual && !_forceManualReviewScreen && !_bannedAction;
  },

  Component: ({
    storeFields: { _actions, stakeholders, accountId, accountType },
    updateStoreFields,
    moveToNextStep,
  }: StepComponentProps<KYCFailedFormFields>) => {
    const { mutateAsync: updateStakeholderMutate } = useUpdateStakeholderForVerification(getApiClient);
    const applicantsRef = useRef<Applicant[]>(stakeholders ?? []);
    const updatedApplicantsRef = useRef<Applicant[]>([]);
    const { refetch: refetchTrustAccount } = useGetTrustAccount(getApiClient, {
      accountId,
      config: {
        enabled: accountType === AccountType.Trust,
      },
    });
    const { refetch: refetchCorporateAccount } = useGetCorporateAccount(getApiClient, {
      accountId,
      config: {
        enabled: accountType === AccountType.Corporate,
      },
    });

    const { openDialog, closeDialog } = useDialog();

    const lowerCasedCorporationLegalName = lowerCaseWithoutSpacesGenerator('company' || '');

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = applicantsRef.current.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const stakeholdersIdsRequiringUpdate = _actions
      ?.filter(action => action.onObject.type === VerificationObjectType.Stakeholder)
      .map(action => action.onObject.stakeholderId);

    const updateApplicants = async (submittedApplicant: Applicant, applicantIndex: number | undefined) => {
      const originalStakeholder = applicantIndex !== undefined ? stakeholders?.[applicantIndex] : null;

      if (!stakeholders || !originalStakeholder || !submittedApplicant.id) {
        return;
      }

      const { residentialAddress: updatedResidentialAddress, idScan: updatedIdScan, ...updatedGeneralInformation } = submittedApplicant;
      const { residentialAddress: originalResidentialAddress, idScan: originalIdScan, ...originalGeneralInformation } = originalStakeholder;

      // update only stakeholders that have changed
      const didStakeholderAddressChange = !isEqual({ ...originalResidentialAddress, country: 'USA' }, { ...updatedResidentialAddress, country: 'USA' });
      const didIdScansChange = !isEqual(originalIdScan, updatedIdScan);
      const didGeneralInformationChange = !isEqual(originalGeneralInformation, {
        ...updatedGeneralInformation,
        dateOfBirth: updatedGeneralInformation.dateOfBirth ? formatDate(updatedGeneralInformation.dateOfBirth, 'API', { currentFormat: 'DEFAULT' }) : undefined,
      });

      if (!didStakeholderAddressChange && !didIdScansChange && !didGeneralInformationChange) {
        return;
      }

      // when applicant was already updated update list in place
      const wasApplicantAlreadyUpdated = updatedApplicantsRef.current.some(applicant => applicant.id === submittedApplicant.id);

      if (wasApplicantAlreadyUpdated) {
        updatedApplicantsRef.current = applicantsRef.current.map((applicant, index) => (applicantIndex === index ? submittedApplicant : applicant));
      } else {
        updatedApplicantsRef.current.push(submittedApplicant);
      }

      applicantsRef.current = applicantsRef.current.map((applicant, index) => (applicantIndex === index ? submittedApplicant : applicant));

      await updateStoreFields({
        stakeholders: applicantsRef.current,
      });

      closeDialog();
    };

    const handleSubmit = async () => {
      if (!stakeholdersIdsRequiringUpdate?.length) {
        return moveToNextStep();
      }

      const stakeholdersToUpdate = updatedApplicantsRef.current.map(mapApplicantToApiStakeholder);

      await Promise.all(
        stakeholdersIdsRequiringUpdate.map(async stakeholderId => {
          const stakeholderToUpdate = (stakeholdersToUpdate.find(stakeholder => stakeholder.id === stakeholderId) ??
            {}) as UpdateStakeholderForVerificationInput;
          await updateStakeholderMutate({ accountId, stakeholderId: stakeholderId ?? '', input: stakeholderToUpdate });
        }),
      );

      let stakeholders: Applicant[] = [];

      if (accountType === AccountType.Corporate) {
        const { data } = await refetchCorporateAccount();
        stakeholders = data?.details?.stakeholders?.map(apiStakeholderToApplicant) ?? [];
      } else if (accountType === AccountType.Trust) {
        const { data } = await refetchTrustAccount();
        stakeholders = data?.details?.stakeholders?.map(apiStakeholderToApplicant) ?? [];
      }

      await updateStoreFields({ stakeholders });

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
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Verify your applicant's details and edit if necessary"
          />
          <Box mb="20">
            {indexedStakeholderApplicants.map(applicant => {
              const doesRequireUpdate = stakeholdersIdsRequiringUpdate?.includes(applicant.id);
              const showError = doesRequireUpdate && !updatedApplicantsRef.current.some(app => app.id === applicant.id);

              return (
                <Box
                  fw
                  mb="16"
                  key={`${lowerCasedCorporationLegalName}-${applicant._index}`}
                >
                  <Row
                    style={styles.stakeholderRow}
                    mb="8"
                  >
                    <StyledText color="pureWhite">
                      {applicant.firstName} {applicant.lastName}
                    </StyledText>
                    {doesRequireUpdate && (
                      <Icon
                        icon="edit"
                        color={palette.pureWhite}
                        onPress={() => onEditApplicant(applicant)}
                      />
                    )}
                  </Row>
                  {showError && (
                    <Row fw>
                      <StyledText
                        color="error"
                        variant="paragraphSmall"
                      >
                        Review applicant details for accuracy
                      </StyledText>
                    </Row>
                  )}
                </Box>
              );
            })}
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button onPress={handleSubmit}>Submit</Button>
        </View>
      </>
    );
  },
};

import isEqual from 'lodash.isequal';
import React, { useRef } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
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
import { mapApplicantToApiStakeholder } from '../../../utils/mappers';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { Applicant, IndexedSchema } from '../../Onboarding/types';
import { getDefaultValuesForApplicantWithoutIdentification } from '../../Onboarding/utilities';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';
import { styles } from './styles';

export const StepStakeholderList: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.STAKEHOLDER_LIST,

  doesMeetConditionFields({ _actions, accountType }) {
    const stakeholderVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Stakeholder);
    const doesRequireManualReview = stakeholderVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return !!stakeholderVerificationAction && !doesRequireManualReview && accountType !== AccountType.Individual;
  },

  Component: ({ storeFields: { _actions, stakeholders, accountId }, updateStoreFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const { mutateAsync: updateStakeholderMutate } = useUpdateStakeholderForVerification(getApiClient);
    const applicantsRef = useRef<Applicant[]>(stakeholders ?? []);
    const updatedApplicantsRef = useRef<Applicant[]>([]);

    const { openDialog, closeDialog } = useDialog();

    const lowerCasedCorporationLegalName = lowerCaseWithoutSpacesGenerator('company' || '');

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = applicantsRef.current.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const updateApplicants = async (submittedApplicant: Applicant, applicantIndex: number | undefined) => {
      const originalStakeholder = applicantIndex !== undefined ? stakeholders?.[applicantIndex] : null;

      if (!stakeholders || !originalStakeholder || !submittedApplicant.id) {
        return;
      }

      const { residentialAddress: updatedResidentialAddress, idScan: updatedIdScan, ...updatedGeneralInformation } = submittedApplicant;
      const { residentialAddress: originalResidentialAddress, idScan: originalIdScan, ...originalGeneralInformation } = originalStakeholder;

      // update only stakeholders that have changed
      const didStakeholderAddressChange = !isEqual(originalResidentialAddress, updatedResidentialAddress);
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

      if (typeof applicantIndex === 'number') {
        submittedApplicant.id = indexedStakeholderApplicants[applicantIndex]?.id;
      }

      closeDialog();
    };

    const handleSubmit = async () => {
      const stakeholdersToUpdate = updatedApplicantsRef.current.map(mapApplicantToApiStakeholder);

      if (!stakeholdersToUpdate) return;

      await Promise.all(
        stakeholdersToUpdate.map(async stakeholder =>
          updateStakeholderMutate({ accountId, stakeholderId: stakeholder.id ?? '', input: stakeholder as UpdateStakeholderForVerificationInput }),
        ),
      );

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
    const stakeholderVerificationActions = _actions
      ?.filter(action => action.onObject.type === VerificationObjectType.Stakeholder)
      .map(action => action.onObject.stakeholderId);

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Verify your applicant's details and edit if necessary"
          />
          <Box mb="20">
            {indexedStakeholderApplicants.map(applicant => (
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
                  <Icon
                    icon="edit"
                    color={palette.pureWhite}
                    onPress={() => onEditApplicant(applicant)}
                  />
                </Row>
                {stakeholderVerificationActions?.includes(applicant.id) && (
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
            ))}
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

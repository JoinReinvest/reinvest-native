import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { ApplicantFormModal } from '../../../components/Modals/ModalContent/ApplicantForm';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { EMPTY_APPLICANT_FORM } from '../../../constants/applicants';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { Identifiers } from '../identifiers';
import { Applicant, IndexedSchema, OnboardingFormFields } from '../types';
import { getDefaultValuesForApplicantWithoutIdentification } from '../utilities';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepTrustApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { trustTrusteesGrantorsOrProtectors, trustLegalName } = storeFields;
    const lowerCasedCorporationLegalName = lowerCaseWithoutSpacesGenerator(trustLegalName || '');

    const applicantsRef = useRef<Applicant[]>(trustTrusteesGrantorsOrProtectors ?? []);

    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog, closeDialog } = useDialog();

    const hasApplicants = !!applicantsRef.current.length;

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = applicantsRef.current.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const updateApplicants = async (submittedApplicant: Applicant, applicantIndex: number | undefined) => {
      if (applicantIndex === undefined) {
        applicantsRef.current = [...applicantsRef.current, submittedApplicant];
      }

      if (applicantIndex !== undefined && applicantIndex >= 0) {
        const updatedApplicants = applicantsRef.current.map((applicant, index) => (applicantIndex === index ? submittedApplicant : applicant));

        applicantsRef.current = updatedApplicants;
      }

      await updateStoreFields({
        trustTrusteesGrantorsOrProtectors: applicantsRef.current,
      });
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
        trustTrusteesGrantorsOrProtectors: applicantsRef.current,
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
        <ScrollView style={[styles.fw]}>
          <FormTitle
            dark
            headline={hasApplicants ? 'Your applicants.' : 'Other Trustees, Grantors and Protectors'}
            description={
              hasApplicants ? '' : 'For all other  Trustees, Grantors and Protectors that are included in the same Trust, we require their information.'
            }
          />
          {hasApplicants && (
            <Box mb="20">
              {indexedStakeholderApplicants.map(applicant => (
                <View
                  style={{ flexDirection: 'row', columnGap: 27, justifyContent: 'space-between' }}
                  key={`${lowerCasedCorporationLegalName}-${applicant._index}`}
                >
                  <StyledText color={palette.pureWhite}>
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
        </ScrollView>
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

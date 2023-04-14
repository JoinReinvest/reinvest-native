import React, { useState } from 'react';
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
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { Identifiers } from '../identifiers';
import { Applicant, IndexedSchema, OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepCorporateApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const { companyMajorStakeholderApplicants, corporationLegalName } = storeFields;
    const lowerCasedCorporationLegalName = lowerCaseWithoutSpacesGenerator(corporationLegalName || '');

    const [applicants, setApplicants] = useState<Applicant[]>(companyMajorStakeholderApplicants ?? []);

    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog, closeDialog } = useDialog();

    const hasApplicants = !!applicants.length;

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = applicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const submit = async (submittedApplicant: Applicant, applicantIndex: number | undefined) => {
      if (applicantIndex !== undefined && applicantIndex >= 0) {
        const updatedApplicants = applicants.map((applicant, index) => {
          if (applicantIndex === index) {
            return submittedApplicant;
          }

          return applicant;
        });

        setApplicants(updatedApplicants);
        closeDialog();

        return;
      }

      setApplicants(prev => [...prev, submittedApplicant]);
      closeDialog();
    };

    const onAddNewApplicant = () => {
      updateStoreFields({ _willHaveMajorStakeholderApplicants: true, _currentCompanyMajorStakeholder: undefined });
      openDialog(
        <ApplicantFormModal
          storeFields={storeFields}
          onSubmit={submit}
          onClose={closeDialog}
        />,
      );
    };

    const onContinue = () => {
      updateStoreFields({ _willHaveMajorStakeholderApplicants: hasApplicants });
      moveToStepByIdentifier(Identifiers.PROFILE_PICTURE);
    };

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      if (applicant._index !== undefined) {
        openDialog(
          <ApplicantFormModal
            applicantIndex={applicant._index}
            storeFields={{
              ...storeFields,
              companyMajorStakeholderApplicants: applicants,
              _currentCompanyMajorStakeholder: applicant,
              _isEditingCompanyMajorStakeholderApplicant: true,
            }}
            onSubmit={submit}
            onClose={closeDialog}
          />,
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
          style={styles.buttonsSection}
        >
          <Button
            variant="outlined"
            onPress={onAddNewApplicant}
          >
            Add Applicant
          </Button>
          {<Button onPress={onContinue}>{hasApplicants ? 'Continue' : 'Skip'}</Button>}
        </View>
      </>
    );
  },
};

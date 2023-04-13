import React from 'react';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Icon } from '../../../components/Icon';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { lowerCaseWithoutSpacesGenerator } from '../../../utils/optionValueGenerators';
import { Identifiers } from '../identifiers';
import { Applicant, IndexedSchema, OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepCorporateApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_LIST,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants, companyMajorStakeholderApplicants } = fields;
    const hasMajorStakeholderApplicants = !!companyMajorStakeholderApplicants?.length;

    return !!_willHaveMajorStakeholderApplicants && hasMajorStakeholderApplicants;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const majorStakeholderApplicants = storeFields.companyMajorStakeholderApplicants || [];

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = majorStakeholderApplicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        // set the current major stakeholder applicant as this value
        await updateStoreFields({ _currentCompanyMajorStakeholder: applicant, _isEditingCompanyMajorStakeholderApplicant: true });
        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = () => {
      updateStoreFields({ _currentCompanyMajorStakeholder: undefined });
      moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
    };

    const onContinue = () => {
      moveToNextStep();
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Your applicants."
          />
          <Box mb="20">
            {indexedStakeholderApplicants.map(applicant => (
              <View
                style={{ flexDirection: 'row', columnGap: 27, justifyContent: 'space-between' }}
                key={`${corporationLegalName}-${applicant._index}`}
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
          <Button
            variant="outlined"
            onPress={onAddNewApplication}
          >
            Add Applicant
          </Button>
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button onPress={onContinue}>Continue</Button>
        </View>
      </>
    );
  },
};

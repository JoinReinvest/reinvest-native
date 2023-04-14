import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { ProgressBar } from '../../../components/ProgressBar';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepCorporateApplicantIdentification: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_IDENTIFICATION,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants, _currentCompanyMajorStakeholder } = fields;
    const hasCurrentCompanyMajorStakeholder = _currentCompanyMajorStakeholder !== undefined;

    return !!_willHaveMajorStakeholderApplicants && hasCurrentCompanyMajorStakeholder;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [identificationDocument, setIdentificationDocument] = useState<string>('');

    const handleContinue = async () => {
      const { _isEditingCompanyMajorStakeholderApplicant } = storeFields;
      const currentMajorStakeholderApplicant = { ...storeFields._currentCompanyMajorStakeholder, identificationDocument };
      const currentMajorStakeholderApplicantIndex = currentMajorStakeholderApplicant._index;
      await updateStoreFields({ _currentCompanyMajorStakeholder: currentMajorStakeholderApplicant });

      if (
        !!_isEditingCompanyMajorStakeholderApplicant &&
        typeof currentMajorStakeholderApplicantIndex !== 'undefined' &&
        currentMajorStakeholderApplicantIndex >= 0
      ) {
        const allApplicants = storeFields.companyMajorStakeholderApplicants || [];
        const updatedApplicants = allApplicants.map((applicant, index) => {
          if (index === currentMajorStakeholderApplicantIndex) {
            return currentMajorStakeholderApplicant;
          }

          return applicant;
        });

        await updateStoreFields({
          companyMajorStakeholderApplicants: updatedApplicants,
          _currentCompanyMajorStakeholder: undefined,
          _isEditingCompanyMajorStakeholderApplicant: false,
        });

        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANTS_LANDING);

        return;
      } else {
        const allApplicants = storeFields.companyMajorStakeholderApplicants || [];
        const updatedApplicants = [...allApplicants, currentMajorStakeholderApplicant];

        await updateStoreFields({ companyMajorStakeholderApplicants: updatedApplicants, _isEditingCompanyMajorStakeholderApplicant: false });
        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANTS_LANDING);
      }
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Upload the ID of your applicant."
          />
          <FilePicker
            dark
            label="Upload Files"
            onSelect={res => setIdentificationDocument(res[0]?.uri ?? '')}
            type="single"
          />
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={!identificationDocument}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

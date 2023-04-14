import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { MAXIMUM_CORPORATION_FILES_COUNT, MINIMUM_CORPORATION_FILES_COUNT } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepDocumentsForCorporation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  willBePartOfTheFlow: fields => {
    return fields.accountType === DraftAccountType.Corporate;
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedFiles, setSelectedFiles] = useState<(DocumentPickerResponse | Asset)[]>([]);

    const handleContinue = async () => {
      const uris = selectedFiles.map(({ uri }) => uri ?? '');
      await updateStoreFields({ documentsForCorporation: uris });
      moveToNextStep();
    };

    const shouldButtonBeDisabled = selectedFiles.length < MINIMUM_CORPORATION_FILES_COUNT || selectedFiles.length > MAXIMUM_CORPORATION_FILES_COUNT;

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView style={styles.fw}>
          <FormTitle
            dark
            headline="Upload the following documents to verify your organization"
            description={
              <StyledText
                variant="paragraphLarge"
                color={palette.pureWhite}
              >
                <StyledText
                  variant="paragraphEmp"
                  color={palette.pureWhite}
                >
                  Required documents:
                </StyledText>{' '}
                Articles of Incorporation, Certificate of Formation, By-laws, Shareholders and Authorized Signers List.
              </StyledText>
            }
          />
          <FilePicker
            dark
            label="Upload Files"
            onSelect={setSelectedFiles}
            type="multi"
            selectionLimit={MAXIMUM_CORPORATION_FILES_COUNT}
          />
        </ScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={handleContinue}
            disabled={shouldButtonBeDisabled}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

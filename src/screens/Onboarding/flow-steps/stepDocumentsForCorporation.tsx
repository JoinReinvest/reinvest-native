import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../components/Button';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { documentReducer } from '../../../utils/documentReducer';
import { MAXIMUM_CORPORATION_FILES_COUNT, MINIMUM_CORPORATION_FILES_COUNT } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { AssetWithPreloadedFiles, OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepDocumentsForCorporation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  willBePartOfTheFlow: fields => {
    return fields.accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName];

    return allRequiredFieldsExists(requiredFields) && fields.accountType === DraftAccountType.Corporate;
  },

  Component: ({ updateStoreFields, moveToNextStep, storeFields }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>((storeFields.documentsForCorporation as AssetWithPreloadedFiles[]) || []);
    const { isLoading: creatingFileLinks, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: uploadingToS3, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { isLoading: updatingAccount, isSuccess, error, mutateAsync: updateCorporate } = useCompleteCorporateDraftAccount(getApiClient);
    const handleContinue = async () => {
      if (!storeFields.accountId) {
        return;
      }

      const preloadedFiles = documentReducer(selectedFiles);
      const selectedFilesUris = preloadedFiles.forUpload.map(({ uri }) => uri ?? '');

      try {
        const idScan = [];

        if (selectedFilesUris.length) {
          const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: selectedFilesUris.length })) as PutFileLink[];
          const scans = await sendDocumentsToS3AndGetScanIdsMutate({
            documentsFileLinks: documentsFileLinks as PutFileLink[],
            identificationDocument: preloadedFiles.forUpload,
          });
          idScan.push(...scans);
          await updateCorporate({ accountId: storeFields.accountId, input: { companyDocuments: idScan } });
        }

        await updateStoreFields({
          documentsForCorporation: [...preloadedFiles.uploaded, ...idScan.map((scan, idx) => ({ ...scan, uri: selectedFiles[idx] }))],
        });

        /*
         No files to upload
         */
        if (!selectedFilesUris.length) {
          moveToNextStep();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('-> e', e);
      }
      moveToNextStep();
    };

    const shouldButtonBeDisabled =
      selectedFiles.length < MINIMUM_CORPORATION_FILES_COUNT ||
      selectedFiles.length > MAXIMUM_CORPORATION_FILES_COUNT ||
      uploadingToS3 ||
      creatingFileLinks ||
      updatingAccount;

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Upload the following documents to verify your organization"
            description={
              <StyledText
                variant="paragraphLarge"
                color="pureWhite"
              >
                <StyledText
                  variant="paragraphEmp"
                  color="pureWhite"
                >
                  Required documents:
                </StyledText>{' '}
                Articles of Incorporation, Certificate of Formation, By-laws, Shareholders and Authorized Signers List.
              </StyledText>
            }
          />
          {error && <ErrorMessagesHandler error={error} />}
          <FilePicker
            dark
            label="Upload Files"
            onSelect={setSelectedFiles}
            type="multi"
            selectionLimit={MAXIMUM_CORPORATION_FILES_COUNT}
            state={selectedFiles}
          />
        </PaddedScrollView>
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

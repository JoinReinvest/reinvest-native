import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFileLinkInput, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { documentReducer } from '../../../utils/documentReducer';
import { MINIMUM_CORPORATION_FILES_COUNT } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { AssetWithPreloadedFiles, IdentificationDocument, OnboardingFormFields } from '../types';
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

    const getRemovedFiles = (updatedFiles: IdentificationDocument[]): DocumentFileLinkInput[] =>
      (storeFields.documentsForCorporation?.filter(file => !updatedFiles.some(f => f.id === file?.id)) as DocumentFileLinkInput[]) ?? [];

    const handleContinue = async () => {
      if (!storeFields.accountId || !selectedFiles.length) {
        return;
      }

      const preloadedFiles = documentReducer(selectedFiles);
      const filesToUploadUris = preloadedFiles.forUpload.map(({ uri }) => uri ?? '');
      const removeDocuments = getRemovedFiles(preloadedFiles.uploaded);
      const companyDocuments = [...preloadedFiles.uploaded];

      try {
        if (filesToUploadUris.length) {
          const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: filesToUploadUris.length })) as PutFileLink[];
          const scans = await sendDocumentsToS3AndGetScanIdsMutate({
            documentsFileLinks: documentsFileLinks as PutFileLink[],
            identificationDocument: preloadedFiles.forUpload,
          });
          companyDocuments.push(...scans);
        }

        await updateCorporate({ accountId: storeFields.accountId, input: { companyDocuments, removeDocuments } });
        await updateStoreFields({
          documentsForCorporation: companyDocuments,
        });

        /*
         No files to upload
         */
        if (!filesToUploadUris.length) {
          moveToNextStep();
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('-> e', e);
      }
      moveToNextStep();
    };

    const shouldButtonBeDisabled = selectedFiles.length < MINIMUM_CORPORATION_FILES_COUNT || uploadingToS3 || creatingFileLinks || updatingAccount;

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    if (updatingAccount || creatingFileLinks || uploadingToS3) {
      return (
        <Box
          flex={1}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Loader
            size="xl"
            color={palette.pureWhite}
          />
          <FormTitle
            dark
            headline={`Uploading Your Document${selectedFiles.length > 1 ? 's' : ''}`}
          />
        </Box>
      );
    }

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView dark>
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
            label={selectedFiles ? 'Add Additional Files' : 'Upload Files'}
            onSelect={setSelectedFiles}
            type="multi"
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

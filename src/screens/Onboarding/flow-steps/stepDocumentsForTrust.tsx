import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
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

export const StepDocumentsForTrust: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  willBePartOfTheFlow: fields => {
    return fields.accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;
    const hasTrustFields = allRequiredFieldsExists([
      fields.trustType,
      fields.trustLegalName,
      fields.businessAddress,
      fields.fiduciaryEntityInformation?.industry,
      fields.fiduciaryEntityInformation?.annualRevenue,
      fields.fiduciaryEntityInformation?.numberOfEmployees,
    ]);

    return isTrustAccount && hasProfileFields && hasTrustFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>((storeFields.documentsForTrust as AssetWithPreloadedFiles[]) || []);

    const getRemovedFiles = (updatedFiles: IdentificationDocument[]): DocumentFileLinkInput[] =>
      (storeFields.documentsForTrust?.filter(file => !updatedFiles.some(f => f.id === file?.id)) as DocumentFileLinkInput[]) ?? [];

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

        await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { companyDocuments, removeDocuments } });
        await updateStoreFields({
          documentsForTrust: companyDocuments,
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

    const shouldButtonBeDisabled =
      selectedFiles.length < MINIMUM_CORPORATION_FILES_COUNT || isSendDocumentToS3AndGetScanIdsLoading || isCreateDocumentsFileLinksLoading || isLoading;

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    if (isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading) {
      return (
        <View style={{ flex: 1 }}>
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
        </View>
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
            headline="Upload the following documents to verify your trust."
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
                The Full Trust Document or Certification of Trust,List of All Trustees, Grantors and Protectors.
              </StyledText>
            }
          />
          {error && <ErrorMessagesHandler error={error} />}
          <FilePicker
            state={selectedFiles}
            dark
            label={selectedFiles.length ? 'Add Additional Files' : 'Upload Files'}
            onSelect={setSelectedFiles}
            type="multi"
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

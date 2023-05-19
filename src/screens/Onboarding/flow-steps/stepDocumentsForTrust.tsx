import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

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
import { AssetWithPreloadedFiles, OnboardingFormFields } from '../types';
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
          await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { companyDocuments: idScan } });
        }

        await updateStoreFields({ documentsForTrust: [...preloadedFiles.uploaded, ...idScan.map((scan, idx) => ({ ...scan, uri: selectedFiles[idx] }))] });

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
            label="Upload Files"
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

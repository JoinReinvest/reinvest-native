import React, { useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { ActionName, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { palette } from '../../../constants/theme';
import { AssetWithPreloadedFiles } from '../../Onboarding/types';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepIdentificationDocuments: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  doesMeetConditionFields({ _actions, ...fields }) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.ssn];
    const profileVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Profile);
    const doesRequireManualReview = profileVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return allRequiredFieldsExists(requiredFields) && !!profileVerificationAction && !doesRequireManualReview;
  },

  Component: ({ storeFields: { identificationDocument }, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>((identificationDocument as AssetWithPreloadedFiles[]) || []);

    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);

    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

    const shouldButtonBeDisabled = !selectedFiles.length || selectedFiles.length > 5;

    //TODO: uncomment when connecting with API:
    // const onSubmit = async () => {
    //   const preloadedFiles = documentReducer(selectedFiles);

    //   const selectedFilesUris = preloadedFiles.forUpload.map(({ uri }) => uri ?? '');

    //   try {
    //     const idScan = [];

    //     if (selectedFilesUris.length) {
    //       const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: selectedFilesUris.length })) as PutFileLink[];
    //       const scans = await sendDocumentsToS3AndGetScanIdsMutate({
    //         documentsFileLinks: documentsFileLinks as PutFileLink[],
    //         identificationDocument: preloadedFiles.forUpload,
    //       });
    //       idScan.push(...scans);
    //     }

    //     await updateStoreFields({ identificationDocument: [...preloadedFiles.uploaded, ...idScan.map((scan, idx) => ({ ...scan, uri: selectedFiles[idx] }))] });
    //     const verificationResponse = await reverifyAccount({ accountId: storeFields.accountId });

    //     if (
    //       verificationResponse?.canUserContinueTheInvestment ||
    //       (verificationResponse?.isAccountVerified && !verificationResponse.requiredActions?.length) ||
    //       !selectedFilesUris.length
    //     ) {
    //       moveToNextStep();
    //     }
    //     // clear all the data provided by user from previous verification and go back to the start:

    //     await updateStoreFields({
    //       ...initialKYCFailedFormFields,
    //       _actions: verificationResponse.requiredActions,
    //     });

    //     // mock failing again:
    //     moveToStepByIdentifier(Identifiers.VERIFICATION_FAILED);
    //   } catch (e) {
    //     // eslint-disable-next-line no-console
    //     console.log('-> e', e);
    //   }
    // };

    const onSubmit = async () => {
      moveToNextStep();
    };

    if (isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading) {
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
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Verify that the ID you uploaded is correct"
          />
          <FilePicker
            dark
            label="Upload Files"
            onSelect={setSelectedFiles}
            type="multi"
            selectionLimit={5}
            state={selectedFiles}
          />
        </PaddedScrollView>
        <Box
          pb="8"
          px="default"
          fw
        >
          <Button
            onPress={onSubmit}
            disabled={shouldButtonBeDisabled || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading}
          >
            Submit
          </Button>
        </Box>
      </>
    );
  },
};

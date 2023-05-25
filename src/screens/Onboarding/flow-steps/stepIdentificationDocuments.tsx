import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { palette } from '../../../constants/theme';
import { documentReducer } from '../../../utils/documentReducer';
import { Identifiers } from '../identifiers';
import { AssetWithPreloadedFiles, OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

export const StepIdentificationDocuments: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    const individualFields = [fields.ssn];

    return (
      allRequiredFieldsExists(requiredFields) &&
      !fields.isCompletedProfile &&
      ((fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(individualFields)) || fields.accountType !== DraftAccountType.Individual)
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>((storeFields.identificationDocument as AssetWithPreloadedFiles[]) || []);

    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);

    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

    const { isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const onSubmit = async () => {
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
          await completeProfileMutate({ input: { idScan } });
        }

        await updateStoreFields({ identificationDocument: [...preloadedFiles.uploaded, ...idScan.map((scan, idx) => ({ ...scan, uri: selectedFiles[idx] }))] });

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
    };

    const shouldButtonBeDisabled = !selectedFiles.length || selectedFiles.length > 5;

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
            headline="Please upload your Driver’s License or Passport for further verification"
            description="Valid identification includes Driver's license, Permanent Resident card or a non-expired Passport."
          />
          <FilePicker
            dark
            label={selectedFiles.length ? 'Add Additional Files' : 'Upload Files'}
            onSelect={setSelectedFiles}
            type="multi"
            selectionLimit={5}
            state={selectedFiles}
          />
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            onPress={onSubmit}
            disabled={shouldButtonBeDisabled || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading || isLoading}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

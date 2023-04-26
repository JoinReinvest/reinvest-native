import React, { useState } from 'react';
import { View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';

import { getApiClient } from '../../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../../../constants/styles';
import { documentReducer } from '../../../../utils/documentReducer';
import { Button } from '../../../Button';
import { FilePicker } from '../../../FilePicker';
import { FormTitle } from '../../../Forms/FormTitle';
import { PaddedScrollView } from '../../../PaddedScrollView';
import { styles } from '../styles';
import { ApplicantFormStepProps } from './types';

export const ApplicantDocumentsForm = ({ isVisible, onContinue, defaultValues }: ApplicantFormStepProps) => {
  const [document, setDocument] = useState<(DocumentPickerResponse | Asset)[]>(defaultValues?.idScan ?? []);
  const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
  const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

  const shouldButtonBeDisabled = !document.length || isSendDocumentToS3AndGetScanIdsLoading || isCreateDocumentsFileLinksLoading;

  const handleContinue = async () => {
    const preloadedFiles = documentReducer(document);
    const selectedFilesUris = preloadedFiles.forUpload.map(({ uri }) => uri ?? '');

    try {
      const idScan = [];

      if (selectedFilesUris.length) {
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: selectedFilesUris.length })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({
          documentsFileLinks: documentsFileLinks as PutFileLink[],
          identificationDocument: document,
        });
        idScan.push(...scans);
      }

      onContinue({ idScan: [...preloadedFiles.uploaded, ...idScan] });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('-> e', e);
    }
  };

  return (
    <View
      pointerEvents={isVisible ? 'auto' : 'none'}
      style={[styles.fw, !isVisible ? { height: 0, opacity: 0 } : { height: '100%', opacity: 1 }]}
    >
      <PaddedScrollView>
        <FormTitle
          dark
          headline="Upload the ID of your applicant."
        />
        <FilePicker
          dark
          label="Upload Files"
          onSelect={setDocument}
          type="multi"
          state={document}
          selectionLimit={5}
        />
      </PaddedScrollView>
      <View style={{ paddingHorizontal: MAIN_WRAPPER_PADDING_HORIZONTAL }}>
        <Button
          disabled={shouldButtonBeDisabled}
          variant="primary"
          onPress={handleContinue}
        >
          Continue
        </Button>
      </View>
    </View>
  );
};

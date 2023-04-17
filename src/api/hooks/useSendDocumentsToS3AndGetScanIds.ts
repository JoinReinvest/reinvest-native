import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';

import { sendDocumentsToS3AndGetScanIds } from '../sendFilesToS3Bucket';

export interface PutFileLink {
  id: string;
  url: string;
}

export const useSendDocumentsToS3AndGetScanIds = (): UseMutationResult<
  { fileName: string; id: string }[],
  Error,
  { documentsFileLinks: PutFileLink[]; identificationDocument: (DocumentPickerResponse | Asset)[] }
> =>
  useMutation({
    mutationFn: async ({ documentsFileLinks, identificationDocument }) => {
      return sendDocumentsToS3AndGetScanIds(documentsFileLinks, identificationDocument);
    },
  });

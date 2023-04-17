import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';

type Assets = (DocumentPickerResponse | Asset) & {
  uri: string;
};

export interface UploadFile {
  file: Assets;
  id: string;
  url: string;
}

const fetchResourceFromURI = async (uri: string) => {
  const response = await fetch(uri);

  return response.blob?.();
};

type Documents = (DocumentPickerResponse | Asset)[];

export const sendDocumentsToS3AndGetScanIds = async (
  documentsFileLinks: Omit<UploadFile, 'file'>[],
  identificationDocument: Documents,
): Promise<{ fileName: string; id: string }[]> => {
  const images = documentsFileLinks
    .filter(documentFileLink => documentFileLink.url)
    .map(({ url, id }, index) => ({
      url,
      id,
      file: identificationDocument[`${index}`],
    })) as UploadFile[];

  await sendFilesToS3Bucket(images);

  return images.map(({ id, file }) => ({ id, fileName: (file as DocumentPickerResponse).name || (file as Asset).fileName || '' }));
};

export const sendFilesToS3Bucket = async (uploadFiles: UploadFile[]) => {
  const promises = uploadFiles.map(async ({ file, url }) => {
    try {
      const blob = await fetchResourceFromURI(file.uri);

      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
        body: blob,
      });
    } catch (error) {
      throw new Error('error');
    }
  });

  return Promise.all(promises);
};

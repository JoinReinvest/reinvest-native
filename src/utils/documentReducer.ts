import { Asset } from 'react-native-image-picker';

import { AssetWithPreloadedFiles, IdentificationDocument } from '../screens/Onboarding/types';

export const documentReducer = (files: AssetWithPreloadedFiles[]) =>
  files.reduce<{
    forUpload: Exclude<AssetWithPreloadedFiles, IdentificationDocument>[];
    uploaded: IdentificationDocument[];
  }>(
    (acc, file) => {
      if ((file as IdentificationDocument).id && !(file as Asset).fileSize) {
        return { ...acc, uploaded: [...acc.uploaded, file] as IdentificationDocument[] };
      }

      return { ...acc, forUpload: [...acc.forUpload, file] };
    },
    {
      uploaded: [],
      forUpload: [],
    },
  );

import React, { PropsWithChildren, useCallback, useRef, useState } from 'react';
import { Alert, Linking } from 'react-native';
import DocumentPicker, { DocumentPickerResponse, isInProgress } from 'react-native-document-picker';
import { Asset, ImagePickerResponse } from 'react-native-image-picker';

import { palette } from '../../constants/theme';
import { Button } from '../Button';
import { Box } from '../Containers/Box/Box';
import { Icon } from '../Icon';
import { ImagePicker } from '../ImagePicker';
import { FilePickerProps } from './types';

export const isDocumentPickerResource = (file: DocumentPickerResponse | Asset): file is DocumentPickerResponse =>
  (file as DocumentPickerResponse).name !== undefined;

const permissionAlert = () =>
  Alert.alert('Permissions are not granted', 'Please check permissions in device settings', [
    {
      text: 'Cancel',
    },
    {
      text: 'Settings',
      onPress: () => Linking.openSettings(),
    },
  ]);

export const FilePicker = ({ onSelect, label, type = 'single', dark = true, selectionLimit = 3, ...rest }: PropsWithChildren<FilePickerProps>) => {
  const [results, setResults] = React.useState<(DocumentPickerResponse | Asset)[]>([]);
  const existingIds = useRef<Set<string | undefined>>(new Set([]));
  const [choosingMode, setChoosingMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const openChoosingMode = async () => setChoosingMode(true);

  const closeChoosingMode = () => setChoosingMode(false);

  const onImagePickerSelect = (response: ImagePickerResponse) => {
    if (response.errorCode === 'permission') {
      permissionAlert();
    }

    if (response.assets) {
      const filteredResponse = response.assets.filter(asset => !existingIds.current?.has(asset.id));
      onAssetSelect(filteredResponse);
    }

    setLoading(false);
  };

  const onAssetSelect = (assets: DocumentPickerResponse[] | Asset[] | undefined) => {
    if (assets) {
      assets.forEach(asset => {
        if ((asset as Asset).id) {
          existingIds.current = new Set([...existingIds.current, (asset as Asset).id]);
        }
      });
      const uploaded = [...results, ...assets];
      setResults(uploaded);
      onSelect(uploaded);
    }

    setChoosingMode(false);
    setLoading(false);
  };

  const pickFile = async () => {
    setChoosingMode(false);
    setLoading(true);
    try {
      const files = type === 'single' ? await DocumentPicker.pick() : await DocumentPicker.pickMultiple();
      const batch = [...results, ...files];
      setResults(batch);
      onSelect(batch);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const releaseFile = useCallback(
    async (uri: string) => {
      try {
        await DocumentPicker.releaseSecureAccess([uri]);
        const filtered = results?.filter(file => file.uri !== uri);
        existingIds.current.delete((results.find(el => el.uri === uri) as Asset)?.id);
        setResults(filtered);
        onSelect(filtered);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('error while releasing');
      }
    },
    [onSelect, results],
  );

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      Alert.alert('cancelled');
    } else if (isInProgress(err)) {
      // eslint-disable-next-line no-console
      console.log('multiple pickers were opened, only the last will be considered');
    } else {
      throw err;
    }
  };

  const getName = (file: Asset | DocumentPickerResponse) => {
    if (isDocumentPickerResource(file)) {
      return file.name;
    }

    return file.fileName?.split('.').shift()?.substring(0, 30);
  };

  const maxLimitReached = results.length >= (type === 'single' ? 1 : selectionLimit);
  const filesLeftToUpload = (type === 'single' ? 1 : selectionLimit) - results.length;

  const mainSegment = !choosingMode ? (
    <Button
      isLoading={loading}
      disabled={maxLimitReached}
      onPress={openChoosingMode}
      startIcon={
        <Icon
          color={maxLimitReached ? palette.dark3 : undefined}
          icon="upload"
        />
      }
    >
      {label}
    </Button>
  ) : (
    <>
      <ImagePicker
        setLoading={setLoading}
        preAction={closeChoosingMode}
        type="capture"
        onSelect={onImagePickerSelect}
      >
        <Button
          isLoading={loading}
          vessel
        >
          Take a photo
        </Button>
      </ImagePicker>
      <ImagePicker
        preAction={closeChoosingMode}
        setLoading={setLoading}
        type="library"
        onSelect={onImagePickerSelect}
        selectionImageLimit={filesLeftToUpload}
      >
        <Button
          vessel
          isLoading={loading}
        >
          Pick from gallery
        </Button>
      </ImagePicker>
      <Button
        isLoading={loading}
        onPress={pickFile}
        disabled={!filesLeftToUpload}
      >
        Pick from files
      </Button>
    </>
  );

  return (
    <Box
      mb="12"
      {...rest}
    >
      {mainSegment}
      {results &&
        results.map(file => (
          <Button
            dark
            variant="draft"
            endIcon={
              <Icon
                icon="trash"
                color={dark ? palette.pureWhite : palette.pureBlack}
              />
            }
            key={file.uri}
            onPress={() => releaseFile(file.uri ? file.uri : '')}
          >{`${getName(file)}`}</Button>
        ))}
    </Box>
  );
};

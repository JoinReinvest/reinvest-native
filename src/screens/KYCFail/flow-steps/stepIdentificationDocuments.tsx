import isEqual from 'lodash.isequal';
import React, { useState } from 'react';
import { View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { Asset } from 'react-native-image-picker';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfileForVerification } from 'reinvest-app-common/src/services/queries/updateProfileForVerification';
import { AccountOverview, ActionName, AddressInput, UpdateProfileForVerificationInput, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { palette } from '../../../constants/theme';
import { currentAccount, useAtom } from '../../../store/atoms';
import { documentReducer } from '../../../utils/documentReducer';
import { AssetWithPreloadedFiles } from '../../Onboarding/types';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepIdentificationDocuments: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  doesMeetConditionFields({ _actions, _forceManualReviewScreen, _bannedAction, ...fields }) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth];
    const profileVerificationAction = _actions?.find(({ onObject: { type } }) => type === VerificationObjectType.Profile);
    const doesRequireManualReview = profileVerificationAction?.action === ActionName.RequireManualReview ?? false;

    return allRequiredFieldsExists(requiredFields) && !!profileVerificationAction && !doesRequireManualReview && !_forceManualReviewScreen && !_bannedAction;
  },

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<KYCFailedFormFields>) => {
    const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>((storeFields.identificationDocument as AssetWithPreloadedFiles[]) || []);
    const [didFilesChange, setDidFilesChange] = useState(false);
    const { data: userProfile } = useGetUserProfile(getApiClient);
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { mutateAsync: updateProfile, isLoading: isUpdatingProfile } = useUpdateProfileForVerification(getApiClient);
    const [activeAccount, setCurrentAccount] = useAtom(currentAccount);
    const { refetch: refetchProfile } = useGetUserProfile(getApiClient);
    const { refetch: refetchAccount } = useGetAccountsOverview(getApiClient);

    const shouldButtonBeDisabled = !selectedFiles.length || selectedFiles.length > 5;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const convertFiles = async () => {
      if (!didFilesChange) {
        return [];
      }

      const preloadedFiles = documentReducer(selectedFiles);
      const selectedFilesUris = preloadedFiles.forUpload.map(({ uri }) => uri ?? '');

      try {
        if (selectedFilesUris.length) {
          const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: selectedFilesUris.length })) as PutFileLink[];
          const scans = await sendDocumentsToS3AndGetScanIdsMutate({
            documentsFileLinks: documentsFileLinks as PutFileLink[],
            identificationDocument: preloadedFiles.forUpload,
          });

          return scans;
        }

        return [];
      } catch (e) {
        console.log('-> e', e);

        return [];
      }
    };

    const onSubmit = async () => {
      if (!userProfile?.details) {
        return;
      }

      const { name: updatedName, dateOfBirth: updatedDateOfBirth, address: updatedAddress } = storeFields;
      const { firstName, middleName, lastName, dateOfBirth, address } = userProfile.details;
      const name = { firstName, middleName, lastName };

      const formattedUpdatedDateOfBirth = updatedDateOfBirth ? formatDate(updatedDateOfBirth, 'API', { currentFormat: 'DEFAULT' }) : undefined;

      // send only changed fields
      const shouldUpdateName = !isEqual(updatedName, name);
      const shouldUpdateDateOfBirth = !!(formattedUpdatedDateOfBirth && formattedUpdatedDateOfBirth !== dateOfBirth);
      const shouldUpdateAddress = updatedAddress && address ? !isEqual({ ...updatedAddress, country: 'USA' }, { ...address }) : false;
      const idScan = await convertFiles();

      const input: UpdateProfileForVerificationInput = {
        ...(shouldUpdateName ? { name: updatedName } : {}),
        ...(shouldUpdateDateOfBirth ? { dateOfBirth: { dateOfBirth: formattedUpdatedDateOfBirth } } : {}),
        ...(shouldUpdateAddress ? { address: { ...updatedAddress, country: 'USA' } as AddressInput } : {}),
        ...(didFilesChange && idScan.length ? { idScan } : {}),
      };

      await updateProfile({ input });

      await refetchProfile();
      const { data: updatedAccounts } = await refetchAccount();
      const updatedAccount = updatedAccounts?.find(acc => acc?.id === activeAccount.id);
      setCurrentAccount(updatedAccount as AccountOverview);

      return moveToNextStep();
    };

    const handleSelectFiles = (files: (DocumentPickerResponse | Asset)[]) => {
      setSelectedFiles(files);
      setDidFilesChange(true);
    };

    if (isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading || isUpdatingProfile) {
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
              headline={`Uploading Your Profile Information`}
            />
          </Box>
        </View>
      );
    }

    return (
      <>
        <PaddedScrollView dark>
          <FormTitle
            dark
            headline="Verify that the ID you uploaded is correct"
          />
          <FilePicker
            dark
            label={selectedFiles.length ? 'Add Additional Files' : 'Upload Files'}
            onSelect={handleSelectFiles}
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
            disabled={shouldButtonBeDisabled || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading || isUpdatingProfile}
          >
            Submit
          </Button>
        </Box>
      </>
    );
  },
};

import React, { useEffect, useState } from 'react';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useUpdateCorporateAccount } from 'reinvest-app-common/src/services/queries/updateCorporateAccount';
import { useUpdateTrustAccount } from 'reinvest-app-common/src/services/queries/updateTrustAccount';
import { AccountType, DocumentFileLinkInput } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { FilePicker } from '../../../components/FilePicker';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { UpdateSuccess } from '../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';
import { documentReducer } from '../../../utils/documentReducer';
import { MINIMUM_CORPORATION_FILES_COUNT } from '../../../utils/formValidationRules';
import { AssetWithPreloadedFiles, IdentificationDocument } from '../../Onboarding/types';
import { styles } from '../styles';

export const UpdateCompanyDocuments = () => {
  const { activeAccount } = useCurrentAccount();
  const { goBack, navigate } = useLogInNavigation();
  const {
    data: corporateAccount,
    status: corporateAccountFetchStatus,
    refetch: refetchCorporateAccount,
  } = useGetCorporateAccount(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: activeAccount.type === AccountType.Corporate },
  });
  const {
    data: trustAccount,
    status: trustAccountFetchStatus,
    refetch: refetchTrustAccount,
  } = useGetCorporateAccount(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: activeAccount.type === AccountType.Trust },
  });
  const { isLoading: isUpdatingCorporateAccount, mutateAsync: updateCorporateAccount } = useUpdateCorporateAccount(getApiClient);
  const { isLoading: isUpdatingTrustAccount, mutateAsync: updateTrustAccount } = useUpdateTrustAccount(getApiClient);
  const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
  const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
  const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>([]);
  const { openDialog } = useDialog();

  const isLoading = isUpdatingCorporateAccount || isUpdatingTrustAccount || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading;

  const shouldButtonBeDisabled = selectedFiles.length < MINIMUM_CORPORATION_FILES_COUNT;

  useEffect(() => {
    if (corporateAccountFetchStatus === 'success') {
      setSelectedFiles((corporateAccount?.details?.companyDocuments as AssetWithPreloadedFiles[]) || []);

      return;
    }

    if (trustAccountFetchStatus === 'success') {
      setSelectedFiles((trustAccount?.details?.companyDocuments as AssetWithPreloadedFiles[]) || []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [corporateAccountFetchStatus, trustAccountFetchStatus]);

  const getRemovedFiles = (updatedFiles: IdentificationDocument[]): DocumentFileLinkInput[] => {
    const allFiles =
      (activeAccount.type === AccountType.Corporate ? corporateAccount?.details?.companyDocuments : trustAccount?.details?.companyDocuments) ?? [];

    return allFiles.filter(file => !updatedFiles.some(f => f.id === file?.id)) as DocumentFileLinkInput[];
  };

  const submitFiles = async () => {
    const { forUpload, uploaded } = documentReducer(selectedFiles);
    const removeDocuments = getRemovedFiles(uploaded);
    const companyDocuments = [...uploaded];

    const filesForUploadUris = forUpload.map(({ uri }) => uri ?? '');

    try {
      if (filesForUploadUris.length) {
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: filesForUploadUris.length })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({
          documentsFileLinks: documentsFileLinks as PutFileLink[],
          identificationDocument: forUpload,
        });
        companyDocuments.push(...scans);
      }

      const accountId = activeAccount.id ?? '';

      switch (activeAccount.type) {
        case AccountType.Corporate:
          await updateCorporateAccount({ accountId, input: { companyDocuments, removeDocuments } });
          await refetchCorporateAccount();
          break;
        case AccountType.Trust:
          await updateTrustAccount({ accountId, input: { companyDocuments, removeDocuments } });
          await refetchTrustAccount();
          break;
      }

      openDialog(
        <UpdateSuccess
          info="Documents updated!"
          buttonLabel="Dashboard"
          onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
        />,
        { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('-> e', e);
    }
  };

  if (isLoading) {
    return (
      <Box
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Loader size="xl" />
        <FormTitle headline={`Updating Document${selectedFiles.length > 1 ? 's' : ''}`} />
      </Box>
    );
  }

  return (
    <MainWrapper
      bottomSafe
      noPadding
      style={styles.wrapper}
    >
      <PaddedScrollView>
        <Row mb="24">
          <StyledText
            variant="paragraphLarge"
            textAlign="left"
          >
            Following documents have been uploaded.
          </StyledText>
        </Row>
        {selectedFiles.length ? (
          <FilePicker
            showConfirmDialog
            dark={false}
            selectionLimit={5}
            label={selectedFiles ? 'Add Additional Files' : 'Upload Files'}
            onSelect={setSelectedFiles}
            type="multi"
            state={selectedFiles}
            style={styles.companyDocumentsWrapper}
          />
        ) : null}
      </PaddedScrollView>
      <Row
        fw
        px="default"
      >
        <Button
          onPress={submitFiles}
          disabled={shouldButtonBeDisabled}
        >
          Confirm
        </Button>
      </Row>
    </MainWrapper>
  );
};

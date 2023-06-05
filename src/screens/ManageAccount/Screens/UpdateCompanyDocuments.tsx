import React, { useEffect, useState } from 'react';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Row } from '../../../components/Containers/Row';
import { FilePicker } from '../../../components/FilePicker';
import { MainWrapper } from '../../../components/MainWrapper';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import { MINIMUM_CORPORATION_FILES_COUNT } from '../../../utils/formValidationRules';
import { AssetWithPreloadedFiles } from '../../Onboarding/types';
import { styles } from '../styles';

export const UpdateCompanyDocuments = () => {
  const { activeAccount } = useCurrentAccount();
  const { goBack } = useLogInNavigation();
  const { data: corporateAccount, status: corporateAccountFetchStatus } = useGetCorporateAccount(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: activeAccount.type === AccountType.Corporate },
  });
  const { data: trustAccount, status: trustAccountFetchStatus } = useGetCorporateAccount(getApiClient, {
    accountId: activeAccount.id ?? '',
    config: { enabled: activeAccount.type === AccountType.Trust },
  });

  const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>(
    (corporateAccount?.details?.companyDocuments as AssetWithPreloadedFiles[]) || [],
  );

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

  const confirm = () => {
    goBack();
  };

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
          onPress={confirm}
          disabled={shouldButtonBeDisabled}
        >
          Confirm
        </Button>
      </Row>
    </MainWrapper>
  );
};

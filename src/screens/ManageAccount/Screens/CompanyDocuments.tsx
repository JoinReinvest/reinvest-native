import React, { useEffect, useState } from 'react';
import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { FilePicker } from '../../../components/FilePicker';
import { MainWrapper } from '../../../components/MainWrapper';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { MINIMUM_CORPORATION_FILES_COUNT } from '../../../utils/formValidationRules';
import { AssetWithPreloadedFiles } from '../../Onboarding/types';

export const CompanyDocuments = () => {
  const { activeAccount } = useCurrentAccount();
  const { data: corporateAccount, status } = useGetCorporateAccount(getApiClient, { accountId: activeAccount.id ?? '' });
  const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>(
    (corporateAccount?.details?.companyDocuments as AssetWithPreloadedFiles[]) || [],
  );

  const shouldButtonBeDisabled = selectedFiles.length < MINIMUM_CORPORATION_FILES_COUNT;

  useEffect(() => {
    if (status === 'success') {
      setSelectedFiles((corporateAccount?.details?.companyDocuments as AssetWithPreloadedFiles[]) || []);
    }
  }, [corporateAccount?.details?.companyDocuments, status]);

  return (
    <MainWrapper
      bottomSafe
      noPadding
      style={{ marginTop: 24, flex: 1 }}
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
            dark={false}
            selectionLimit={5}
            label={selectedFiles ? 'Add Additional Files' : 'Upload Files'}
            onSelect={setSelectedFiles}
            type="multi"
            state={selectedFiles}
            style={{ flexDirection: 'column-reverse' }}
          />
        ) : null}
      </PaddedScrollView>
      <Row
        fw
        px="default"
      >
        <Button disabled={shouldButtonBeDisabled}>Confirm</Button>
      </Row>
    </MainWrapper>
  );
};

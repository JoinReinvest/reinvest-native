import React, { useState } from 'react';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useUpdateBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/updateBeneficiaryAccount';
import { useUpdateCorporateAccount } from 'reinvest-app-common/src/services/queries/updateCorporateAccount';
import { useUpdateIndividualAccount } from 'reinvest-app-common/src/services/queries/updateIndividualAccount';
import { useUpdateTrustAccount } from 'reinvest-app-common/src/services/queries/updateTrustAccount';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { sendFilesToS3Bucket } from '../../../api/sendFilesToS3Bucket';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { MainWrapper } from '../../../components/MainWrapper';
import { UpdateSuccess } from '../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { useCurrentAccount } from '../../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';

export const UpdateProfilePicture = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [newAvatarUri, setNewAvatarUri] = useState<string | undefined>();
  const [uploadingError, setUploadingError] = useState<string | null>();
  const { activeAccount, setActiveAccount } = useCurrentAccount();
  const { mutateAsync: updateCorporateAccount } = useUpdateCorporateAccount(getApiClient);
  const { mutateAsync: updateTrustAccount } = useUpdateTrustAccount(getApiClient);
  const { mutateAsync: updateIndividualAccount } = useUpdateIndividualAccount(getApiClient);
  const { mutateAsync: updateBeneficiaryAccount } = useUpdateBeneficiaryAccount(getApiClient);
  const { mutateAsync: createAvatarLinkMutate, error: createLinkError } = useCreateAvatarFileLink(getApiClient);
  const { refetch } = useGetAccountsOverview(getApiClient);
  const { openDialog } = useDialog();
  const { navigate, goBack } = useLogInNavigation();

  const error = uploadingError || createLinkError;

  const onSubmit = async () => {
    const accountId = activeAccount.id ?? '';

    if (!accountId || !newAvatarUri) {
      return;
    }

    setIsLoading(true);

    const avatar = await createAvatarLinkMutate({});

    if (!avatar?.id || !avatar.url) {
      setIsLoading(false);

      return;
    }

    try {
      setUploadingError(null);
      await sendFilesToS3Bucket([{ file: { uri: newAvatarUri }, url: avatar.url, id: avatar.id }]);
    } catch (e) {
      setUploadingError('We have problem with uploading your asset, please try again');
    }

    switch (activeAccount.type) {
      case AccountType.Individual:
        {
          await updateIndividualAccount({ accountId, input: { avatar: { id: avatar.id } } });
        }
        break;
      case AccountType.Trust:
        {
          await updateTrustAccount({ accountId, input: { avatar: { id: avatar.id } } });
        }
        break;
      case AccountType.Corporate:
        {
          await updateCorporateAccount({ accountId, input: { avatar: { id: avatar.id } } });
        }
        break;
      case AccountType.Beneficiary:
        {
          await updateBeneficiaryAccount({ accountId, input: { avatar: { id: avatar.id } } });
        }
        break;
    }
    const { data: accounts } = await refetch();

    const updatedAccount = accounts?.find(acc => acc?.id === accountId);

    if (updatedAccount) {
      setActiveAccount(updatedAccount);
    }

    openDialog(
      <UpdateSuccess
        info="Profile picture updated successfully"
        buttonLabel="Dashboard"
        onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
      />,
      { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
    );
    setIsLoading(false);
  };

  return (
    <MainWrapper
      bottomSafe
      noPadding
    >
      <PaddedScrollView>
        <Box
          pt={'24'}
          pb={'16'}
          fw
        >
          <StyledText variant="paragraphLarge">Update your profile picture</StyledText>
        </Box>
        {error && <ErrorMessagesHandler error={error} />}
        <Box
          fw
          alignItems={'center'}
        >
          <Avatar
            uri={newAvatarUri ?? activeAccount.avatar?.url ?? ''}
            onImageSelect={setNewAvatarUri}
            isEditable
            size={'2xl'}
            initials={activeAccount.avatar?.initials ?? ''}
            variant={AccountType.Beneficiary}
          />
        </Box>
      </PaddedScrollView>
      <Box
        fw
        px="default"
      >
        <Button
          isLoading={isLoading}
          onPress={onSubmit}
        >
          Continue
        </Button>
      </Box>
    </MainWrapper>
  );
};

import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { UpdateProfileInput } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { PutFileLink, useSendDocumentsToS3AndGetScanIds } from '../../../../../api/hooks/useSendDocumentsToS3AndGetScanIds';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { FilePicker } from '../../../../../components/FilePicker';
import { FormTitle } from '../../../../../components/Forms/FormTitle';
import { Icon } from '../../../../../components/Icon';
import { Loader } from '../../../../../components/Loader';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../../../../components/PaddedScrollView';
import { StyledText } from '../../../../../components/typography/StyledText';
import { palette } from '../../../../../constants/theme';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { currentAccount } from '../../../../../store/atoms';
import { documentReducer } from '../../../../../utils/documentReducer';
import { AssetWithPreloadedFiles } from '../../../../Onboarding/types';
import { UpdateNameFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepIdentificationDocuments: StepParams<UpdateNameFormFields> = {
  identifier: Identifiers.IDENTIFICATION_DOCUMENTS,

  doesMeetConditionFields({ firstName, lastName }) {
    return !!(firstName && lastName);
  },

  Component: ({ storeFields: { firstName, middleName, lastName, identificationDocument } }: StepComponentProps<UpdateNameFormFields>) => {
    const [account, setAccountAtom] = useAtom(currentAccount);
    const [selectedFiles, setSelectedFiles] = useState<AssetWithPreloadedFiles[]>((identificationDocument as AssetWithPreloadedFiles[]) || []);
    const { openDialog } = useDialog();
    const { goBack } = useLogInNavigation();
    const { mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { mutateAsync: updateProfile } = useUpdateProfile(getApiClient);
    const { refetch: refetchAccountsOverview } = useGetAccountsOverview(getApiClient);
    const { refetch: refetchProfile } = useGetUserProfile(getApiClient);
    const [isUpdating, setIsUpdating] = useState(false);
    const { navigate } = useLogInNavigation();

    const onSubmit = async () => {
      setIsUpdating(true);
      const preloadedFiles = documentReducer(selectedFiles);

      const selectedFilesUris = preloadedFiles.forUpload.map(({ uri }) => uri ?? '');

      // No files to upload
      if (!selectedFilesUris.length) {
        return;
      }

      try {
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: selectedFilesUris.length })) as PutFileLink[];
        const idScan = await sendDocumentsToS3AndGetScanIdsMutate({
          documentsFileLinks: documentsFileLinks as PutFileLink[],
          identificationDocument: preloadedFiles.forUpload,
        });

        const input: Partial<UpdateProfileInput> = {
          name: {
            firstName,
            middleName,
            lastName,
          },
          idScan,
        };

        await updateProfile({ input });
        await refetchProfile();
        const { data } = await refetchAccountsOverview();

        const currentAccount = data?.find(acc => acc?.id === account.id);

        if (!currentAccount) {
          return;
        }

        setAccountAtom(currentAccount);

        openDialog(
          <UpdateSuccess
            info="Your name is updated"
            buttonLabel="Dashboard"
            onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
          />,
          { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
        );
        setIsUpdating(false);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('-> e', e);
      }
    };

    const shouldButtonBeDisabled = !selectedFiles.length || selectedFiles.length > 5;

    if (isUpdating) {
      return (
        <View style={{ flex: 1 }}>
          <Box
            flex={1}
            justifyContent="center"
            alignItems="center"
          >
            <Loader size="xl" />
            <FormTitle
              dark
              headline="Updating your changes"
            />
          </Box>
        </View>
      );
    }

    return (
      <Box
        fw
        flex={1}
        mt="24"
      >
        <Row
          mb="16"
          px="default"
        >
          <StyledText variant="paragraphLarge">Please upload your Driver’s License or Passport for further verification</StyledText>
        </Row>
        <PaddedScrollView>
          <FilePicker
            dark={false}
            label={selectedFiles.length ? 'Add Additional Files' : 'Upload Files'}
            onSelect={setSelectedFiles}
            type="multi"
            selectionLimit={5}
            state={selectedFiles}
            showConfirmDialog
          />
          <Row
            mt="24"
            alignItems="center"
            style={{ columnGap: 4 }}
          >
            <Icon
              size="s"
              icon="info"
              color={palette.dark2}
            />
            <StyledText
              variant="paragraphSmall"
              color="dark2"
            >
              This will trigger an extra verification again. Lorem Ipsum
            </StyledText>
          </Row>
        </PaddedScrollView>
        <Box
          fw
          px="default"
        >
          <Button
            disabled={shouldButtonBeDisabled}
            onPress={onSubmit}
          >
            Continue
          </Button>
        </Box>
      </Box>
    );
  },
};

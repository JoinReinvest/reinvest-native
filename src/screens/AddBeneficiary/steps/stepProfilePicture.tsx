import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useOpenBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/openBeneficiaryAccount';

import { getApiClient } from '../../../api/getApiClient';
import { sendFilesToS3Bucket } from '../../../api/sendFilesToS3Bucket';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { currentAccount, useAtom } from '../../../store/atoms';
import { styles } from '../../Onboarding/flow-steps/styles';
import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const getBeneficiaryInitials = ({ firstName, lastName }: BeneficiaryCreationFormFields) => {
  const firstLetter = firstName ? firstName[0] : '';
  const secondLetter = lastName ? lastName[0] : '';

  return `${firstLetter}${secondLetter}`.toUpperCase();
};

export const StepProfilePicture: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const [account] = useAtom(currentAccount);
    const beneficiaryInitials = getBeneficiaryInitials(storeFields);
    const { profilePicture } = storeFields;

    const [uri, setUri] = useState(profilePicture);
    const [isLoading, setIsLoading] = useState(false);
    const { mutateAsync: createAvatarLinkMutate, error: createLinkError } = useCreateAvatarFileLink(getApiClient);
    const [uploadingError, setUploadingError] = useState<string | null>();
    const { refetch } = useGetAccountsOverview(getApiClient);
    const { isLoading: openAccountLoading, mutateAsync: openAccountMutation, isSuccess, error: openAccountError } = useOpenBeneficiaryAccount(getApiClient);

    const onFileChange = async (file?: string) => {
      await updateStoreFields({ profilePicture: file });
      setUri(file);
    };

    const onSubmit = async () => {
      setIsLoading(true);
      let avatarId = '';

      if (uri) {
        const avatarLink = await createAvatarLinkMutate({});

        if (avatarLink?.url && avatarLink.id && uri) {
          try {
            setUploadingError(null);
            await sendFilesToS3Bucket([{ file: { uri }, url: avatarLink.url, id: avatarLink.id }]);

            avatarId = avatarLink.id;
          } catch (e) {
            setUploadingError('We have problem with uploading your asset, please try again');
          }
        }
      }

      setIsLoading(false);

      const { firstName, lastName } = storeFields;

      if (firstName && lastName) {
        const beneficiary = await openAccountMutation({
          individualAccountId: account.id as string,
          input: { avatar: { id: avatarId }, name: { firstName, lastName } },
        });

        if (beneficiary?.id) {
          await updateStoreFields({ id: beneficiary.id });
        }
      }
    };

    useEffect(() => {
      if (isSuccess) {
        (async () => {
          await moveToNextStep();
          /*
          To update our accounts list we need to refetch accounts
           */
          await refetch();
        })();
      }
    }, [isSuccess, moveToNextStep, refetch]);

    const error = uploadingError || createLinkError || openAccountError;

    return (
      <>
        <PaddedScrollView>
          <Box
            pt={'24'}
            pb={'16'}
          >
            <StyledText variant="paragraphLarge">Add a personal touch! Upload a profile picture for your beneficiary. (optional)</StyledText>
          </Box>
          {error && <ErrorMessagesHandler error={error} />}
          <Box
            fw
            alignItems={'center'}
          >
            <Avatar
              uri={uri}
              onImageSelect={onFileChange}
              isEditable
              size={'2xl'}
              initials={beneficiaryInitials}
              variant="NEW_BENEFICIARY"
            />
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            isLoading={isLoading || openAccountLoading}
            onPress={onSubmit}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

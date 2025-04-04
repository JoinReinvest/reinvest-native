import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useOpenAccount } from 'reinvest-app-common/src/services/queries/openAccount';
import { AccountOverview, DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { sendFilesToS3Bucket } from '../../../api/sendFilesToS3Bucket';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import { currentAccount, useSetAtom } from '../../../store/atoms';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const schema = z.object({
  profilePicture: z.string().optional(),
});

const getCompanyInitials = (accountType: DraftAccountType) => {
  switch (accountType) {
    case DraftAccountType.Corporate:
      return 'C';
    case DraftAccountType.Trust:
      return 'T';
    default:
      return '';
  }
};
export const StepProfilePicture: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields(fields) {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.identificationDocument?.length,
      fields.accountType,
    ];

    return allRequiredFieldsExists(profileFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { profilePicture, name, accountType, accountId } = storeFields;

    const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>(profilePicture);

    const { progressPercentage } = useOnboardingFormFlow();
    const { handleSubmit, setValue } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        profilePicture,
      },
    });

    const { refetch: refetchAccounts } = useGetAccountsOverview(getApiClient);

    const navigation = useLogInNavigation();
    const { refetch } = useGetUserProfile(getApiClient);

    const {
      isLoading: isCompleteProfileDetailsLoading,
      mutateAsync: completeProfileMutate,
      error: completeProfileError,
    } = useCompleteProfileDetails(getApiClient);
    const { isLoading: isCreateAvatarLinkLoading, mutateAsync: createAvatarLinkMutate, error: createAvatarError } = useCreateAvatarFileLink(getApiClient);
    const {
      isLoading: isIndividualDraftAccountLoading,
      mutateAsync: completeIndividualDraftAccountMutate,
      error: completeIndividualError,
    } = useCompleteIndividualDraftAccount(getApiClient);
    const {
      isLoading: isOpenAccountLoading,
      mutateAsync: openAccountMutate,
      isSuccess: isOpenAccountSuccess,
      error: openAccountError,
    } = useOpenAccount(getApiClient);
    const {
      mutateAsync: completeTrustDraftAccount,
      error: completeDraftAccountError,
      isLoading: completeDraftLoading,
    } = useCompleteTrustDraftAccount(getApiClient);

    const {
      mutateAsync: completeCorporateDraftAccount,
      error: completeCorporateDraftAccountError,
      isLoading: corporateLoading,
    } = useCompleteCorporateDraftAccount(getApiClient);

    const setCurrentAccount = useSetAtom(currentAccount);

    const onSubmit: SubmitHandler<Fields> = async ({ profilePicture }) => {
      if (isLoading) {
        return;
      }

      const hasFile = !!profilePicture && selectedImageUri;
      let avatarId = '';

      if (!hasFile) {
        await completeProfileAndOpenAccount();

        return;
      }

      await updateStoreFields({
        profilePicture,
      });

      const avatarLink = await createAvatarLinkMutate({});

      if (avatarLink?.url && avatarLink.id && profilePicture) {
        await sendFilesToS3Bucket([{ file: { uri: selectedImageUri }, url: avatarLink.url, id: avatarLink.id }]);
        avatarId = avatarLink.id;
      }

      if (accountId && avatarId) {
        const avatar = { id: avatarId };

        let draftAccount = null;

        if (storeFields.accountType === DraftAccountType.Individual) {
          draftAccount = await completeIndividualDraftAccountMutate({
            accountId,
            input: { avatar },
          });
        }

        if (storeFields.accountType === DraftAccountType.Trust) {
          draftAccount = await completeTrustDraftAccount({ accountId, input: { avatar } });
        }

        if (storeFields.accountType === DraftAccountType.Corporate) {
          draftAccount = await completeCorporateDraftAccount({ accountId, input: { avatar } });
        }

        if (draftAccount?.isCompleted) {
          await completeProfileAndOpenAccount();
        }
      }
    };

    useEffect(() => {
      if (isOpenAccountSuccess) {
        (async () => {
          await updateStoreFields({ initialInvestment: !storeFields.isCompletedProfile });
          const { data } = await refetchAccounts();
          const account = data?.find(account => account?.id === storeFields.accountId) ?? data?.[0];
          setCurrentAccount(account as AccountOverview);
          moveToNextStep();
        })();
      }
    }, [
      isOpenAccountSuccess,
      moveToNextStep,
      navigation,
      refetch,
      refetchAccounts,
      setCurrentAccount,
      storeFields.accountId,
      storeFields.isCompletedProfile,
      updateStoreFields,
    ]);

    const handleSelectProfilePicture = (uri: string | undefined) => {
      setValue('profilePicture', uri);
      setSelectedImageUri(uri);
    };

    const completeProfileAndOpenAccount = async () => {
      if (accountId) {
        if (!storeFields.isCompletedProfile) {
          const response = await completeProfileMutate({ input: { verifyAndFinish: true } });

          if (response?.isCompleted) {
            await updateStoreFields({ isCompletedProfile: true });
          }
        }

        await openAccountMutate({ draftAccountId: accountId });
      }
    };

    const error =
      completeCorporateDraftAccountError ||
      completeDraftAccountError ||
      completeProfileError ||
      createAvatarError ||
      completeProfileError ||
      completeIndividualError ||
      completeCorporateDraftAccountError ||
      openAccountError;

    const isLoading =
      isCompleteProfileDetailsLoading ||
      isCompleteProfileDetailsLoading ||
      isOpenAccountLoading ||
      isIndividualDraftAccountLoading ||
      isCreateAvatarLinkLoading ||
      completeDraftLoading ||
      corporateLoading;

    const initials =
      accountType === DraftAccountType.Individual
        ? `${name?.firstName.charAt(0)}${name?.lastName.charAt(0)}`.toUpperCase()
        : getCompanyInitials(accountType as DraftAccountType);

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView
          dark
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {error && <ErrorMessagesHandler error={error} />}
          <Avatar
            uri={selectedImageUri}
            size="2xl"
            initials={initials}
            variant={accountType}
            isEditable
            onImageSelect={handleSelectProfilePicture}
          />
          <Box mt="12">
            <StyledText
              variant="paragraphLarge"
              style={{ textAlign: 'center' }}
              color="pureWhite"
            >
              Upload profile picture
            </StyledText>
            <Box mt="4">
              <StyledText
                variant="paragraphLarge"
                style={{ textAlign: 'center' }}
                opacity={0.5}
                color="pureWhite"
              >
                Customize your profile picture
              </StyledText>
            </Box>
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            isLoading={isLoading}
            onPress={handleSubmit(onSubmit)}
          >
            Complete Profile
          </Button>
        </View>
      </>
    );
  },
};

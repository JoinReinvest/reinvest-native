import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useOpenAccount } from 'reinvest-app-common/src/services/queries/openAccount';
import { useRemoveDraftAccount } from 'reinvest-app-common/src/services/queries/removeDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { sendFilesToS3Bucket } from '../../../api/sendFilesToS3Bucket';
import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const schema = z.object({
  profilePicture: z.string().optional(),
});

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

    const individualAccountFields = [fields.netIncome, fields.netWorth];

    return (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(profileFields)) || allRequiredFieldsExists(individualAccountFields);
  },

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const { profilePicture, name, accountType, accountId } = storeFields;

    const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>(profilePicture);

    const { progressPercentage } = useOnboardingFormFlow();
    const { formState, handleSubmit, setValue } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        profilePicture,
      },
    });

    const { isLoading: isCompleteProfileDetailsLoading, mutateAsync: completeProfileMutate } = useCompleteProfileDetails(getApiClient);
    const { isLoading: isCreateAvatarLinkLoading, mutateAsync: createAvatarLinkMutate } = useCreateAvatarFileLink(getApiClient);
    const { isLoading: isIndividualDraftAccountLoading, mutateAsync: completeIndividualDraftAccountMutate } = useCompleteIndividualDraftAccount(getApiClient);
    const { isLoading: isRemoveDraftAccountLoading, mutateAsync: removeDraftAccountMutate } = useRemoveDraftAccount(getApiClient);
    const { isLoading: isOpenAccountLoading, mutateAsync: openAccountMutate, isSuccess: isOpenAccountSuccess } = useOpenAccount(getApiClient);

    const shouldButtonBeDisabled =
      !formState.isValid ||
      formState.isSubmitting ||
      isCompleteProfileDetailsLoading ||
      isCompleteProfileDetailsLoading ||
      isOpenAccountLoading ||
      isIndividualDraftAccountLoading ||
      isRemoveDraftAccountLoading ||
      isCreateAvatarLinkLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({
        profilePicture: fields.profilePicture,
      });
      const avatarLink = await createAvatarLinkMutate({});

      if (fields.profilePicture) {
        if (avatarLink?.url && avatarLink.id) {
          await sendFilesToS3Bucket([{ file: { uri: fields.profilePicture }, url: avatarLink.url, id: avatarLink.id }]);

          const avatarId = avatarLink.id;

          if (accountId && avatarId) {
            if (!storeFields.isCompletedProfile) {
              await completeProfileMutate({ input: { verifyAndFinish: true } });
            }

            const avatar = { id: avatarLink.id };
            const individualDraftAccount = await completeIndividualDraftAccountMutate({
              accountId,
              input: { avatar },
            });

            if (individualDraftAccount?.isCompleted) {
              await openAccountMutate({ draftAccountId: accountId });
              await removeDraftAccountMutate({ draftAccountId: accountId });
            }
          }
        }
      }
    };
    const navigation = useLogInNavigation();
    const { refetch } = useGetUserProfile(getApiClient);

    useEffect(() => {
      if (isOpenAccountSuccess) {
        (async () => {
          navigation.navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
          await refetch();
        })();
      }
    }, [isOpenAccountSuccess, navigation, refetch]);

    const handleSelectProfilePicture = (uri: string | undefined) => {
      setValue('profilePicture', uri);
      setSelectedImageUri(uri);
    };

    const onSkip = async () => {
      if (accountId) {
        if (!storeFields.isCompletedProfile) {
          await completeProfileMutate({ input: { verifyAndFinish: true } });
        }

        const individualDraftAccount = await completeIndividualDraftAccountMutate({
          accountId,
          input: {},
        });

        if (individualDraftAccount?.isCompleted) {
          await openAccountMutate({ draftAccountId: accountId });
          await removeDraftAccountMutate({ draftAccountId: accountId });
        }
      }
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            uri={selectedImageUri}
            size="xl"
            username={`${name?.firstName} ${name?.lastName}`}
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
            disabled={shouldButtonBeDisabled}
            onPress={handleSubmit(onSubmit)}
          >
            Continue
          </Button>
          <Button
            variant="outlined"
            disabled={shouldButtonBeDisabled}
            onPress={onSkip}
          >
            Skip
          </Button>
        </View>
      </>
    );
  },
};

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ProgressBar } from '../../../components/ProgressBar';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { hexToRgbA } from '../../../utils/hexToRgb';
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
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.identificationDocument,
      fields.accountType,
    ];

    const individualAccountFields = [fields.netIncome, fields.netWorth];

    return (
      fields.isCompletedProfile &&
      ((fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(profileFields)) || allRequiredFieldsExists(individualAccountFields))
    );
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { profilePicture, name, accountType } = storeFields;

    const [selectedImageUri, setSelectedImageUri] = useState<string | undefined>(profilePicture);

    const { progressPercentage } = useOnboardingFormFlow();
    const { formState, handleSubmit, setValue } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        profilePicture,
      },
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({
        profilePicture: fields.profilePicture,
      });
      moveToNextStep();
    };

    const handleSelectProfilePicture = (uri: string | undefined) => {
      setValue('profilePicture', uri);
      setSelectedImageUri(uri);
    };

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <ScrollView
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
              color={palette.pureWhite}
            >
              Upload profile picture
            </StyledText>
            <Box mt="4">
              <StyledText
                variant="paragraphLarge"
                style={{ textAlign: 'center' }}
                color={hexToRgbA(palette.pureWhite, 0.5)}
              >
                Customize your profile picture
              </StyledText>
            </Box>
          </Box>
        </ScrollView>
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
            onPress={moveToNextStep}
          >
            Skip
          </Button>
        </View>
      </>
    );
  },
};

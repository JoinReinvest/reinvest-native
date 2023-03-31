import { Button } from '@components/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import { Avatar } from '@src/components/Avatar';
import { Box } from '@src/components/Containers/Box/Box';
import { ProgressBar } from '@src/components/ProgressBar';
import { StyledText } from '@src/components/typography/StyledText';
import { palette } from '@src/constants/theme';
import { hexToRgbA } from '@src/utils/hexToRgb';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { z } from 'zod';

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
    const profileFields = [fields.accountType, fields.firstName, fields.lastName];

    return allRequiredFieldsExists(profileFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { profilePicture, firstName, lastName, accountType } = storeFields;

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
            username={`${firstName} ${lastName}`}
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

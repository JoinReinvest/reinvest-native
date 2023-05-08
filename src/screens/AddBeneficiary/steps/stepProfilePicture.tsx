import React, { useState } from 'react';
import { View } from 'react-native';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { Avatar } from '../../../components/Avatar';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
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
    const beneficiaryInitials = getBeneficiaryInitials(storeFields);
    const [uri, setUri] = useState(storeFields.profilePicture);
    const [isLoading, setIsLoading] = useState(false);

    const onFileChange = async (file?: string) => {
      await updateStoreFields({ profilePicture: file });
      setUri(file);
    };

    const onSubmit = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        moveToNextStep();
      }, 2000);
    };

    return (
      <>
        <PaddedScrollView>
          <Box
            pt={'24'}
            pb={'16'}
          >
            <StyledText variant="paragraphLarge">Add a personal touch! Upload a profile picture for your beneficiary. (optional)</StyledText>
          </Box>
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
              variant={AccountType.Beneficiary}
            />
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={[styles.buttonsSection]}
        >
          <Button
            isLoading={isLoading}
            onPress={onSubmit}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

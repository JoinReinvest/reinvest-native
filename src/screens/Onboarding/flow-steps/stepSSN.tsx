import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import zod from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { Loader } from '../../../components/Loader';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { SSN_MASK } from '../../../constants/masks';
import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { apiSSN } from '../../../utils/regexes';
import { maskSocialSecurityNumber } from '../../../utils/social-security-number';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'ssn'>;

const schema = zod.object({
  ssn: formValidationRules.socialSecurityNumber,
});

export const StepSSN: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SOCIAL_SECURITY_NUMBER,

  willBePartOfTheFlow(fields) {
    return !!fields.accountType;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog } = useDialog();

    const defaultValues: Fields = {
      ssn: storeFields.ssn || '',
    };
    const { formState, handleSubmit, control, watch } = useForm<Fields>({
      defaultValues,
      resolver: zodResolver(schema),
    });
    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);
    const [isApiValue, setIsApiValue] = useState(apiSSN.test(storeFields.ssn || ''));

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    useEffect(() => {
      const { unsubscribe } = watch(({ ssn }) => {
        setIsApiValue(ssn === storeFields?.ssn);
      });

      return () => {
        unsubscribe();
      };
    }, [storeFields?.ssn, watch]);

    const onSubmit: SubmitHandler<Fields> = async ({ ssn }) => {
      if (!ssn) {
        return;
      }

      try {
        await updateStoreFields({
          ssn: maskSocialSecurityNumber(ssn),
          _isSocialSecurityNumberAlreadyAssigned: false,
          _isSocialSecurityNumberBanned: false,
        });
        await completeProfileMutate({ input: { ssn: { ssn } } });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const openRequiredModal = () => {
      openDialog(
        <FormModalDisclaimer
          headline="Required Why?"
          content="CONTENT"
        />,
      );
    };

    if (isLoading) {
      return (
        <View style={{ flex: 1 }}>
          <Box
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Loader
              size="xl"
              color={palette.pureWhite}
            />
            <FormTitle
              dark
              headline="Validating your Social Security Number"
            />
          </Box>
        </View>
      );
    }

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="What's your social security number"
          />
          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}

          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="ssn"
            inputProps={{
              placeholder: '000-00-0000',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 11, // xxx-xx-xxxx
              mask: SSN_MASK,
            }}
          />
          <View style={styles.row}>
            <StyledText
              variant="link"
              color="frostGreen"
              onPress={openRequiredModal}
            >
              Required. Why?
            </StyledText>
          </View>
          <Box mt="24">
            <StyledText
              color="pureWhite"
              variant="paragraphLarge"
            >
              *REINVEST is required by law to collect your social security number.
            </StyledText>
            <Box mt="4">
              <StyledText
                color="dark3"
                variant="paragraphLarge"
              >
                We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.
              </StyledText>
            </Box>
          </Box>
        </PaddedScrollView>
        <View
          key="buttons_section"
          style={styles.buttonsSection}
        >
          <Button
            disabled={!isApiValue && shouldButtonBeDisabled}
            onPress={isApiValue ? () => moveToNextStep() : handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

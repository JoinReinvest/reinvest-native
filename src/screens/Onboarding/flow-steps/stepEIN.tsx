import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType, TrustCompanyTypeEnum } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { FormMessage } from '../../../components/Forms/FormMessage';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { EIN_MASK } from '../../../constants/masks';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { Identifiers } from '../identifiers';
import { OnboardingFormFields } from '../types';
import { useOnboardingFormFlow } from '.';
import { styles } from './styles';

type Fields = Pick<OnboardingFormFields, 'ein'>;

const schema = z.object({
  ein: formValidationRules.ein,
});

export const StepEIN: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EIN,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate || accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isAccountCorporateOrTrust = fields.accountType === DraftAccountType.Corporate || fields.accountType === DraftAccountType.Trust;
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName]);
    const isRevocableTrust = fields.trustType !== TrustCompanyTypeEnum.Irrevocable;

    return isAccountCorporateOrTrust && hasProfileFields && hasTrustFields && isRevocableTrust && isAccountCorporateOrTrust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog } = useDialog();
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const defaultValues: Fields = {
      ein: storeFields.ein,
    };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'onBlur',
      defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ ein }) => {
      if (!storeFields.accountId || !ein) {
        return;
      }

      await updateStoreFields({ ein });

      switch (storeFields.accountType) {
        case DraftAccountType.Trust:
          await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { ein: { ein } } });
          break;
        case DraftAccountType.Corporate:
          // TODO: Complete corporate draft account here
          break;
      }
    };

    const openEinDialog = () => {
      openDialog(
        <FormModalDisclaimer
          headline="EIN?"
          content="CONTENT"
        />,
      );
    };

    const openIDoNotHaveEinDialog = () => {
      openDialog(
        <FormModalDisclaimer
          headline="I do not have an ein"
          content="CONTENT"
        />,
      );
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <View style={[styles.fw]}>
          <ProgressBar value={progressPercentage} />
        </View>
        <PaddedScrollView>
          <FormTitle
            dark
            headline="Enter your EIN"
          />
          {error && (
            <FormMessage
              variant="error"
              message={error.response.errors.map(err => err.message).join(', ')}
            />
          )}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="ein"
            inputProps={{
              placeholder: 'xxx-xxxxxx',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 10, // xxx-xxxxxx
              mask: EIN_MASK,
            }}
          />
          <View style={styles.row}>
            <StyledText
              variant="link"
              color="frostGreen"
              onPress={openEinDialog}
            >
              EIN?
            </StyledText>
            <StyledText
              variant="link"
              color="frostGreen"
              onPress={openIDoNotHaveEinDialog}
            >
              I do not have an EIN
            </StyledText>
          </View>
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
        </View>
      </>
    );
  },
};

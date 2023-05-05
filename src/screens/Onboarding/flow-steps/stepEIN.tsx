import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { View } from 'react-native';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType, TrustCompanyTypeEnum } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { FormModalDisclaimer } from '../../../components/Modals/ModalContent/FormModalDisclaimer';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { ProgressBar } from '../../../components/ProgressBar';
import { Controller } from '../../../components/typography/Controller';
import { StyledText } from '../../../components/typography/StyledText';
import { EIN_MASK } from '../../../constants/masks';
import { useDialog } from '../../../providers/DialogProvider';
import { formValidationRules } from '../../../utils/formValidationRules';
import { apiEIN } from '../../../utils/regexes';
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
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName]) && fields.accountType === DraftAccountType.Trust;
    const hasCorporateFields =
      allRequiredFieldsExists([fields.corporationType, fields.corporationLegalName]) && fields.accountType === DraftAccountType.Corporate;
    const isRevocableTrust = fields.trustType !== TrustCompanyTypeEnum.Irrevocable;

    return hasProfileFields && ((hasTrustFields && isRevocableTrust) || hasCorporateFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isApiValue, setIsApiValue] = useState(apiEIN.test(storeFields.ein || ''));
    const { progressPercentage } = useOnboardingFormFlow();
    const { openDialog } = useDialog();
    const {
      mutateAsync: updateTrust,
      isSuccess: trustSuccess,
      error: trustUpdateError,
      isLoading: trustUpdateLoading,
    } = useCompleteTrustDraftAccount(getApiClient);
    const defaultValues: Fields = {
      ein: storeFields.ein,
    };

    const {
      mutateAsync: updateCorporate,
      isSuccess: corporateSuccess,
      error: corporateUpdateError,
      isLoading: corporateUpdateLoading,
    } = useCompleteCorporateDraftAccount(getApiClient);

    const { formState, handleSubmit, control, watch } = useForm<Fields>({
      mode: 'onBlur',
      defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || trustUpdateLoading || corporateUpdateLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ ein }) => {
      const { accountId, accountType } = storeFields;
      const hasAccountIdAndEin = accountId && ein;
      await updateStoreFields({ ein });

      if (hasAccountIdAndEin) {
        const variables = { accountId, input: { ein: { ein } } };

        if (accountType === DraftAccountType.Trust) {
          await updateTrust(variables);
        }

        if (accountType === DraftAccountType.Corporate) {
          await updateCorporate(variables);
        }
      }
    };

    const openEinDialog = () => {
      openDialog(
        <FormModalDisclaimer
          dark
          headline="EIN?"
          content="CONTENT"
        />,
      );
    };

    const openIDoNotHaveEinDialog = () => {
      openDialog(
        <FormModalDisclaimer
          dark
          headline="I do not have an ein"
          content="CONTENT"
        />,
      );
    };

    useEffect(() => {
      if (corporateSuccess || trustSuccess) {
        moveToNextStep();
      }
    }, [corporateSuccess, trustSuccess, moveToNextStep]);

    useEffect(() => {
      const { unsubscribe } = watch(({ ein }) => {
        setIsApiValue(ein === storeFields?.ein);
      });

      return () => {
        unsubscribe();
      };
    }, [storeFields?.ein, watch]);

    const error = trustUpdateError || corporateUpdateError;

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
          {error && <ErrorMessagesHandler error={error} />}
          <Controller
            onSubmit={handleSubmit(onSubmit)}
            control={control}
            fieldName="ein"
            inputProps={{
              placeholder: '00-0000000',
              dark: true,
              keyboardType: 'numeric',
              maxLength: 10, // xx-xxxxxxx
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
            disabled={!isApiValue && shouldButtonBeDisabled}
            onPress={isApiValue ? moveToNextStep : handleSubmit(onSubmit)}
          >
            Continue
          </Button>
        </View>
      </>
    );
  },
};

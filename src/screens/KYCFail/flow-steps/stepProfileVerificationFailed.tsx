import { useCallback, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useAbortInvestment } from 'reinvest-app-common/src/services/queries/abortInvestment';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { ActionName, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../../api/getApiClient';
import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { IdentificationDocuments } from '../../Onboarding/types';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepProfileVerificationFailed: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.PROFILE_VERIFICATION_FAILED,

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<KYCFailedFormFields>) => {
    const { _actions, _oneTimeInvestmentId, _recurringInvestmentId, _bannedAction, _forceManualReviewScreen } = storeFields;
    const { data: userProfile } = useGetUserProfile(getApiClient);
    const { navigate } = useLogInNavigation();
    const { mutateAsync: abortInvestment } = useAbortInvestment(getApiClient);

    const failedAgain =
      _actions?.find(({ action, onObject }) => action === ActionName.UpdateMemberAgain && onObject.type === VerificationObjectType.Profile) ?? false;
    const headline = failedAgain ? 'We still are unable to verify your information' : 'We could not verify your information';

    const handleContinue = async () => {
      //prefill profile info from API:
      await updateStoreFields({
        name: {
          firstName: userProfile?.details?.firstName ?? '',
          middleName: userProfile?.details?.middleName ?? '',
          lastName: userProfile?.details?.lastName ?? '',
        },
        dateOfBirth: userProfile?.details?.dateOfBirth ? formatDate(userProfile.details.dateOfBirth, 'DEFAULT', { currentFormat: 'API' }) : undefined,
        ssn: userProfile?.details?.ssn ?? '',
        identificationDocument: (userProfile?.details?.idScan as IdentificationDocuments) ?? [],
        address: {
          ...userProfile?.details?.address,
        },
      });

      moveToNextStep();
    };

    const cancelInvestment = useCallback(async () => {
      if (_oneTimeInvestmentId) {
        await abortInvestment({ investmentId: _oneTimeInvestmentId });
      }

      if (_recurringInvestmentId) {
        await abortInvestment({ investmentId: _recurringInvestmentId });
      }
    }, [_oneTimeInvestmentId, _recurringInvestmentId, abortInvestment]);

    useEffect(() => {
      (async () => {
        // if user got banned navigate immediately to locked screen;
        const isBannedAccount = !!_actions?.some(({ action }) => action === ActionName.BanAccount);
        const isBannedProfile = !!_actions?.some(({ action }) => action === ActionName.BanProfile);

        if (isBannedAccount) {
          navigate(Screens.Locked, { isBannedAccount, isBannedProfile });
          await cancelInvestment();

          return;
        }

        // when user does not have anything to update but fee is required
        if (_forceManualReviewScreen) {
          moveToStepByIdentifier(Identifiers.MANUAL_REVIEW);

          return;
        }
      })();
    }, [_actions, _bannedAction, _forceManualReviewScreen, cancelInvestment, moveToStepByIdentifier, navigate]);

    return (
      <>
        <PaddedScrollView dark>
          <Box pt="24">
            <StatusCircle
              variant="error"
              dark
            />
          </Box>
          <FormTitle
            dark
            headline={headline}
            description="Please update your information and we will run our verification process again."
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="8"
        >
          <Button onPress={handleContinue}>Edit Information</Button>
        </Box>
      </>
    );
  },
};

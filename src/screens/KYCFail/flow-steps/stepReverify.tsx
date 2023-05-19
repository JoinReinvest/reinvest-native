import { useCallback, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { ActionName, VerificationAction, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepReverify: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.PROFILE_VERIFICATION_FAILED,

  Component: ({ storeFields: { _actions, accountId }, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<KYCFailedFormFields>) => {
    const { mutateAsync, isLoading } = useVerifyAccount(getApiClient);
    const { navigate } = useLogInNavigation();

    const verifyAccount = useCallback(async () => {
      const verificationResponse = await mutateAsync({ accountId });

      // verification succeeded return to investing:
      if (verificationResponse?.canUserContinueTheInvestment || !verificationResponse?.requiredActions || !verificationResponse?.requiredActions.length) {
        navigate(Screens.Investing, { validationSuccess: true });
      }

      await updateStoreFields({ _actions: (verificationResponse?.requiredActions ?? []) as VerificationAction[] });

      // verification failed rerun verifications flow
      const failedVerificationObjects = verificationResponse?.requiredActions?.map(action => action?.onObject.type) ?? [];

      if (failedVerificationObjects.includes(VerificationObjectType.Profile)) {
        return moveToStepByIdentifier(Identifiers.PROFILE_VERIFICATION_FAILED);
      }

      if (failedVerificationObjects.includes(VerificationObjectType.Stakeholder)) {
        return moveToStepByIdentifier(Identifiers.STAKEHOLDER_VERIFICATION_FAILED);
      }
    }, [accountId, moveToStepByIdentifier, mutateAsync, navigate, updateStoreFields]);

    useEffect(() => {
      // if there are no actions that can be automatically verified return to dashboard and cancel the investment
      if (_actions?.every(({ action }) => action === ActionName.RequireManualReview)) {
        navigate(Screens.Dashboard);
      } else {
        verifyAccount();
      }
    }, [_actions, navigate, verifyAccount]);

    return isLoading ? (
      <>
        <PaddedScrollView dark>
          <Box pt="48">
            <Loader
              color={palette.pureWhite}
              size="xxl"
            />
            <Box mt="16">
              <StyledText
                variant="paragraph"
                style={{ textAlign: 'center' }}
                color="pureWhite"
              >
                Verifying
              </StyledText>
            </Box>
          </Box>
          <Box
            fw
            mt="32"
          >
            <StyledText
              variant="h5"
              style={{ textAlign: 'center' }}
              color="pureWhite"
            >
              We are verifying your information
            </StyledText>
          </Box>
        </PaddedScrollView>
      </>
    ) : null;
  },
};

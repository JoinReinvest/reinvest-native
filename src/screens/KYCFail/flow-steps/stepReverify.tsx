import { useCallback, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useAbortInvestment } from 'reinvest-app-common/src/services/queries/abortInvestment';
import { useGetInvestmentSummary } from 'reinvest-app-common/src/services/queries/getInvestmentSummary';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { AccountType, ActionName, VerificationAction, VerificationObjectType } from 'reinvest-app-common/src/types/graphql';

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
  identifier: Identifiers.REVERIFY,

  doesMeetConditionFields({ _bannedAction, _forceManualReviewScreen }) {
    return !_bannedAction && !_forceManualReviewScreen;
  },

  Component: ({
    storeFields: { _actions, accountId, accountType, _oneTimeInvestmentId, _recurringInvestmentId, _approvedFees },
    updateStoreFields,
    moveToStepByIdentifier,
  }: StepComponentProps<KYCFailedFormFields>) => {
    const { mutateAsync, isLoading: isVerifying } = useVerifyAccount(getApiClient);
    const { navigate } = useLogInNavigation();
    const { mutateAsync: abortInvestment } = useAbortInvestment(getApiClient);
    const { data: investmentSummary, isLoading: isLoadingInvestmentSummary } = useGetInvestmentSummary(getApiClient, {
      investmentId: _oneTimeInvestmentId ?? '',
      config: {
        enabled: !!_oneTimeInvestmentId,
      },
    });

    const isLoading = isVerifying || isLoadingInvestmentSummary;

    const cancelInvestment = useCallback(async () => {
      if (_oneTimeInvestmentId) {
        await abortInvestment({ investmentId: _oneTimeInvestmentId });
      }

      if (_recurringInvestmentId) {
        await abortInvestment({ investmentId: _recurringInvestmentId });
      }
    }, [_oneTimeInvestmentId, _recurringInvestmentId, abortInvestment]);

    const verifyAccount = useCallback(async () => {
      try {
        const verificationResponse = await mutateAsync({ accountId });

        // verification failed (banned profile or account) -> abort investment and re navigate to locked screen
        const bannedAction = verificationResponse?.requiredActions?.find(
          action => action?.action === ActionName.BanAccount || action?.action === ActionName.BanProfile,
        );

        if (bannedAction) {
          await cancelInvestment();

          return navigate(Screens.Locked, {
            isBannedAccount: bannedAction.action === ActionName.BanAccount,
            isBannedProfile: bannedAction.action === ActionName.BanProfile,
            canGoBack: false,
          });
        }

        // additional fees required and not yet accepted by user -> show require manual review screen
        if (investmentSummary?.investmentFees && investmentSummary.investmentFees.value > 0 && !_approvedFees) {
          await updateStoreFields({ fees: investmentSummary.investmentFees ?? undefined });

          return moveToStepByIdentifier(Identifiers.MANUAL_REVIEW);
        }

        // additional fees accepted by user, verification succeeded  -> return to investing:
        if (verificationResponse?.canUserContinueTheInvestment || verificationResponse?.isAccountVerified) {
          return navigate(Screens.Investing, { validationSuccess: true });
        }

        // additional fees accepted by user, verification failed, updates required -> rerun kyc flows
        const automaticUpdateActions = (verificationResponse?.requiredActions?.filter(
          action => action?.action === ActionName.UpdateMember || action?.action === ActionName.UpdateMemberAgain,
        ) ?? []) as VerificationAction[];

        if (automaticUpdateActions.length) {
          await updateStoreFields({ _actions: automaticUpdateActions });

          const failedVerificationObjects = automaticUpdateActions.map(action => action?.onObject.type);

          if (failedVerificationObjects.includes(VerificationObjectType.Profile)) {
            return moveToStepByIdentifier(Identifiers.PROFILE_VERIFICATION_FAILED);
          }

          if (failedVerificationObjects.includes(VerificationObjectType.Stakeholder)) {
            if (accountType === AccountType.Corporate) {
              return moveToStepByIdentifier(Identifiers.STAKEHOLDER_VERIFICATION_FAILED);
            }

            return moveToStepByIdentifier(Identifiers.TRUSTEES_VERIFICATION_FAILED);
          }
        }

        // additional fees accepted by user, verification failed, updates not allowed -> return to dashboard and abort the investment
        navigate(Screens.BottomNavigator, { screen: Screens.Dashboard });
        await cancelInvestment();
      } catch (err) {
        await cancelInvestment();

        if (err instanceof Error && (err.message === 'Profile is banned' || err.name === 'Profile is Banned')) {
          navigate(Screens.Locked, { isBannedProfile: true, canGoBack: false });
        }
      }
    }, [
      mutateAsync,
      accountId,
      investmentSummary?.investmentFees,
      _approvedFees,
      navigate,
      cancelInvestment,
      updateStoreFields,
      moveToStepByIdentifier,
      accountType,
    ]);

    useEffect(() => {
      (async () => {
        await verifyAccount();
      })();
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

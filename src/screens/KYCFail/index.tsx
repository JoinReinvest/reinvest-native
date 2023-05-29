import React from 'react';
import { AccountType, ActionName } from 'reinvest-app-common/src/types/graphql';

import { LogInProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { currentAccount, useAtom } from '../../store/atoms';
import { BlackLayout } from './BlackLayout';
import { initialKYCFailedFormFields, KYCFailedFormFlowProvider } from './flow-steps';

export const KYCFail = ({ route: { params } }: LogInProps<Screens.KYCFail>) => {
  const [account] = useAtom(currentAccount);

  const canUserAutomaticallyUpdate = params.actions.some(({ action }) => action === ActionName.UpdateMember || action === ActionName.UpdateMemberAgain);

  const _bannedAction = params.actions.find(({ action }) => action === ActionName.BanAccount || action === ActionName.BanProfile);

  return (
    <KYCFailedFormFlowProvider
      initialStoreFields={{
        ...initialKYCFailedFormFields,
        _bannedAction,
        fees: params.fees,
        _forceManualReviewScreen: !!params.fees && !canUserAutomaticallyUpdate, // if fees were provided go straight to manual review step,
        _oneTimeInvestmentId: params.oneTimeInvestmentId,
        _recurringInvestmentId: params.recurringInvestmentId,
        _actions: params.actions,
        accountType: account.type as AccountType,
        accountId: account?.id || '',
      }}
    >
      <BlackLayout />
    </KYCFailedFormFlowProvider>
  );
};

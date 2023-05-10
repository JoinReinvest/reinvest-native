import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView, WebViewMessageEvent } from 'react-native-webview';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateBankAccount } from 'reinvest-app-common/src/services/queries/createBankAccount';
import { useFulfillBankAccount } from 'reinvest-app-common/src/services/queries/fulfillBankAccount';
import { mapPlaidDataForApi } from 'reinvest-app-common/src/utilities/plaid';

import { getApiClient } from '../../../api/getApiClient';
import { Box } from '../../../components/Containers/Box/Box';
import { ErrorMessagesHandler } from '../../../components/ErrorMessagesHandler';
import { Loader } from '../../../components/Loader';
import { StyledText } from '../../../components/typography/StyledText';
import { isIOS } from '../../../constants/common';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { currentAccount, useAtom } from '../../../store/atoms';
import { Identifiers } from '../identifiers';
import { InvestFormFields } from '../types';
import { useInvestFlow } from './index';

const jsInjection = `try {
    function loadPageEnd() {
      const plaidHandler = (event) => {
      console.log(event)
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        if ('plaidAccountDetails' in data && data.plaidAccountDetails.length) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ data }));
        }
      };
          window.ReactNativeWebView.postMessage(JSON.stringify({ info: "INJECTED" }));

      window.addEventListener('message', plaidHandler);
    }
    window.onLoad = loadPageEnd();
  } catch (e) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ error: JSON.stringify(e) }));
    true;
  }
  true;`;

export const Plaid: StepParams<InvestFormFields> = {
  identifier: Identifiers.PLAID,
  doesMeetConditionFields: fields => {
    return !fields.bankAccount;
  },

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<InvestFormFields>) => {
    const [isLoading, setIsLoading] = useState(false);
    const [account] = useAtom(currentAccount);
    const { mutateAsync: createBankAccount, error: createAccountError } = useCreateBankAccount(getApiClient);
    const { mutate: fulfillBankAccountMutation, isSuccess: isFulfillBankAccountSuccess, error: fulFillError } = useFulfillBankAccount(getApiClient);
    const { resetStoreFields } = useInvestFlow();
    const { replace } = useLogInNavigation();

    const [uri, setUri] = useState<string>('');
    const [plaidError, setPlaidError] = useState<string | undefined>();
    const { top } = useSafeAreaInsets();

    const ref = useRef<WebView>(null);

    const setPlaidUri = useCallback(async () => {
      try {
        const result = await createBankAccount({ accountId: account.id || '' });
        setUri(result?.link || '');
      } finally {
        setIsLoading(false);
      }
    }, [account.id, createBankAccount]);

    const resetAndClose = async () => {
      await resetStoreFields();
      replace(Screens.BottomNavigator, { screen: Screens.Dashboard });
    };

    useEffect(() => {
      setPlaidUri();
    }, [account.id, createBankAccount, setPlaidUri]);

    useEffect(() => {
      if (isFulfillBankAccountSuccess) {
        moveToNextStep();
      }
    }, [isFulfillBankAccountSuccess, moveToNextStep]);

    if (isLoading || isFulfillBankAccountSuccess || !uri) {
      return (
        <Box
          fw
          fh
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Loader />
        </Box>
      );
    }

    const handleMessage = async (event: WebViewMessageEvent) => {
      if (account.id) {
        const { data, error } = await JSON.parse(event.nativeEvent.data);

        if (data) {
          const plaidDataForApi = mapPlaidDataForApi(data.plaidAccountDetails[0]);
          await updateStoreFields({
            bankAccount: {
              accountNumber: plaidDataForApi.accountNumber.slice(-4).padStart(plaidDataForApi.accountNumber.length, '*'),
              accountType: plaidDataForApi.accountType,
            },
            addingAccount: true,
          });
          await fulfillBankAccountMutation({ accountId: account.id, input: plaidDataForApi });
        }

        if (error) {
          return setPlaidError('We have problem with getting your account details');
        }
      }
    };

    const error = plaidError || fulFillError || createAccountError;

    return (
      <Box
        flex={1}
        fw
        style={{ paddingTop: top }}
      >
        {error ? (
          <Box
            px="default"
            fw
            fh
            justifyContent="center"
            alignItems="center"
          >
            <ErrorMessagesHandler error={error} />
            <StyledText
              variant={'link'}
              onPress={resetAndClose}
            >
              Close
            </StyledText>
          </Box>
        ) : (
          <WebView
            originWhitelist={['*']}
            onLoad={() => ref.current?.injectJavaScript(jsInjection)}
            ref={ref}
            scalesPageToFit={isIOS}
            javaScriptEnabled
            javaScriptCanOpenWindowsAutomatically={true}
            onLoadEnd={() => setIsLoading(false)}
            onMessage={handleMessage}
            onNavigationStateChange={e => {
              if (e.title === 'Redirecting…') {
                setTimeout(() => ref.current?.goBack(), 300);
              }
            }}
            source={{
              uri,
            }}
          />
        )}
      </Box>
    );
  },
};

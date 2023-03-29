import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Button } from '../../../components/Button';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { StatusCircle } from '../../../components/StatusCircle';
import { useAuth } from '../../../providers/AuthProvider';
import { allRequiredFieldsExists } from '../../../utils/formValidator';
import { Identifiers } from '../identifiers';
import { RegisterFormFields } from '../types';
import { styles } from './styles';

export const StepRegistrationValidation: StepParams<RegisterFormFields> = {
  identifier: Identifiers.FLOW_COMPLETION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<RegisterFormFields>) => {
    const { actions } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>();

    const onPress = async () => {
      setIsLoading(true);
      try {
        await actions.signIn(storeFields.email, storeFields.password);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      (async () => {
        try {
          await actions.confirmSignUp(storeFields.email, storeFields.authenticationCode);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setIsLoading(false);
        }
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <View style={[styles.wrapper, styles.fw]}>
        {isLoading ? (
          <View style={styles.flex}>
            <FormTitle
              dark
              headline={'Verifying Account Information'}
            />
            <ActivityIndicator
              size={'large'}
              style={styles.flex}
            />
          </View>
        ) : (
          <>
            <StatusCircle
              title={error || 'Your login credentials were successfully created'}
              variant={error ? 'error' : undefined}
            />
            <Button
              isLoading={isLoading}
              onPress={onPress}
              disabled={isLoading || !!error}
            >
              Continue
            </Button>
          </>
        )}
      </View>
    );
  },
};

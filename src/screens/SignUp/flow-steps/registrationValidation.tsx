import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow/interfaces';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { StatusCircle } from '../../../components/StatusCircle';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useLogOutNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { useAuth } from '../../../providers/AuthProvider';
import { allRequiredFieldsExists } from '../../../utils/formValidator';
import { styles } from '../flow-steps/styles';
import { Identifiers } from '../identifiers';
import { RegisterFormFields } from '../types';

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
    const [displayLoginLink, setDisplayLoginLink] = useState(false);
    const navigation = useLogOutNavigation();
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

    const goToSignIn = () => navigation.navigate(Screens.SignIn);

    useEffect(() => {
      const confirmEmail = async () => {
        try {
          await actions.confirmSignUp(storeFields.email, storeFields.authenticationCode);
        } catch (err) {
          const error = err as Error;

          if (error.message.includes('Current status is CONFIRMED')) {
            error.message = 'The user with this email is already registered.';
            setDisplayLoginLink(true);
          }

          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      confirmEmail();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [storeFields.authenticationCode, storeFields.email]);

    return (
      <View style={[styles.wrapper, styles.fw, styles.flex]}>
        {isLoading ? (
          <View style={styles.flex}>
            <FormTitle
              dark
              headline="Verifying Account Information"
            />
            <ActivityIndicator
              size="large"
              style={styles.flex}
            />
          </View>
        ) : (
          <>
            <StatusCircle
              title={error ? error : 'Your login credentials were successfully created'}
              variant={error ? 'error' : undefined}
            >
              {displayLoginLink && (
                <Box mt="16">
                  <StyledText
                    variant="link"
                    color={palette.frostGreen}
                    onPress={goToSignIn}
                  >
                    Go to sign in
                  </StyledText>
                </Box>
              )}
            </StatusCircle>
            <View
              key="buttons_section"
              style={styles.buttonsSection}
            >
              <Button
                isLoading={isLoading}
                onPress={onPress}
                disabled={isLoading || !!error}
              >
                Continue
              </Button>
            </View>
          </>
        )}
      </View>
    );
  },
};

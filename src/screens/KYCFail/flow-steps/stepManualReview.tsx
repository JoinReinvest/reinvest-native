import { Alert } from 'react-native';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';
import { ActionName } from 'reinvest-app-common/src/types/graphql';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { FormTitle } from '../../../components/Forms/FormTitle';
import { PaddedScrollView } from '../../../components/PaddedScrollView';
import { StatusCircle } from '../../../components/StatusCircle';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { Identifiers } from '../identifiers';
import { KYCFailedFormFields } from '../types';

export const StepManualReview: StepParams<KYCFailedFormFields> = {
  identifier: Identifiers.MANUAL_REVIEW,

  doesMeetConditionFields({ _actions }) {
    return !!_actions?.find(({ action }) => action === ActionName.RequireManualReview);
  },

  Component: () => {
    const navigation = useLogInNavigation();

    const handleSubmit = () => {
      Alert.alert('Submit for manual review');
    };

    return (
      <>
        <PaddedScrollView>
          <Box pt="24">
            <StatusCircle variant="alert" />
          </Box>
          <FormTitle
            dark
            headline="Notice: $10 fee for manual verification"
            description="As your verification has failed twice, REINVEST needs to run a manual verification."
          />
        </PaddedScrollView>
        <Box
          fw
          px="default"
          pb="24"
        >
          <Button onPress={handleSubmit}>Submit</Button>
          <Button
            variant="outlined"
            onPress={() => navigation.navigate(Screens.Dashboard)}
          >
            Cancel
          </Button>
        </Box>
      </>
    );
  },
};

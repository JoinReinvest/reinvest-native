import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { Button } from '../../../components/Button';
import { Box } from '../../../components/Containers/Box/Box';
import { StatusCircle } from '../../../components/StatusCircle';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepConfirmation: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.INVESTING_PROMPT,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Component: ({ storeFields }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const { replace } = useLogInNavigation();
    const onSubmit = () => {
      replace(Screens.Investing);
    };

    return (
      <>
        <Box
          px="default"
          flex={1}
          pt={'24'}
        >
          <StyledText variant="h5">
            Let&apos;s build generational wealth!{'\n'}
            {'\n'}Make your first investment to set up your beneficiary&apos;s account and get started. 💰💪
          </StyledText>
          <StatusCircle variant={'success'} />
        </Box>
        <Box
          fw
          px="default"
        >
          <Button onPress={onSubmit}>Invest</Button>
        </Box>
      </>
    );
  },
};

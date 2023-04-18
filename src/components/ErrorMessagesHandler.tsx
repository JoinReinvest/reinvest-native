import { getMessages } from 'reinvest-app-common/src/services/form-flow/utilities/getMessages';
import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

import { FormMessage } from './Forms/FormMessage';

export const ErrorMessagesHandler = ({ error }: { error: ErrorResponse }) => {
  return (
    <>
      {getMessages(error).map(message => (
        <FormMessage
          variant="error"
          message={message || 'Internal error'}
          key={message}
        />
      ))}
    </>
  );
};

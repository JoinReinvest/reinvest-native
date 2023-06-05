import { NavigationIdentifiers } from '../../constants/navigationLinks';
import { DividendsReinvesting } from './Screens/DividendsReinvesting';
import { InvestmentHistory } from './Screens/InvestmentHistory';
import { ManageBankAccount } from './Screens/ManageBankAccount';
import { UpdateEmail } from './Screens/UpdateEmail';
import { UpdateName } from './Screens/UpdateName';

export const SCREENS_CONTENT: Partial<{ [key in NavigationIdentifiers]: JSX.Element }> = {
  INVESTMENT_HISTORY: <InvestmentHistory />,
  DIVIDEND_REINVESTING: <DividendsReinvesting />,
  BANK_ACCOUNT: <ManageBankAccount />,
  EMAIL_ADDRESS: <UpdateEmail />,
  NAME: <UpdateName />,
};

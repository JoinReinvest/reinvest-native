import { NavigationIdentifiers } from '../../constants/navigationLinks';
import { DividendsReinvesting } from './Screens/DividendsReinvesting';
import { InvestmentHistory } from './Screens/InvestmentHistory';
import { Name } from './Screens/Name';

//TODO: Add the rest of screens when implemented
export const SCREENS_CONTENT: Partial<{ [key in NavigationIdentifiers]: JSX.Element }> = {
  INVESTMENT_HISTORY: <InvestmentHistory />,
  DIVIDEND_REINVESTING: <DividendsReinvesting />,
  NAME: <Name />,
};

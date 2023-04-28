import { NavigationIdentifiers } from '../../constants/navigationLinks';
import { InvestmentHistory } from './Screens/InvestmentHistory';

//TODO: Add the rest of screens when implemented
export const SCREENS_CONTENT: Partial<{ [key in NavigationIdentifiers]: JSX.Element }> = {
  INVESTMENT_HISTORY: <InvestmentHistory />,
};

import type { ReactNode } from 'react';

import { NavigationIdentifiers } from './navigationLinks';
import { DividendsReinvesting } from './Screens/DividendsReinvesting';
import { InvestmentHistory } from './Screens/InvestmentHistory';
import { ManageBankAccount } from './Screens/ManageBankAccount';
import { RecurringInvestments } from './Screens/RecurringInvestments';
import { RemoveBeneficiary } from './Screens/RemoveBeneficiary';
import { Address } from './Screens/UpdateAddress';
import UpdateBeneficiaryName from './Screens/UpdateBeneficiaryName';
import { UpdateCompanyDocuments } from './Screens/UpdateCompanyDocuments';
import { UpdateEmail } from './Screens/UpdateEmail';
import { UpdateName } from './Screens/UpdateName';
import { UpdatePassword } from './Screens/UpdatePassword';
import { WithdrawalFunds } from './Screens/WithdrawalFunds';

export const SCREENS_CONTENT: Partial<{ [key in NavigationIdentifiers]: ReactNode }> = {
  INVESTMENT_HISTORY: <InvestmentHistory />,
  DIVIDEND_REINVESTING: <DividendsReinvesting />,
  BANK_ACCOUNT: <ManageBankAccount />,
  EMAIL_ADDRESS: <UpdateEmail />,
  ADDRESS: <Address />,
  PROFILE_NAME: <UpdateName />,
  REMOVE_BENEFICIARY: <RemoveBeneficiary />,
  CHANGE_PASSWORD: <UpdatePassword />,
  COMPANY_DOCUMENTS: <UpdateCompanyDocuments />,
  WITHDRAW_FUNDS: <WithdrawalFunds />,
  RECURRING_INVESTMENT: <RecurringInvestments />,
  BENEFICIARY_NAME: <UpdateBeneficiaryName />,
};

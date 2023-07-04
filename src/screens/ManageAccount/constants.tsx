import React, { ReactNode } from 'react';

import { NavigationIdentifiers } from './navigationLinks';
import { AccountActivity } from './Screens/AccountActivity';
import { DividendsReinvesting } from './Screens/DividendsReinvesting';
import { InvestmentHistory } from './Screens/InvestmentHistory';
import { ManageBankAccount } from './Screens/ManageBankAccount';
import { RecurringInvestments } from './Screens/RecurringInvestments';
import { RemoveBeneficiary } from './Screens/RemoveBeneficiary';
import { Address } from './Screens/UpdateAddress';
import UpdateBeneficiaryName from './Screens/UpdateBeneficiaryName';
import { UpdateCompanyAddress } from './Screens/UpdateCompanyAddress';
import { UpdateCompanyDocuments } from './Screens/UpdateCompanyDocuments';
import { UpdateDomicile } from './Screens/UpdateDomicile';
import { UpdateEmail } from './Screens/UpdateEmail';
import { UpdateEmploymentDetails } from './Screens/UpdateEmploymentDetails';
import { UpdateExperience } from './Screens/UpdateExperience';
import { UpdateIncomeAndNetWorth } from './Screens/UpdateIncomeAndNetWorth';
import { UpdateName } from './Screens/UpdateName';
import { UpdatePassword } from './Screens/UpdatePassword';
import { UpdatePhoneNumber } from './Screens/UpdatePhoneNumber';
import { UpdateProfilePicture } from './Screens/UpdateProfilePicture';
import { WithdrawalFunds } from './Screens/WithdrawalFunds';

export const SCREENS_CONTENT: Partial<{ [key in NavigationIdentifiers]: ReactNode }> = {
  INVESTMENT_HISTORY: <InvestmentHistory />,
  DIVIDEND_REINVESTING: <DividendsReinvesting />,
  BANK_ACCOUNT: <ManageBankAccount />,
  EMAIL_ADDRESS: <UpdateEmail />,
  PROFILE_ADDRESS: <Address />,
  PROFILE_NAME: <UpdateName />,
  REMOVE_BENEFICIARY: <RemoveBeneficiary />,
  CHANGE_PASSWORD: <UpdatePassword />,
  COMPANY_DOCUMENTS: <UpdateCompanyDocuments />,
  WITHDRAW_FUNDS: <WithdrawalFunds />,
  RECURRING_INVESTMENT: <RecurringInvestments />,
  BENEFICIARY_NAME: <UpdateBeneficiaryName />,
  PHONE_NUMBER: <UpdatePhoneNumber />,
  ACCOUNT_ACTIVITY: <AccountActivity />,
  NET_INCOME_AND_WORTH: <UpdateIncomeAndNetWorth />,
  EXPERIENCE_LEVEL: <UpdateExperience />,
  PROFILE_PICTURE: <UpdateProfilePicture />,
  DOMICILE: <UpdateDomicile />,
  COMPANY_ADDRESS: <UpdateCompanyAddress />,
  EMPLOYMENT_DETAILS: <UpdateEmploymentDetails />,
};

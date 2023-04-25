import { AccountSummaryProps } from '../AccountSummary';

export interface SwitchAccountItemProps extends Pick<AccountSummaryProps, 'firstName' | 'lastName' | 'avatarUri' | 'accountId' | 'accountType'> {
  onPress: (selectedAccountId: string) => void;
  selected?: boolean;
}

export interface SwitchAccountsListProps {
  accounts: Omit<SwitchAccountItemProps, 'onPress' | 'selected'>[];
  onSelect: (selectedAccountId: string) => void;
}

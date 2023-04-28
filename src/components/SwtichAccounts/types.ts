import { AccountSummaryProps } from '../AccountSummary';

export interface SwitchAccountItemProps extends Pick<AccountSummaryProps, 'firstName' | 'lastName' | 'avatar' | 'id' | 'type' | 'label'> {
  onPress: (selectedAccountId: string) => void;
  selected?: boolean;
}

export interface SwitchAccountsListProps extends Partial<AccountSummaryProps> {
  accounts: Omit<SwitchAccountItemProps, 'onPress' | 'selected'>[];
  onSelect: (selectedAccountId: string) => void;
  value?: string;
}

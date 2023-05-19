export interface Props {
  setAmount: (amount: string) => void;
  amount?: number;
  bankAccount?: string;
  error?: string;
}

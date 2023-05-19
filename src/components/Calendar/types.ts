import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

export interface CalendarProps {
  autoSelectionPeriod: RecurringInvestmentFrequency;
  onSelect: (dates: { recurringDates: string[]; startingDate: string }) => void;
}

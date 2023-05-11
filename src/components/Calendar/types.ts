export type Period = 'WEEKLY' | 'BI-WEEKLY' | 'MONTHLY' | 'QUARTERLY';

export interface CalendarProps {
  autoSelectionPeriod: Period;
  onSelect: (dates: { recurringDates: string[]; startingDate: string }) => void;
}

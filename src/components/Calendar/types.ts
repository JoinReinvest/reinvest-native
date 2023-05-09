import { Period } from '../../types/period';

export interface CalendarProps {
  autoSelectionPeriod: Period;
  onSelect: (dates: { recurringDates: string[]; startingDate: string }) => void;
}

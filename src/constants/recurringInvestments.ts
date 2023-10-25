import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';

export const RECURRING_INVESTMENT_SCHEDULE_SUBTITLES = new Map<RecurringInvestmentFrequency, string>([
  [RecurringInvestmentFrequency.Weekly, 'This will repeat on the same day each week.'],
  [RecurringInvestmentFrequency.BiWeekly, 'This will repeat on the same day bi-weekly.'],
  [RecurringInvestmentFrequency.Monthly, 'This will repeat on the same day every month.'],
  [RecurringInvestmentFrequency.Quarterly, 'This will repeat on the same day quarterly.'],
]);

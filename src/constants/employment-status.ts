import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

export const EMPLOYMENT_STATUSES = [
  {
    label: 'Employed',
    value: EmploymentStatus.Employed,
  },
  {
    label: 'Unemployed',
    value: EmploymentStatus.Unemployed,
  },
  {
    label: 'Retired',
    value: EmploymentStatus.Retired,
  },
  {
    label: 'Student',
    value: EmploymentStatus.Student,
  },
];

export type EmploymentStatusesValues = (typeof EMPLOYMENT_STATUSES)[number]['value'];

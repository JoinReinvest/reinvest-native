import { Employer, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

export interface UpdateEmploymentDetailsFormFields {
  employer?: Employer;
  employmentStatus?: EmploymentStatus;
}

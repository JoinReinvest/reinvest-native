import { Experience } from 'reinvest-app-common/src/types/graphql';

export interface UpdateExperienceFormFields {
  originalExperience: Experience | null;
  updatedExperience: Experience | null;
}

import { Experience } from 'reinvest-app-common/src/types/graphql';

export const EXPERIENCE_LABELS: { [key in Experience]: string } = {
  NO_EXPERIENCE: 'No Experience',
  SOME_EXPERIENCE: 'Some Experience',
  VERY_EXPERIENCED: 'Very Experienced',
  EXPERT: 'Expert',
};

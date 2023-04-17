import { RESIDENCY_STATUS_LABELS } from 'reinvest-app-common/src/constants/residenty-status';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';

import { EMPTY_APPLICANT_FORM } from '../../constants/applicants';
import { Applicant } from './types';

type DomicileLabel = (typeof RESIDENCY_STATUS_LABELS)[number];

export const mapDomicileTypeToDomicileLabel = (domicileType: DomicileType | undefined): DomicileLabel => {
  switch (domicileType) {
    case DomicileType.Citizen:
      return 'US Citizen';
    case DomicileType.GreenCard:
      return 'Green Card';
    case DomicileType.Visa:
      return 'Visa';
    default:
      return 'US Citizen';
  }
};

export const mapDomicileLabelToDomicileType = (label: DomicileLabel | undefined) => {
  switch (label) {
    case 'US Citizen':
      return DomicileType.Citizen;
    case 'Visa':
      return DomicileType.Visa;
    case 'Green Card':
      return DomicileType.GreenCard;
    default:
      return undefined;
  }
};

export type ApplicantFormFields = Omit<Applicant, 'identificationDocument' | 'domicile'> & { domicile?: DomicileLabel };

type GetDefaultValuesForApplicantWithoutIdentification = (applicants: Applicant[], currentApplicantIndex: number | undefined) => ApplicantFormFields;

export const getDefaultValuesForApplicantWithoutIdentification: GetDefaultValuesForApplicantWithoutIdentification = (applicants, currentApplicantIndex) => {
  const hasApplicants = !!applicants.length;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const isEditingAnApplicant = hasAnIndex && currentApplicantIndex >= 0;

  if (hasApplicants && isEditingAnApplicant && hasAnIndex) {
    const applicant = applicants.at(currentApplicantIndex);

    if (applicant) {
      return { ...applicant, domicile: mapDomicileTypeToDomicileLabel(applicant.domicile), dateOfBirth: applicant.dateOfBirth?.replaceAll('-', '/') };
    }
  }

  return EMPTY_APPLICANT_FORM;
};

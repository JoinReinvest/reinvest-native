import { STAKEHOLDER_RESIDENCY_STATUS_LABELS } from 'reinvest-app-common/src/constants/residenty-status';
import { SimplifiedDomicileType } from 'reinvest-app-common/src/types/graphql';

import { EMPTY_APPLICANT_FORM } from '../../constants/applicants';
import { Applicant } from './types';

type DomicileLabel = (typeof STAKEHOLDER_RESIDENCY_STATUS_LABELS)[number];

export const mapDomicileTypeToDomicileLabel = (domicileType: SimplifiedDomicileType | undefined): DomicileLabel | undefined => {
  switch (domicileType) {
    case SimplifiedDomicileType.Citizen:
      return 'US Citizen';
    case SimplifiedDomicileType.Resident:
      return 'US Resident';
    default:
      return undefined;
  }
};

export const mapDomicileLabelToDomicileType = (label: DomicileLabel | undefined) => {
  switch (label) {
    case 'US Citizen':
      return SimplifiedDomicileType.Citizen;
    case 'US Resident':
      return SimplifiedDomicileType.Resident;
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

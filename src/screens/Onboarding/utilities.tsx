import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';
import { STAKEHOLDER_RESIDENCY_STATUS_LABELS } from 'reinvest-app-common/src/constants/residenty-status';
import { SimplifiedDomicileType } from 'reinvest-app-common/src/types/graphql';
import { formatDateFromApi } from 'reinvest-app-common/src/utilities/dates';

import { EMPTY_APPLICANT_FORM } from '../../constants/applicants';
import { INDUSTRIES_LABELS } from '../../constants/industries';
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

export const mapToIndustryLabel = (value: string | undefined): (typeof INDUSTRIES_LABELS)[number] | undefined => {
  if (!value) {
    return undefined;
  }

  const foundIndustry = INDUESTRIES_AS_OPTIONS.find(industry => industry.value === value);

  if (!foundIndustry) {
    return undefined;
  }

  return foundIndustry?.label as (typeof INDUSTRIES_LABELS)[number];
};

const checkIfLocalDate = (dateString: string) => /^\d{2}\/\d{2}\/\d{4}/i.test(dateString);

export type ApplicantFormFields = Omit<Applicant, 'domicile'> & { domicile?: DomicileLabel };

type GetDefaultValuesForApplicantWithoutIdentification = (applicants: Applicant[], currentApplicantIndex: number | undefined) => ApplicantFormFields;

export const getDefaultValuesForApplicantWithoutIdentification: GetDefaultValuesForApplicantWithoutIdentification = (applicants, currentApplicantIndex) => {
  const hasApplicants = !!applicants.length;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const isEditingAnApplicant = hasAnIndex && currentApplicantIndex >= 0;

  if (hasApplicants && isEditingAnApplicant && hasAnIndex) {
    const applicant = applicants.at(currentApplicantIndex);

    if (applicant) {
      return {
        ...applicant,
        domicile: mapDomicileTypeToDomicileLabel(applicant.domicile),
        dateOfBirth: applicant.dateOfBirth ? (checkIfLocalDate(applicant.dateOfBirth) ? applicant.dateOfBirth : formatDateFromApi(applicant.dateOfBirth)) : '',
      };
    }
  }

  return EMPTY_APPLICANT_FORM;
};

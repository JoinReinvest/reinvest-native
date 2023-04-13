import { DomicileType, DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { DomicileLabel } from '../../constants/domicile';
import { Applicant, OnboardingFormFields } from './types';

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

type GetDefaultValuesForApplicantWithoutIdentification = (
  fields: OnboardingFormFields,
  type: DraftAccountType.Corporate | DraftAccountType.Trust,
) => ApplicantFormFields;

export const getDefaultValuesForApplicantWithoutIdentification: GetDefaultValuesForApplicantWithoutIdentification = (
  fields,
  type = DraftAccountType.Corporate,
) => {
  const isRetrievingFieldsForCorporate = type === DraftAccountType.Corporate;

  const listOfApplicants = (isRetrievingFieldsForCorporate ? fields.companyMajorStakeholderApplicants : fields.trustTrusteesGrantorsOrProtectors) || [];
  const hasApplicants = !!listOfApplicants.length;
  const currentApplicant = isRetrievingFieldsForCorporate ? fields._currentCompanyMajorStakeholder : fields._currentTrustTrusteeGrantorOrProtector;
  const currentApplicantIndex = isRetrievingFieldsForCorporate ? currentApplicant?._index : currentApplicant?._index;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const hasAtLeastOneFieldFilled = Object.values(currentApplicant || {}).some(Boolean);
  const isEditingAnApplicant = isRetrievingFieldsForCorporate
    ? fields._isEditingCompanyMajorStakeholderApplicant
    : fields._isEditingTrustTrusteeGrantorOrProtector;

  if (hasApplicants && isEditingAnApplicant && hasAnIndex) {
    const applicant = listOfApplicants.at(currentApplicantIndex);

    if (applicant) {
      return { ...applicant, domicile: mapDomicileTypeToDomicileLabel(applicant.domicile), dateOfBirth: applicant.dateOfBirth?.replaceAll('-', '/') };
    }
  }

  if (!isEditingAnApplicant && hasAtLeastOneFieldFilled) {
    return { ...({ ...currentApplicant, domicile: mapDomicileTypeToDomicileLabel(currentApplicant?.domicile) } || {}) };
  }

  return {};
};

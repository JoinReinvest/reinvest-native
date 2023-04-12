import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { Applicant, OnboardingFormFields } from './types';

type GetDefaultValuesForApplicantWithoutIdentification = (
  fields: OnboardingFormFields,
  type: DraftAccountType.Corporate | DraftAccountType.Trust,
) => Omit<Applicant, 'identificationDocument'>;
export const getDefaultValuesForApplicantWithoutIdentification: GetDefaultValuesForApplicantWithoutIdentification = (
  fields,
  type = DraftAccountType.Corporate,
) => {
  const isRetrivingFieldsForCorporate = type === DraftAccountType.Corporate;

  const listOfApplicants = (isRetrivingFieldsForCorporate ? fields.companyMajorStakeholderApplicants : fields.trustTrusteesGrantorsOrProtectors) || [];
  const hasApplicants = !!listOfApplicants.length;
  const currentApplicant = isRetrivingFieldsForCorporate ? fields._currentCompanyMajorStakeholder : fields._currentTrustTrusteeGrantorOrProtector;
  const currentApplicantIndex = isRetrivingFieldsForCorporate ? currentApplicant?._index : currentApplicant?._index;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const hasAtLeastOneFieldFilled = Object.values(currentApplicant || {}).some(Boolean);
  const isEditingAnApplicant = isRetrivingFieldsForCorporate
    ? fields._isEditingCompanyMajorStakeholderApplicant
    : fields._isEditingTrustTrusteeGrantorOrProtector;

  if (hasApplicants && isEditingAnApplicant && hasAnIndex) {
    const applicant = listOfApplicants.at(currentApplicantIndex);

    if (applicant) {
      return { ...applicant };
    }
  }

  if (!isEditingAnApplicant && hasAtLeastOneFieldFilled) {
    return { ...(currentApplicant || {}) };
  }

  return {};
};

type GetDefaultIdentificationValueForApplicant = (
  fields: OnboardingFormFields,
  type: DraftAccountType.Corporate | DraftAccountType.Trust,
) => Pick<Applicant, 'identificationDocument'>;
export const getDefaultIdentificationValueForApplicant: GetDefaultIdentificationValueForApplicant = (fields, type) => {
  const isRetrivingFieldsForCorporate = type === DraftAccountType.Corporate;

  const listOfApplicants = (isRetrivingFieldsForCorporate ? fields.companyMajorStakeholderApplicants : fields.trustTrusteesGrantorsOrProtectors) || [];
  const hasApplicants = !!listOfApplicants.length;
  const currentApplicant = isRetrivingFieldsForCorporate ? fields._currentCompanyMajorStakeholder : fields._currentTrustTrusteeGrantorOrProtector;
  const currentApplicantIndex = isRetrivingFieldsForCorporate ? currentApplicant?._index : currentApplicant?._index;
  const hasAnIndex = currentApplicantIndex !== undefined;
  const isEditingAnApplicant = isRetrivingFieldsForCorporate
    ? fields._isEditingCompanyMajorStakeholderApplicant
    : fields._isEditingTrustTrusteeGrantorOrProtector;

  if (hasApplicants && !!isEditingAnApplicant && hasAnIndex) {
    const applicant = listOfApplicants.at(currentApplicantIndex);
    const hasIdentificationDocument = !!applicant?.identificationDocument;

    if (hasIdentificationDocument) {
      return { identificationDocument: applicant.identificationDocument };
    }
  }

  return { identificationDocument: undefined };
};

// export const generateApplicantListItem = (corporationLegalName: string, applicant: IndexedSchema<Applicant>, onIconClick: () => void) => {
//   const key = `${corporationLegalName}-${applicant._index}`;
//   const applicantFullName = `${applicant.firstName} ${applicant.lastName}`;

//   return (
//     <li
//       key={key}
//       className="flex items-center justify-between"
//     >
//       <Typography variant="paragraph-emphasized">{applicantFullName}</Typography>

//       <Icon
//         i
//         className="cursor-pointer fill-green-frost-01"
//         onClick={onIconClick}
//       />
//     </li>
//   );
// };

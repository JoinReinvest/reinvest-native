import { Maybe } from 'graphql/jsutils/Maybe';
import { AddressInput, DocumentFileLinkInput, SimplifiedDomicileType, Stakeholder, StakeholderInput } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Applicant } from '../screens/Onboarding/types';

export const apiStakeholderToApplicant = (app: Maybe<Stakeholder>) =>
  ({
    ...app?.name,
    socialSecurityNumber: app?.ssn,
    residentialAddress: app?.address,
    domicile: app?.domicile?.type,
    dateOfBirth: app?.dateOfBirth?.dateOfBirth,
    idScan: app?.idScan,
    id: app?.id,
  } as Applicant);

export const mapApplicantToApiStakeholder = (applicant: Applicant): StakeholderInput => ({
  name: {
    firstName: applicant.firstName,
    lastName: applicant.lastName,
    middleName: applicant.middleName,
  },
  dateOfBirth: {
    dateOfBirth: applicant.dateOfBirth ? formatDate(applicant.dateOfBirth, 'API', { currentFormat: 'DEFAULT' }) : '',
  },
  address: { ...applicant.residentialAddress, country: 'USA' } as AddressInput,
  idScan: applicant.idScan as DocumentFileLinkInput[],
  domicile: {
    type: applicant.domicile || SimplifiedDomicileType.Citizen,
  },
});

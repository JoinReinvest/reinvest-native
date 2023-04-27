import { Maybe } from 'graphql/jsutils/Maybe';
import type { Stakeholder } from 'reinvest-app-common/src/types/graphql';

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

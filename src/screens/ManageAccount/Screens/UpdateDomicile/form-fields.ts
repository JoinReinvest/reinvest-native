import { Domicile } from 'reinvest-app-common/src/types/graphql';

export type UpdateDomicileFormFields = Omit<Domicile, '__typename'>;

import { Domicile, DomicileType } from 'reinvest-app-common/src/types/graphql';

export interface UpdateDomicileFormFields extends Omit<Domicile, '__typename'> {
  originalType: DomicileType;
  originalBirthCountry?: string;
  originalCitizenshipCountry?: string;
  originalVisaType?: string;
}

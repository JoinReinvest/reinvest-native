import { CompanyTickerSymbol } from '../../../Onboarding/types';

export interface UpdateCompliancesFormFields {
  companyTickerSymbols: CompanyTickerSymbol[];
  compliances: {
    isAssociatedWithFinra: boolean;
    isAssociatedWithPubliclyTradedCompany: boolean;
    isSeniorPoliticalFigure: boolean;
  };
  finraInstitution: string;
  seniorPoliticalFigure: string;
}

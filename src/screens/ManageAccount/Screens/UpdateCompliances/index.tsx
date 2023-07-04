import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { Statement } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../api/getApiClient';
import { CompanyTickerSymbol } from '../../../Onboarding/types';
import { UpdateCompliancesFlowProvider } from './steps';
import { UpdateCompliancesLayout } from './UpdateCompliancesLayout';

interface CompliancesReducer {
  compliances: {
    isAssociatedWithFinra: boolean;
    isAssociatedWithPubliclyTradedCompany: boolean;
    isSeniorPoliticalFigure: boolean;
  };
  companyTickerSymbols?: { symbol: string }[];
  finraInstitution?: string;
  seniorPoliticalFigure?: string;
}

export const UpdateCompliances = () => {
  const { data: userProfile } = useGetUserProfile(getApiClient);

  return (
    <UpdateCompliancesFlowProvider
      initialStoreFields={{
        ...parseStatementsToCompliance((userProfile?.details?.statements ?? []) as Statement[]),
      }}
    >
      <UpdateCompliancesLayout />
    </UpdateCompliancesFlowProvider>
  );
};

const complianceMapper = {
  FINRAMember: 'isAssociatedWithFinra',
  TradingCompanyStakeholder: 'isAssociatedWithPubliclyTradedCompany',
  Politician: 'isSeniorPoliticalFigure',
} as const;

type ComplianceType = keyof typeof complianceMapper;

const parseStatementsToCompliance = (statements?: Statement[]) => {
  if (statements) {
    return statements?.reduce?.(
      (acc, el) => {
        if (el?.type && el.type in complianceMapper) {
          const key = complianceMapper[el.type as ComplianceType];
          const value: Omit<CompliancesReducer, 'compliances'> = {};

          if (key === complianceMapper.Politician) {
            value.seniorPoliticalFigure = el.details?.[0] || '';
          }

          if (key === complianceMapper.FINRAMember) {
            value.finraInstitution = el.details?.[0] || '';
          }

          if (key === complianceMapper.TradingCompanyStakeholder) {
            value.companyTickerSymbols = el.details?.map(ticker => ({
              symbol: ticker as string,
            }));
          }

          return { ...acc, ...value, compliances: { ...acc.compliances, [key]: !!el.details?.[0] } };
        }

        return acc;
      },
      {
        finraInstitution: '',
        seniorPoliticalFigure: '',
        companyTickerSymbols: [] as CompanyTickerSymbol[],
        compliances: {
          isAssociatedWithFinra: false,
          isAssociatedWithPubliclyTradedCompany: false,
          isSeniorPoliticalFigure: false,
        },
      },
    );
  }

  return {
    finraInstitution: '',
    seniorPoliticalFigure: '',
    companyTickerSymbols: [] as CompanyTickerSymbol[],
    compliances: {
      isAssociatedWithFinra: false,
      isAssociatedWithPubliclyTradedCompany: false,
      isSeniorPoliticalFigure: false,
    },
  };
};

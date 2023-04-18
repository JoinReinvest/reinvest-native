import React from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { AccreditedInvestorStatement, ProfileDetails, Statement } from 'reinvest-app-common/src/types/graphql';
import { formatDateFromApi } from 'reinvest-app-common/src/utilities/dates';

import { getApiClient } from '../../api/getApiClient';
import { StyledText } from '../../components/typography/StyledText';
import { BlackLayout } from './BlackLayout';
import { onBoardingFormFieldsInitialState, OnboardingFormFlowProvider } from './flow-steps';
import { Domicile, IdentificationDocuments } from './types';

export const Onboarding = () => {
  const { data, isLoading } = useGetUserProfile(getApiClient);

  return isLoading ? (
    <StyledText>...Loading</StyledText>
  ) : (
    <OnboardingFormFlowProvider
      initialStoreFields={{
        ...onBoardingFormFieldsInitialState,
        ...getPreFiledValues(data?.details ? data?.details : undefined),
        ...{ name: { firstName: data?.details?.firstName || '', lastName: data?.details?.lastName || '', middleName: data?.details?.middleName || '' } },
      }}
    >
      <BlackLayout />
    </OnboardingFormFlowProvider>
  );
};

const complianceMapper = {
  FINRAMember: 'isAssociatedWithFinra',
  TradingCompanyStakeholder: 'isAssociatedWithPubliclyTradedCompany',
  Politician: 'isSeniorPoliticalFigure',
  AccreditedInvestor: 'isAccreditedInvestor',
} as const;

type ComplianceType = keyof typeof complianceMapper;

interface CompliancesReducer {
  compliances: {
    isAssociatedWithFinra: boolean;
    isAssociatedWithPubliclyTradedCompany: boolean;
    isSeniorPoliticalFigure: boolean;
  };
  companyTickerSymbols?: { symbol: string }[];
  finraInstitution?: string;
  isAccreditedInvestor?: boolean;
  seniorPoliticalFigure?: string;
}

const parseStatementsToCompliance = (statements?: Statement[]) => {
  if (statements) {
    const values = statements?.reduce?.(
      (acc, el) => {
        if (el?.type && el.type in complianceMapper) {
          const key = complianceMapper[el.type as ComplianceType];
          const value: Omit<CompliancesReducer, 'compliances'> = {};

          if (key === complianceMapper.Politician) {
            value.seniorPoliticalFigure = el.details?.[0] || '';
          }

          if (key === complianceMapper.AccreditedInvestor) {
            value.isAccreditedInvestor = el.details?.[0] === AccreditedInvestorStatement.IAmAnAccreditedInvestor;
          }

          if (key === complianceMapper.FINRAMember) {
            value.finraInstitution = el.details?.[0] || '';
          }

          if (key === complianceMapper.TradingCompanyStakeholder) {
            value.companyTickerSymbols = el.details?.map(ticker => ({
              symbol: ticker as string,
            }));
          }

          return { ...acc, ...value, compliances: { ...acc.compliances, [key]: true } };
        }

        return acc;
      },
      {
        finraInstitution: '',
        seniorPoliticalFigure: '',

        compliances: {
          isAssociatedWithFinra: false,
          isAssociatedWithPubliclyTradedCompany: false,
          isSeniorPoliticalFigure: false,
          isAccreditedInvestor: false,
        },
      },
    );

    return values;
  }

  return { compliances: onBoardingFormFieldsInitialState.compliances };
};

const getPreFiledValues = (details?: ProfileDetails) => {
  if (details) {
    return {
      experience: details.experience,
      identificationDocument: (details?.idScan as IdentificationDocuments) || onBoardingFormFieldsInitialState.identificationDocument,
      dateOfBirth: details?.dateOfBirth ? formatDateFromApi(details?.dateOfBirth) : '',
      domicile: details?.domicile as Domicile,
      citizenshipCountry: details?.domicile?.citizenshipCountry || '',
      birthCountry: details?.domicile?.birthCountry || '',
      residency: details?.domicile?.type || null,
      ssn: details?.ssn || undefined,
      ...parseStatementsToCompliance(details.statements as Statement[]),
      name: { firstName: details?.firstName || '', lastName: details?.lastName || '', middleName: details?.middleName || '' },
      permanentAddress: details.address,
    };
  }

  return {};
};

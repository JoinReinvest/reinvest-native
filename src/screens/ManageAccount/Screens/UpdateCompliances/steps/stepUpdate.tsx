import React, { useEffect, useMemo } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useUpdateProfile } from 'reinvest-app-common/src/services/queries/updateProfile';
import { StatementInput, StatementType } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Loader } from '../../../../../components/Loader';
import { UpdateSuccess } from '../../../../../components/Modals/ModalContent/UpdateSuccess';
import { HeaderWithLogo } from '../../../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../../../../components/typography/StyledText';
import { palette } from '../../../../../constants/theme';
import { useLogInNavigation } from '../../../../../navigation/hooks';
import Screens from '../../../../../navigation/screens';
import { useDialog } from '../../../../../providers/DialogProvider';
import { UpdateCompliancesFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepUpdate: StepParams<UpdateCompliancesFormFields> = {
  identifier: Identifiers.UPDATE,

  Component: ({
    storeFields: {
      finraInstitution,
      companyTickerSymbols,
      seniorPoliticalFigure,
      compliances: { isAssociatedWithFinra, isAssociatedWithPubliclyTradedCompany, isSeniorPoliticalFigure },
    },
  }: StepComponentProps<UpdateCompliancesFormFields>) => {
    const { mutateAsync, status } = useUpdateProfile(getApiClient);
    const { refetch } = useGetUserProfile(getApiClient);
    const { openDialog } = useDialog();
    const { navigate, goBack } = useLogInNavigation();

    const statements = useMemo(() => {
      const statements: StatementInput[] = [];

      if (isAssociatedWithFinra) {
        statements.push({ type: StatementType.FinraMember, forFINRA: { name: finraInstitution } });
      } else {
        statements.push({ type: StatementType.FinraMember, forFINRA: { name: '' } });
      }

      if (isAssociatedWithPubliclyTradedCompany) {
        statements.push({ type: StatementType.TradingCompanyStakeholder, forStakeholder: { tickerSymbols: companyTickerSymbols.map(({ symbol }) => symbol) } });
      } else {
        statements.push({ type: StatementType.TradingCompanyStakeholder, forStakeholder: { tickerSymbols: [] } });
      }

      if (isSeniorPoliticalFigure) {
        statements.push({ type: StatementType.Politician, forPolitician: { description: seniorPoliticalFigure } });
      } else {
        statements.push({ type: StatementType.Politician, forPolitician: { description: '' } });
      }

      return statements;
    }, [companyTickerSymbols, finraInstitution, isAssociatedWithFinra, isAssociatedWithPubliclyTradedCompany, isSeniorPoliticalFigure, seniorPoliticalFigure]);

    useEffect(() => {
      (async () => {
        await mutateAsync({ input: { statements } });
      })();
    }, [mutateAsync, statements]);

    useEffect(() => {
      if (status === 'success') {
        (async () => {
          await refetch();
          openDialog(
            <UpdateSuccess
              info="Updated Statements Successfully!"
              buttonLabel="Dashboard"
              onProceed={() => navigate(Screens.BottomNavigator, { screen: Screens.Dashboard })}
            />,
            { showLogo: true, header: <HeaderWithLogo onClose={goBack} /> },
          );
        })();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
      >
        {status === 'loading' && (
          <>
            <Loader
              size="xxl"
              color={palette.pureBlack}
            />
            <StyledText variant="h5">Updating statements</StyledText>
          </>
        )}
      </Box>
    );
  },
};

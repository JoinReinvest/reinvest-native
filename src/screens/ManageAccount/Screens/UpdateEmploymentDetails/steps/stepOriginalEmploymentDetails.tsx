import React from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';
import { Employer, EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../../../../api/getApiClient';
import { Button } from '../../../../../components/Button';
import { Box } from '../../../../../components/Containers/Box/Box';
import { Row } from '../../../../../components/Containers/Row';
import { Loader } from '../../../../../components/Loader';
import { StyledText } from '../../../../../components/typography/StyledText';
import { palette } from '../../../../../constants/theme';
import { UpdateEmploymentDetailsFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

const EMPLOYMENT_STATUS_LABELS: { [key in EmploymentStatus]: string } = {
  [EmploymentStatus.Unemployed]: 'Unemployed',
  [EmploymentStatus.Employed]: 'Employed',
  [EmploymentStatus.Student]: 'Student',
  [EmploymentStatus.Retired]: 'Retired',
};

export const StepOriginalEmploymentDetails: StepParams<UpdateEmploymentDetailsFormFields> = {
  identifier: Identifiers.ORIGINAL_EMPLOYMENT_DETAILS,

  Component: ({ moveToNextStep }: StepComponentProps<UpdateEmploymentDetailsFormFields>) => {
    const { data: individualAccount, isLoading } = useGetIndividualAccount(getApiClient);

    const employmentStatus = individualAccount?.details?.employmentStatus?.status as EmploymentStatus | undefined;
    const employer = individualAccount?.details?.employer as Employer | undefined;

    if (!employmentStatus || !employer || isLoading) {
      return (
        <Box
          fw
          flex={1}
        >
          <Loader color={palette.pureBlack} />
        </Box>
      );
    }

    const employerDetails = employer ? Object.values(employer) : [];
    const hasEmployer = employerDetails.some(value => !!value);
    const isEmployed = employmentStatus === EmploymentStatus.Employed;

    return (
      <>
        <Box
          fw
          flex={1}
          mt="24"
          px="default"
        >
          {employmentStatus && (
            <Box mb="24">
              <Row mb="16">
                <StyledText>Your Employment Status</StyledText>
              </Row>
              <StyledText variant="h6">{EMPLOYMENT_STATUS_LABELS[employmentStatus]}</StyledText>
            </Box>
          )}
          {hasEmployer && isEmployed && (
            <Box>
              <Row mb="16">
                <StyledText>Your Employment Details</StyledText>
              </Row>
              {employerDetails.map((detail, index) => (
                <StyledText
                  variant="h6"
                  key={`${detail ?? ''}-${index}`}
                >
                  {detail}
                </StyledText>
              ))}
            </Box>
          )}
        </Box>

        <Box
          fw
          px="default"
        >
          <Button onPress={moveToNextStep}>Update Employment Details</Button>
        </Box>
      </>
    );
  },
};

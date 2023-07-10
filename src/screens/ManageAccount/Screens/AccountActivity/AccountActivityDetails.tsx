import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Box } from '../../../../components/Containers/Box/Box';
import { MainWrapper } from '../../../../components/MainWrapper';
import { StyledText } from '../../../../components/typography/StyledText';
import { palette } from '../../../../constants/theme';
import { LogInProps } from '../../../../navigation/LogInNavigator/types';
import Screens from '../../../../navigation/screens';

export const AccountActivityDetails = ({
  route: {
    params: { activity },
  },
}: LogInProps<Screens.AccountActivityDetails>) => {
  const [date, time] = formatDate(activity.date, 'ACCOUNT_ACTIVITY', { currentFormat: 'API_TZ' }).split(' | ');

  const formattedActivity = { ...activity, date, time, origin: 'User' };

  return (
    <>
      <MainWrapper
        bottomSafe
        style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
      >
        <Box mt="24">
          <StyledText
            variant="h5"
            textAlign="left"
          >
            {activity.activityName}
          </StyledText>
        </Box>
        {Object.entries(formattedActivity).map(([key, value]) =>
          key !== 'activityName' ? (
            <Detail
              key={key}
              objectKey={key}
              value={value as string}
            />
          ) : null,
        )}
      </MainWrapper>
    </>
  );
};

const MAPPED_KEY = new Map([
  ['tradeId', 'Transaction Id'],
  ['date', 'Date'],
  ['time', 'Time'],
  ['origin', 'Origin'],
]);

const Detail = ({ objectKey, value }: { objectKey: string; value: string }) => {
  return (
    <Box
      py="16"
      style={{ borderBottomWidth: 1, borderColor: palette.lightGray, width: '100%' }}
    >
      <StyledText color="dark2">{MAPPED_KEY.get(objectKey)}</StyledText>
      <StyledText variant="h6">{value}</StyledText>
    </Box>
  );
};

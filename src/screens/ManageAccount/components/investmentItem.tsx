import { InvestmentOverview } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { Box } from '../../../components/Containers/Box/Box';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';

export const InvestmentItem = (props: InvestmentOverview) => {
  const { id: investmentId, tradeId, createdAt, amount } = props;
  const { navigate } = useLogInNavigation();

  return (
    <Row
      fw
      py="16"
      justifyContent="space-between"
      style={{ borderBottomWidth: 1, borderBottomColor: palette.lightGray }}
      onPress={() => navigate(Screens.TradeSummary, { investmentId, heading: 'Investment History' })}
    >
      <Box>
        <StyledText variant="button">Trade ID {tradeId}</StyledText>
        <StyledText variant="paragraph">{formatDate(createdAt, 'INVESTMENT', { currentFormat: 'API' })}</StyledText>
      </Box>
      <Row
        flexDirection="row"
        alignItems="center"
        style={{ columnGap: 13 }}
      >
        <StyledText variant="h6">-{amount.formatted}</StyledText>
        <Icon
          icon="arrowRight"
          color={palette.pureBlack}
        />
      </Row>
    </Row>
  );
};

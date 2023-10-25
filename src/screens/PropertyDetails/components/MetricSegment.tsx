import { BorderedDescription } from '../../../components/BorderedDescription';
import { Row } from '../../../components/Containers/Row';
import { Icon } from '../../../components/Icon';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';

export const metricsLabels = {
  projectReturn: 'Project Return',
  structure: 'Structure',
  rating: 'Rating',
  units: 'Units',
  totalProjectSize: 'Total Project Size',
  jobsCreated: 'Jobs Created',
} as const;

export type MetricT = keyof typeof metricsLabels;

export const MetricSegment = ({ metric, onPress }: { metric: { key: MetricT; value: string | number }; onPress: (key: MetricT) => void }) => {
  return (
    <BorderedDescription
      key={metric.key}
      isRow
      px="default"
      py="8"
      justifyContent="space-between"
      alignItems="center"
    >
      <Row alignItems="center">
        <StyledText
          variant="paragraphLarge"
          color="dark2"
        >
          {metricsLabels[metric.key as MetricT]}
        </StyledText>
        <Icon
          onPress={() => onPress(metric.key)}
          icon="info"
          color={palette.dark2}
        />
      </Row>
      <StyledText
        variant="paragraphLarge"
        color="dark2"
      >
        {metric.value}
      </StyledText>
    </BorderedDescription>
  );
};

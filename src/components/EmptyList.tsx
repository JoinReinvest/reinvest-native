import { Row } from './Containers/Row';
import { Icon } from './Icon';
import { StyledText } from './typography/StyledText';

export const EmptyListComponent = ({ headline }: { headline: string }) => {
  return (
    <Row
      mt="24"
      fw
      px="default"
      alignItems="center"
    >
      <Icon icon="info" />
      <StyledText variant="h6">{headline}</StyledText>
    </Row>
  );
};

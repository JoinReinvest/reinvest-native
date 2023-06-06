import { StyleSheet } from 'react-native';

import { palette, Theme } from '../constants/theme';
import { Row } from './Containers/Row';
import { StyledText } from './typography/StyledText';

interface Props {
  label: string;
  value: string;
  isLast?: boolean;
  valueColor?: Theme;
}

export const SummaryDetail = ({ label, value, isLast, valueColor = 'pureBlack' }: Props) => {
  return (
    <Row
      py="16"
      justifyContent="space-between"
      style={[!isLast && styles.lastSummaryDetail]}
    >
      <StyledText
        textAlign="right"
        variant="paragraphLarge"
      >
        {label}
      </StyledText>
      <StyledText
        variant={'paragraphEmp'}
        color={valueColor}
      >
        {value}
      </StyledText>
    </Row>
  );
};

const styles = StyleSheet.create({
  lastSummaryDetail: { borderBottomWidth: 1, borderBottomColor: palette.lightGray },
});

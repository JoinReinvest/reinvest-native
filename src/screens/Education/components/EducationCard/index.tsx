import { Button } from '../../../../components/Button';
import { Box } from '../../../../components/Containers/Box/Box';
import { Row } from '../../../../components/Containers/Row';
import { Icon } from '../../../../components/Icon';
import { StyledText } from '../../../../components/typography/StyledText';
import { palette } from '../../../../constants/theme';
import Screens from '../../../../navigation/screens';
import { EducationNavigationProp } from '../../../../screens/Education/types';
import { styles } from './styles';
import { EducationCardProps } from './types';

export const EducationCard = ({
  uri,
  title,
  subtitle,
  icon,
  buttonLabel,
  navigation,
}: EducationCardProps & EducationNavigationProp<Screens.EducationMainScreen>) => {
  return (
    <Box
      mb="16"
      p="24"
      fw
      color="frostGreen"
      colorOpacity={0.3}
    >
      <StyledText variant="h5">{title}</StyledText>
      <Box
        mt="8"
        mb="16"
      >
        <StyledText
          variant="paragraphLarge"
          color={palette.dark2}
        >
          {subtitle}
        </StyledText>
      </Box>
      <Row justifyContent="space-between">
        <Button
          onPress={() => navigation.navigate(Screens.WebViewContent, { title, uri })}
          isPill
          endIcon={<Icon icon="arrowRight" />}
          style={styles.button}
        >
          {buttonLabel}
        </Button>
        {icon}
      </Row>
    </Box>
  );
};

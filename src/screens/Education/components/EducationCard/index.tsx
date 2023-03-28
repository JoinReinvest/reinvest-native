import {EducationCardProps} from './types';
import {Box} from '@components/Containers/Box/Box';
import {StyledText} from '@components/typography/StyledText';
import {Button} from '@components/Button';
import {Row} from '@components/Containers/Box/Row';
import {palette} from '@constants/theme';
import {Icon} from '@components/Icon';
import {styles} from './styles';
import Screens from '@navigation/screens';
import {EducationNavigationProp} from '@screens/Education/types';

export const EducationCard = ({
  uri,
  title,
  subtitle,
  icon,
  buttonLabel,
  navigation,
}: EducationCardProps &
  EducationNavigationProp<Screens.EducationMainScreen>) => {
  return (
    <Box mb={'16'} p={'24'} fw color={'frostGreen'} colorOpacity={0.3}>
      <StyledText variant={'h5'}>{title}</StyledText>
      <Box mt={'8'} mb={'16'}>
        <StyledText variant={'paragraphLarge'} color={palette.dark2}>
          {subtitle}
        </StyledText>
      </Box>
      <Row justifyContent={'space-between'}>
        <Button
          onPress={() =>
            navigation.navigate(Screens.WebViewContent, {title, uri})
          }
          isPill
          endIcon={<Icon icon={'arrowRight'} />}
          style={styles.button}>
          {buttonLabel}
        </Button>
        {icon}
      </Row>
    </Box>
  );
};

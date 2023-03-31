import { Button } from '../../../components/Button';
import { MainWrapper } from '../../../components/MainWrapper';
import { StyledText } from '../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../navigation/hooks';
import Screens from '../../../navigation/screens';
import { EducationStackProps } from '../../Education/types';

export const BlogScreen = ({ navigation }: EducationStackProps<Screens.BlogScreen>) => {
  const loginNavigation = useLogInNavigation();

  return (
    <MainWrapper>
      <StyledText variant="h6">Education screen</StyledText>
      <Button onPress={() => navigation.goBack()}>BACK</Button>
      <Button onPress={() => navigation.navigate(Screens.EducationMainScreen)}>DASH</Button>
      <Button onPress={() => loginNavigation.navigate(Screens.DEV)}>DEV</Button>
    </MainWrapper>
  );
};

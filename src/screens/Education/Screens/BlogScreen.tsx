import {StyledText} from '@components/typography/StyledText';
import {MainWrapper} from '@components/MainWrapper';
import {Button} from '@components/Button';
import Screens from '@navigation/screens';
import {EducationStackProps} from '@screens/Education/types';
import {useLogInNavigation} from '@navigation/hooks';

export const BlogScreen = ({
  navigation,
}: EducationStackProps<Screens.BlogScreen>) => {
  const loginNavigation = useLogInNavigation();
  return (
    <MainWrapper>
      <StyledText variant={'h6'}>Education screen</StyledText>
      <Button onPress={() => navigation.goBack()}>BACK</Button>
      <Button onPress={() => navigation.navigate(Screens.EducationMainScreen)}>
        DASH
      </Button>
      <Button onPress={() => loginNavigation.navigate(Screens.DEV)}>DEV</Button>
    </MainWrapper>
  );
};

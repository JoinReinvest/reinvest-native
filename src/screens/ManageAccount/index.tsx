import { Box } from '../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import {
  MANAGE_ACCOUNT_INVESTING,
  MANAGE_ACCOUNT_PROFILE_INFO,
  MANAGE_ACCOUNT_SIGN_IN_AND_SECURITY,
  NavigationIdentifiers,
} from '../../constants/navigationLinks';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { LinksSegment } from './components/LinksSegment';
import { styles } from './styles';

export const ManageAccountMainScreen = () => {
  const navigation = useLogInNavigation();
  const navigate = (identifier: NavigationIdentifiers, heading: string) => navigation.navigate(Screens.ManageAccount, { identifier, heading });

  return (
    <PaddedScrollView style={styles.container}>
      <Box
        mt="24"
        fw
      >
        <LinksSegment
          heading="Investing"
          links={MANAGE_ACCOUNT_INVESTING}
          onPress={navigate}
          size="l"
        />
      </Box>
      <Box fw>
        <LinksSegment
          heading="Sign in & Security"
          links={MANAGE_ACCOUNT_SIGN_IN_AND_SECURITY}
          onPress={navigate}
          size="l"
        />
      </Box>
      <Box fw>
        <LinksSegment
          heading="Profile Information"
          links={MANAGE_ACCOUNT_PROFILE_INFO}
          disableSeparator
          onPress={navigate}
          size="l"
        />
      </Box>
    </PaddedScrollView>
  );
};

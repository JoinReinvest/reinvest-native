import Config from 'react-native-config';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { apiEnvs } from '../../App';
import { Box } from '../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { Link } from '../../types/link';
import { LinksSegment } from './components/LinksSegment';
import { MANAGE_ACCOUNT_LINKS, NavigationIdentifiers } from './navigationLinks';
import { styles } from './styles';

export const ManageAccountMainScreen = () => {
  const navigation = useLogInNavigation();
  const { activeAccount } = useCurrentAccount();

  const navigate = (options: Partial<Link>) => {
    const currentEnv = apiEnvs[Config.API_URL as keyof typeof apiEnvs];

    if (currentEnv === 'Integration' || currentEnv === 'Development' || options.identifier === NavigationIdentifiers.DIVIDEND_REINVESTING) {
      navigation.navigate(Screens.ManageAccount, { options });
    }
  };

  const { investing, security, profile } = MANAGE_ACCOUNT_LINKS[activeAccount.type || AccountType.Individual];

  return (
    <PaddedScrollView
      style={[styles.container]}
      safeInset
    >
      <Box
        mt="24"
        fw
      >
        <LinksSegment
          heading="Investing"
          links={investing}
          onPress={navigate}
          size="l"
        />
      </Box>
      {activeAccount.type !== AccountType.Beneficiary && (
        <Box fw>
          <LinksSegment
            heading="Sign in & Security"
            links={security}
            onPress={navigate}
            size="l"
          />
        </Box>
      )}
      <Box fw>
        <LinksSegment
          heading="Profile Information"
          links={profile}
          disableSeparator
          onPress={navigate}
          size="l"
        />
      </Box>
    </PaddedScrollView>
  );
};

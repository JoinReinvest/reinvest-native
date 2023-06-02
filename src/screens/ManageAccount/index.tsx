import { API_URL } from '@env';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { apiEnvs } from '../../App';
import { Box } from '../../components/Containers/Box/Box';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import {
  BASE_MANAGE_ACCOUNT_INVESTING,
  BASE_MANAGE_ACCOUNT_PROFILE_INFO,
  MANAGE_ACCOUNT_BENEFICIARY_INVESTING,
  MANAGE_ACCOUNT_PROFILE_INFO_WITH_ADDRESS,
  MANAGE_ACCOUNT_SIGN_IN_AND_SECURITY,
  NavigationIdentifiers,
} from '../../constants/navigationLinks';
import { useCurrentAccount } from '../../hooks/useActiveAccount';
import { useLogInNavigation } from '../../navigation/hooks';
import Screens from '../../navigation/screens';
import { Link } from '../../types/link';
import { LinksSegment } from './components/LinksSegment';
import { styles } from './styles';

export const ManageAccountMainScreen = () => {
  const navigation = useLogInNavigation();
  const { activeAccount } = useCurrentAccount();

  const navigate = (options: Partial<Link>) => {
    const currentEnv = apiEnvs[API_URL as keyof typeof apiEnvs];

    if (currentEnv === 'Integration' || currentEnv === 'Development' || options.identifier === NavigationIdentifiers.DIVIDEND_REINVESTING) {
      navigation.navigate(Screens.ManageAccount, { options });
    }
  };

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
          links={activeAccount.type === AccountType.Beneficiary ? MANAGE_ACCOUNT_BENEFICIARY_INVESTING : BASE_MANAGE_ACCOUNT_INVESTING}
          onPress={navigate}
          size="l"
        />
      </Box>
      {activeAccount.type !== AccountType.Beneficiary && (
        <Box fw>
          <LinksSegment
            heading="Sign in & Security"
            links={MANAGE_ACCOUNT_SIGN_IN_AND_SECURITY}
            onPress={navigate}
            size="l"
          />
        </Box>
      )}
      <Box fw>
        <LinksSegment
          heading="Profile Information"
          links={activeAccount.type === AccountType.Beneficiary ? BASE_MANAGE_ACCOUNT_PROFILE_INFO : MANAGE_ACCOUNT_PROFILE_INFO_WITH_ADDRESS}
          disableSeparator
          onPress={navigate}
          size="l"
        />
      </Box>
    </PaddedScrollView>
  );
};

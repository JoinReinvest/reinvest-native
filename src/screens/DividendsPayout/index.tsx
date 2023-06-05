import { useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { Box } from '../../components/Containers/Box/Box';
import { ScreenHeader } from '../../components/CustomHeader';
import { MainWrapper } from '../../components/MainWrapper';
import { DividendReinvestModal } from '../../components/Modals/ModalContent/DividendReinvestModal';
import { HeaderWithLogo } from '../../components/Modals/ModalHeaders/HeaderWithLogo';
import { PaddedScrollView } from '../../components/PaddedScrollView';
import { StyledText } from '../../components/typography/StyledText';
import { useLogInNavigation } from '../../navigation/hooks';
import { LogInRouteProps } from '../../navigation/LogInNavigator/types';
import Screens from '../../navigation/screens';
import { useDialog } from '../../providers/DialogProvider';
import { xScale } from '../../utils/scale';

export const DividendsPayoutScreen = () => {
  const navigation = useLogInNavigation();
  const route = useRoute<LogInRouteProps<Screens.DividendsPayout>>();
  const { bottom } = useSafeAreaInsets();
  const { goBack, navigate } = navigation;
  const { openDialog } = useDialog();

  const getRightHeader = useCallback(
    () => (
      <StyledText
        variant="h6"
        onPress={goBack}
      >
        Cancel
      </StyledText>
    ),
    [goBack],
  );

  const openReinvestingDialog = () =>
    openDialog(<DividendReinvestModal />, { showLogo: true, header: <HeaderWithLogo onClose={() => navigate(Screens.Dashboard)} /> });

  return (
    <>
      <ScreenHeader
        options={{
          title: 'Dividends',
          headerRight: getRightHeader,
        }}
        route={route}
        navigation={navigation}
      />
      <MainWrapper>
        <Box
          fw
          my="24"
        >
          <StyledText variant="h5">Manage Dividends</StyledText>
        </Box>
        <PaddedScrollView style={{ paddingHorizontal: 0 }}>
          <StyledText variant="h6">Dividend Amount</StyledText>
          <Box
            mt="8"
            mb="24"
          >
            <StyledText variant="dividend">$10.00</StyledText>
          </Box>
          <StyledText
            variant="paragraphLarge"
            style={{ maxWidth: xScale(327) }}
          >
            Make a decision on whether to reinvest or withdraw your dividend. If you take no action within (30) days, your dividend will be reinvested.
          </StyledText>
        </PaddedScrollView>
        <Box
          fw
          style={{ paddingBottom: bottom }}
        >
          <Button
            variant="primary"
            onPress={openReinvestingDialog}
          >
            Reinvest
          </Button>

          <Button
            variant="outlined"
            onPress={() => Alert.alert('Withdraw', undefined, [{ text: 'OK', onPress: goBack }])}
          >
            Withdraw
          </Button>
        </Box>
      </MainWrapper>
    </>
  );
};

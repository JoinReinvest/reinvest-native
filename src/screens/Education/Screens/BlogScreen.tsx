import { Button } from '../../../components/Button';
import { MainWrapper } from '../../../components/MainWrapper';
import { InviteModal } from '../../../components/Modals/ModalContent/InviteModal';
import { HeaderWithLogo } from '../../../components/Modals/ModalHeaders/HeaderWithLogo';
import { StyledText } from '../../../components/typography/StyledText';
import Screens from '../../../navigation/screens';
import { useDialog } from '../../../providers/DialogProvider';
import { EducationStackProps } from '../../Education/types';

export const BlogScreen = ({ navigation }: EducationStackProps<Screens.BlogScreen>) => {
  const { openDialog } = useDialog();

  return (
    <MainWrapper>
      <StyledText variant="h6">Education screen</StyledText>
      <Button onPress={() => navigation.goBack()}>BACK</Button>
      <Button onPress={() => navigation.navigate(Screens.EducationMainScreen)}>DASH</Button>
      <Button onPress={() => openDialog(<InviteModal />, { showLogo: true, header: <HeaderWithLogo />, closeIcon: false })}>Invite</Button>
    </MainWrapper>
  );
};

import { FormModalDisclaimer } from '@components/Modals/ModalContent/FormModalDisclaimer';
import { styles } from '@components/TermsFooter/styles';
import { StyledText } from '@components/typography/StyledText';
import { privacyPolicy, termsAndConditions } from '@constants/strings';
import { palette } from '@constants/theme';
import { useDialog } from '@providers/DialogProvider';
import { yScale } from '@utils/scale';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const TermsFooter = () => {
  const { bottom } = useSafeAreaInsets();
  const { openDialog } = useDialog();

  const showTerms = () => {
    openDialog(
      <FormModalDisclaimer
        headline="Terms and Conditions"
        content={termsAndConditions}
      />,
    );
  };

  const showPP = () => {
    openDialog(
      <FormModalDisclaimer
        headline="Privacy Policy"
        content={privacyPolicy}
      />,
    );
  };

  return (
    <View
      key="terms and conditions"
      style={[styles.wrapper, { paddingBottom: bottom || yScale(12) }]}
    >
      <StyledText
        color={palette.pureWhite}
        variant="paragraphSmall"
        style={{ textAlign: 'center' }}
      >
        By continuing, you agree to the REINVEST
      </StyledText>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <StyledText
          color={palette.frostGreen}
          onPress={showTerms}
          variant="link"
        >
          Terms of Conditions
        </StyledText>
        <StyledText
          color={palette.pureWhite}
          variant="paragraphSmall"
        >
          {' '}
          and{' '}
        </StyledText>
        <StyledText
          color={palette.frostGreen}
          variant="link"
          onPress={showPP}
        >
          Privacy Policy.
        </StyledText>
      </View>
    </View>
  );
};

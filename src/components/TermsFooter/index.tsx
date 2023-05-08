import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { privacyPolicy, termsAndConditions } from '../../constants/strings';
import { useDialog } from '../../providers/DialogProvider';
import { yScale } from '../../utils/scale';
import { FormModalDisclaimer } from '../Modals/ModalContent/FormModalDisclaimer';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';

export interface TermsFooterProps {
  dark?: boolean;
  noPadding?: boolean;
}

export const TermsFooter = ({ noPadding = false, dark }: TermsFooterProps) => {
  const { bottom } = useSafeAreaInsets();
  const { openDialog } = useDialog();

  const showTerms = () => {
    openDialog(
      <FormModalDisclaimer
        dark={dark}
        headline="Terms and Conditions"
        content={termsAndConditions}
      />,
    );
  };

  const showPP = () => {
    openDialog(
      <FormModalDisclaimer
        dark={dark}
        headline="Privacy Policy"
        content={privacyPolicy}
      />,
    );
  };

  const paddingBottom = noPadding ? 0 : bottom || yScale(12);

  return (
    <View
      key="terms and conditions"
      style={[styles.wrapper, { paddingBottom }]}
    >
      <StyledText
        color={dark ? 'pureWhite' : 'dark3'}
        variant="paragraphSmall"
        style={{ textAlign: 'center' }}
      >
        By continuing, you agree to the REINVEST
      </StyledText>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
        <StyledText
          color={dark ? 'frostGreen' : 'dark3'}
          onPress={showTerms}
          variant="link"
        >
          Terms of Conditions
        </StyledText>
        <StyledText
          color={dark ? 'pureWhite' : 'dark3'}
          variant="paragraphSmall"
        >
          {' '}
          and{' '}
        </StyledText>
        <StyledText
          color={dark ? 'frostGreen' : 'dark3'}
          variant="link"
          onPress={showPP}
        >
          Privacy Policy.
        </StyledText>
      </View>
    </View>
  );
};

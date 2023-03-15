import {Alert, View} from 'react-native';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles} from '@components/TermsFooter/styles';

export const TermsFooter = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View
      key={'terms and conditions'}
      style={[styles.wrapper, {paddingBottom: bottom || 12}]}>
      <StyledText
        color={palette.pureWhite}
        variant={'paragraphSmall'}
        style={{textAlign: 'center'}}>
        By continuing, you agree to the REINVEST{' '}
        <StyledText
          color={palette.frostGreen}
          onPress={() => Alert.alert('Terms')}
          variant={'link'}>
          Terms of Conditions
        </StyledText>{' '}
        and{' '}
        <StyledText
          color={palette.frostGreen}
          variant={'link'}
          onPress={() => Alert.alert('Policy')}>
          Privacy Policy.
        </StyledText>
      </StyledText>
    </View>
  );
};

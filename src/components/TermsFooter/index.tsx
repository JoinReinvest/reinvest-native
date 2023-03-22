import {Alert, View} from 'react-native';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import React from 'react';
import {styles} from '@components/TermsFooter/styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const TermsFooter = () => {
  const {bottom} = useSafeAreaInsets();
  return (
    <View
      key={'terms and conditions'}
      style={[styles.wrapper, {paddingBottom: bottom || 12}]}>
      <StyledText
        color={palette.pureWhite}
        variant={'paragraphSmall'}
        style={[styles.textCenter]}>
        By continuing, you agree to the REINVEST
      </StyledText>
      <View style={[styles.row]}>
        <StyledText
          color={palette.frostGreen}
          onPress={() => Alert.alert('Terms')}
          variant={'link'}>
          Terms of Conditions
        </StyledText>
        <StyledText color={palette.pureWhite} variant={'paragraphSmall'}>
          {' '}
          and{' '}
        </StyledText>
        <StyledText
          color={palette.frostGreen}
          variant={'link'}
          onPress={() => Alert.alert('Policy')}>
          Privacy Policy.
        </StyledText>
      </View>
    </View>
  );
};

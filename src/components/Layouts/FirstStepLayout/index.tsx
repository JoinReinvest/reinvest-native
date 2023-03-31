import React, { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { palette } from '../../../constants/theme';
import { styles } from '../../../screens/SignIn/styles';
import { hexToRgbA } from '../../../utils/hexToRgb';
import { StyledText } from '../..//typography/StyledText';
import { Sygnet } from '../../Icon/icons';
import { MainWrapper } from '../../MainWrapper';
import { Video } from '../../Video';

interface FirstStepLayoutProps {
  description: string;
  headline: string;
}

export const FirstStepLayout = ({ headline, description, children }: PropsWithChildren<FirstStepLayoutProps>) => {
  return (
    <MainWrapper style={{ justifyContent: 'flex-start' }}>
      <StatusBar barStyle="light-content" />
      <Video />
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        colors={['transparent', hexToRgbA(palette.pureBlack, 0.6)]}
      />
      <View style={styles.signet}>
        <Sygnet />
      </View>
      <View style={styles.descriptionSegment}>
        <StyledText
          style={[styles.text]}
          variant="h1"
        >
          {headline}
        </StyledText>
        <StyledText
          style={styles.text}
          variant="bonusHeading"
        >
          {description}
        </StyledText>
      </View>
      {children}
    </MainWrapper>
  );
};

import { Sygnet } from '@components/Icon/icons';
import { MainWrapper } from '@components/MainWrapper';
import { StyledText } from '@components/typography/StyledText';
import { Video } from '@components/Video';
import { styles } from '@screens/SignIn/SignIn.styles';
import { palette } from '@src/constants/theme';
import { hexToRgbA } from '@src/utils/hexToRgb';
import React, { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface FirstStepLayoutProps {
  description: string;
  headline: string;
}

export const FirstStepLayout = ({ headline, description, children }: PropsWithChildren<FirstStepLayoutProps>) => {
  return (
    <MainWrapper style={{ justifyContent: 'flex-start' }}>
      <StatusBar barStyle={'light-content'} />
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
          variant={'h1'}
        >
          {headline}
        </StyledText>
        <StyledText
          style={styles.text}
          variant={'bonusHeading'}
        >
          {description}
        </StyledText>
      </View>
      {children}
    </MainWrapper>
  );
};

import {MainWrapper} from '@components/MainWrapper';
import {Video} from '@components/Video';
import {StatusBar, StyleSheet, View} from 'react-native';
import {styles} from '@screens/SignIn/SignIn.styles';
import {Sygnet} from '@components/Icon/icons';
import {StyledText} from '@components/typography/StyledText';
import React, {PropsWithChildren} from 'react';
import {xScale} from '@src/utils/scale';
import LinearGradient from 'react-native-linear-gradient';
import {palette} from '@src/constants/theme';
import {hexToRgbA} from '@src/utils/hexToRgb';

interface FirstStepLayoutProps {
  headline: string;
  description: string;
}

export const FirstStepLayout = ({
  headline,
  description,
  children,
}: PropsWithChildren<FirstStepLayoutProps>) => {
  return (
    <>
      <MainWrapper
        style={{
          paddingHorizontal: xScale(37),
        }}>
        <StatusBar barStyle={'light-content'} />
        <Video />
        <LinearGradient
          style={[StyleSheet.absoluteFillObject]}
          colors={['transparent', hexToRgbA(palette.pureBlack, 0.6)]}
        />
        <View style={styles.signet}>
          <Sygnet />
        </View>
        <View style={[styles.wrapper]}>
          <View style={styles.descriptionSegment}>
            <StyledText style={[styles.text]} variant={'h1'}>
              {headline}
            </StyledText>
            <StyledText
              style={[styles.text, styles.description]}
              variant={'bonusHeading'}>
              {description}
            </StyledText>
          </View>
          {children}
        </View>
      </MainWrapper>
    </>
  );
};

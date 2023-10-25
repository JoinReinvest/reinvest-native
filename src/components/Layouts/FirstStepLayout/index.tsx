import React, { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { palette } from '../../../constants/theme';
import { useKeyboardAware } from '../../../hooks/useKeyboardAware';
import { styles } from '../../../screens/SignIn/styles';
import { hexToRgbA } from '../../../utils/hexToRgb';
import { Signet } from '../../Icon/icons';
import { MainWrapper } from '../../MainWrapper';
import { PaddedScrollView } from '../../PaddedScrollView';
import { StyledText } from '../../typography/StyledText';
import { Video } from '../../Video';

interface FirstStepLayoutProps {
  description: string;
  headline: string;
}

export const FirstStepLayout = ({ headline, description, children }: PropsWithChildren<FirstStepLayoutProps>) => {
  useKeyboardAware(true, 24);

  return (
    <>
      <MainWrapper
        noPadding
        style={{ position: 'relative' }}
      >
        <StatusBar barStyle="light-content" />
        <Video />
        <LinearGradient
          style={StyleSheet.absoluteFillObject}
          colors={['transparent', hexToRgbA(palette.pureBlack, 0.6)]}
        />
        <PaddedScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={[styles.scrollContainer, styles.fw]}
        >
          <View style={styles.signet}>
            <Signet />
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
        </PaddedScrollView>
      </MainWrapper>
    </>
  );
};

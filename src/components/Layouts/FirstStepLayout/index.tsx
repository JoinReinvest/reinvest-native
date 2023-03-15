import {MainWrapper} from '@components/MainWrapper';
import {Video} from '@components/Video';
import {StatusBar, View} from 'react-native';
import {styles} from '@screens/SignIn/SignIn.styles';
import {Sygnet} from '@components/Icon/icons';
import {StyledText} from '@components/typography/StyledText';
import React, {PropsWithChildren} from 'react';

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
    <MainWrapper shouldSafeArea={false} style={{justifyContent: 'flex-start'}}>
      <StatusBar barStyle={'light-content'} />
      <Video />
      <View style={styles.signet}>
        <Sygnet />
      </View>
      <View style={styles.descriptionSegment}>
        <StyledText style={[styles.text]} variant={'h1'}>
          {headline}
        </StyledText>
        <StyledText style={styles.text} variant={'bonusHeading'}>
          {description}
        </StyledText>
      </View>
      {children}
    </MainWrapper>
  );
};

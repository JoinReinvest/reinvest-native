import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PaddedScrollView } from '../../PaddedScrollView';
import { StyledText } from '../../typography/StyledText';
import { styles } from './styles';

interface Props {
  headline: string;
  content?: string;
  dark?: boolean;
}

export const FormModalDisclaimer = ({ dark, headline, content, children }: PropsWithChildren<Props>) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <View style={styles.header}>
        <StyledText
          variant="h5"
          color={dark ? 'pureWhite' : 'pureBlack'}
        >
          {headline}
        </StyledText>
      </View>
      <PaddedScrollView
        indicatorStyle="white"
        contentContainerStyle={[{ paddingBottom: bottom }]}
      >
        <StyledText
          variant="paragraphLarge"
          color={dark ? 'pureWhite' : 'pureBlack'}
        >
          {content}
        </StyledText>
      </PaddedScrollView>
      {children}
    </>
  );
};

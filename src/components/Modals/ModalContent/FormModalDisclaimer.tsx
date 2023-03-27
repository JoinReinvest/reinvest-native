import {ScrollView, View} from 'react-native';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import React, {PropsWithChildren} from 'react';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const mockedContent =
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae \n' +
  '\n' +
  'dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, \n' +
  'consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\n' +
  '\n' +
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia vol';

interface Props {
  headline: string;
  content?: string;
}

export const FormModalDisclaimer = ({
  headline,
  content = mockedContent,
  children,
}: PropsWithChildren<Props>) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <>
      <View style={styles.header}>
        <StyledText variant={'h5'} color={palette.pureWhite}>
          {headline}
        </StyledText>
      </View>
      <ScrollView
        indicatorStyle={'white'}
        contentContainerStyle={[
          styles.disclaimersContent,
          {paddingBottom: bottom},
        ]}>
        <StyledText variant={'paragraphLarge'} color={palette.pureWhite}>
          {content}
        </StyledText>
      </ScrollView>
      {children}
    </>
  );
};

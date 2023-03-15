import {StyledText} from '@components/typography/StyledText';
import {PropsWithChildren, ReactNode} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {palette} from '@constants/theme';

interface Props {
  headline: string | ReactNode;
  description?: string | ReactNode;
  dark?: boolean;
}

export const FormTitle = ({
  headline,
  description,
  dark,
}: PropsWithChildren<Props>) => {
  return (
    <View style={styles.wrapper}>
      <StyledText
        color={dark ? palette.pureWhite : palette.pureBlack}
        variant={'h5'}
        style={styles.headline}>
        {headline}
      </StyledText>
      {description && (
        <StyledText
          color={dark ? palette.pureWhite : palette.pureBlack}
          variant={'paragraphLarge'}
          style={styles.description}>
          {description}
        </StyledText>
      )}
    </View>
  );
};

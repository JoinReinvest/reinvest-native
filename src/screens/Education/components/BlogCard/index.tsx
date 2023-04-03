import { useCallback } from 'react';
import FastImage from 'react-native-fast-image';

import { Box } from '../../../../components/Containers/Box/Box';
import { StyledText } from '../../../../components/typography/StyledText';
import { PADDED_SAFE_WIDTH } from '../../../../constants/styles';
import { palette } from '../../../../constants/theme';
import Screens from '../../../../navigation/screens';
import { EducationNavigationProp } from '../../../../screens/Education/types';
import { styles } from './styles';
import { BlogPost } from './types';

export const BlogCard = ({ data, slug, image, title, navigation }: BlogPost & EducationNavigationProp<Screens.EducationMainScreen>) => {
  const getImageDimensions = useCallback(() => {
    let ratio = 1;

    if (image) {
      ratio = image.width / image.height;
    }

    return { width: '100%', height: PADDED_SAFE_WIDTH / ratio };
  }, [image]);

  const navigateToBlog = () => {
    navigation.navigate(Screens.WebViewContent, {
      title,
      uri: `blog-iframe/${slug}/`,
    });
  };

  return (
    <Box
      style={[styles.card]}
      onPress={navigateToBlog}
    >
      {image && (
        <FastImage
          source={{ uri: image.src }}
          style={getImageDimensions()}
        />
      )}
      <Box
        style={styles.description}
        px="16"
        py="12"
        fw
      >
        <StyledText variant="bonusHeading">{title}</StyledText>
        <Box />
        <StyledText
          variant="paragraph"
          color={palette.dark3}
        >
          {data}
        </StyledText>
      </Box>
    </Box>
  );
};

import { Box } from '../../../../components/Containers/Box/Box';
import { ImageCard } from '../../../../components/ImageCard';
import { StyledText } from '../../../../components/typography/StyledText';
import Screens from '../../../../navigation/screens';
import { EducationNavigationProp } from '../../types';
import { BlogPost } from './types';

export const BlogCard = ({ data, slug, image, title, navigation }: BlogPost & EducationNavigationProp<Screens.EducationMainScreen>) => {
  const navigateToBlog = () => {
    navigation.navigate(Screens.WebViewContent, {
      title,
      uri: `blog-iframe/${slug}/`,
    });
  };

  return (
    <ImageCard
      onPress={navigateToBlog}
      uri={image?.src}
    >
      <StyledText variant="bonusHeading">{title}</StyledText>
      <Box />
      <StyledText
        variant="paragraph"
        color="dark3"
      >
        {data}
      </StyledText>
    </ImageCard>
  );
};

import React from 'react';
import { ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePostsQuery } from '../../../api/hooks/getPosts';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import Screens from '../../../navigation/screens';
import { BlogCard } from '../../Education/components/BlogCard';
import { EducationCard } from '../../Education/components/EducationCard';
import { educationCards } from '../../Education/constants';
import { EducationStackProps } from '../../Education/types';
import { styles } from './styles';

export const EducationMainScreen = ({ navigation }: EducationStackProps<Screens.EducationMainScreen>) => {
  const { bottom } = useSafeAreaInsets();
  const { data: posts, isLoading } = usePostsQuery();

  return (
    <MainWrapper
      isScroll
      noPadding
      contentContainerStyle={{ paddingBottom: bottom }}
    >
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require('../../../assets/images/education-hero.jpg')}
      >
        <Box
          px="24"
          py="24"
        >
          <StyledText
            variant="h3"
            color={palette.pureWhite}
          >
            Learn About Real Estate Investing
          </StyledText>
        </Box>
      </ImageBackground>
      <Box
        px="24"
        fw
      >
        {educationCards.map(card => (
          <EducationCard
            key={card.title}
            navigation={navigation}
            {...card}
          />
        ))}
        <Box my="16">
          <StyledText variant="h5">Learn the basics</StyledText>
        </Box>
        {isLoading && (
          <Box
            fw
            alignItems="center"
          >
            <Loader />
          </Box>
        )}
        {posts &&
          posts.map(post => (
            <BlogCard
              key={post.title}
              navigation={navigation}
              {...post}
            />
          ))}
      </Box>
    </MainWrapper>
  );
};

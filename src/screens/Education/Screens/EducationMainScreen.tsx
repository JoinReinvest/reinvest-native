import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { usePostsQuery } from '../../../api/hooks/getPosts';
import { Box } from '../../../components/Containers/Box/Box';
import { Loader } from '../../../components/Loader';
import { MainWrapper } from '../../../components/MainWrapper';
import { StyledText } from '../../../components/typography/StyledText';
import { palette } from '../../../constants/theme';
import Screens from '../../../navigation/screens';
import { hexToRgbA } from '../../../utils/hexToRgb';
import { BlogCard } from '../components/BlogCard';
import { EducationCard } from '../components/EducationCard';
import { educationCards } from '../constants';
import { EducationStackProps } from '../types';
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
        <LinearGradient
          colors={['transparent', hexToRgbA(palette.pureBlack, 0.8)]}
          style={StyleSheet.absoluteFillObject}
        />
        <Box
          px="24"
          py="24"
        >
          <StyledText
            variant="h3"
            color="pureWhite"
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

import {MainWrapper} from '@components/MainWrapper';
import Screens from '@navigation/screens';
import {EducationStackProps} from '@screens/Education/types';
import {StyledText} from '@components/typography/StyledText';
import {Box} from '@components/Containers/Box/Box';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BlogCard} from '@screens/Education/components/BlogCard';
import {Loader} from '@components/Loader';
import {usePostsQuery} from '@src/api/hooks/getPosts';
import {educationCards} from '@screens/Education/constants';
import {EducationCard} from '@screens/Education/components/EducationCard';
import {ImageBackground} from 'react-native';
import {palette} from '@constants/theme';
import {styles} from './styles';

export const EducationMainScreen = ({
  navigation,
}: EducationStackProps<Screens.EducationMainScreen>) => {
  const {bottom} = useSafeAreaInsets();
  const {data: posts, isLoading} = usePostsQuery();

  return (
    <MainWrapper
      isScroll
      noPadding
      contentContainerStyle={{paddingBottom: bottom}}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode={'cover'}
        source={require('../../../assets/images/education-hero.jpg')}>
        <Box px={'24'} py={'24'}>
          <StyledText variant={'h3'} color={palette.pureWhite}>
            Learn About Real Estate Investing
          </StyledText>
        </Box>
      </ImageBackground>
      <Box px={'24'} fw>
        {educationCards.map(card => (
          <EducationCard key={card.title} navigation={navigation} {...card} />
        ))}
        <Box my={'16'}>
          <StyledText variant={'h5'}>Learn the basics</StyledText>
        </Box>
        {isLoading && (
          <Box fw alignItems={'center'}>
            <Loader />
          </Box>
        )}
        {posts &&
          posts.map(post => (
            <BlogCard key={post.title} navigation={navigation} {...post} />
          ))}
      </Box>
    </MainWrapper>
  );
};

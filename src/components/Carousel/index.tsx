import { FlashList } from '@shopify/flash-list';
import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';

import { MAIN_WRAPPER_PADDING_HORIZONTAL } from '../../constants/styles';
import { WINDOW_WIDTH, yScale } from '../../utils/scale';
import { Box } from '../Containers/Box/Box';
import { StyledText } from '../typography/StyledText';
import { INDICATOR_SIZE, SnapIndicators } from './SnapIndicators';

interface Props {
  items: string[];
  height?: number;
  title?: string;
}
export const Carousel = ({ items, title, height = 240 }: Props) => {
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  return (
    <Box
      fw
      height={yScale(height)}
    >
      <FlashList<string>
        onScroll={e => {
          const xOffset = e.nativeEvent.contentOffset.x;
          setCurrentCarouselIndex(Math.round(xOffset / WINDOW_WIDTH));
        }}
        horizontal
        estimatedItemSize={WINDOW_WIDTH}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={items}
        renderItem={({ item }) => {
          return (
            <FastImage
              style={{ width: WINDOW_WIDTH, height: yScale(height) }}
              source={{ uri: item }}
            />
          );
        }}
      />
      <Box
        px="default"
        position="absolute"
        style={{ bottom: MAIN_WRAPPER_PADDING_HORIZONTAL + yScale(INDICATOR_SIZE + 12) }}
      >
        <StyledText
          variant="h3"
          color="pureWhite"
        >
          {title}
        </StyledText>
      </Box>
      <SnapIndicators
        length={items.length}
        currentIndex={currentCarouselIndex}
      />
    </Box>
  );
};

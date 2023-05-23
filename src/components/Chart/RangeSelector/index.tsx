import React, { useState } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from 'react-native-reanimated';

import { xScale, yScale } from '../../../utils/scale';
import { Box } from '../../Containers/Box/Box';
import { Row } from '../../Containers/Row';
import { StyledText } from '../../typography/StyledText';
import { RANGE_OPTIONS } from '../constants';
import { styles } from './styles';
import { ChartProps, RangeOption } from './types';

const blockWidth = xScale(49);

export const RangeSelector = ({ onSelect, resolution }: ChartProps) => {
  const [selected, setSelected] = useState(RANGE_OPTIONS.findIndex(opt => opt.resolution === resolution));

  const animatedValue = useDerivedValue(() => {
    return selected;
  }, [selected]);

  const selectOption = async (index: number) => {
    onSelect?.(RANGE_OPTIONS[index] as RangeOption);
    setSelected(index);
  };

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateX: withSpring(animatedValue.value * blockWidth, { damping: 10, mass: 0.5 }) }],
    }),
    [selected],
  );

  return (
    <Box
      pb={'16'}
      px={'16'}
    >
      <Row
        fw
        pb={'12'}
        pt={'12'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        {RANGE_OPTIONS.map((option, idx) => (
          <Box
            width={xScale(49)}
            alignItems={'center'}
            onPress={() => selectOption(idx)}
            key={option.label}
          >
            <StyledText opacity={selected === idx ? 1 : 0.6}>{option.label}</StyledText>
          </Box>
        ))}
      </Row>
      <Animated.View style={[styles.sliderBox, animatedStyles]}>
        <Box
          width={xScale(25)}
          color={'pureBlack'}
          height={yScale(2)}
        />
      </Animated.View>
    </Box>
  );
};

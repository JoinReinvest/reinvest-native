import React from 'react';

import { yScale } from '../../utils/scale';
import { Box } from '../Containers/Box/Box';
import { Row } from '../Containers/Row';
import { styles } from './styles';

export const INDICATOR_SIZE = 8;
export const SnapIndicators = ({ length, currentIndex, size = INDICATOR_SIZE }: { currentIndex: number; length: number; size?: number }) => {
  const dimension = yScale(size);

  return (
    <Row
      fw
      height={size}
      px="default"
      position="absolute"
      /*
       indicators size - paddingBottom
       */
      style={styles.indicators}
    >
      {new Array(length).fill(true).map((_, idx) => {
        return (
          <Box
            mr={'8'}
            key={idx}
            colorOpacity={idx !== currentIndex ? 0.5 : undefined}
            color="pureWhite"
            width={dimension}
            height={dimension}
            radius={dimension}
          />
        );
      })}
    </Row>
  );
};

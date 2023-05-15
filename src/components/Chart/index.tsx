import React, { PropsWithChildren } from 'react';
import { Area, Chart as ChartBase, Line } from 'react-native-responsive-linechart';

import { PADDED_SAFE_WIDTH } from '../../constants/styles';
import { palette } from '../../constants/theme';
import { yScale } from '../../utils/scale';
import { Box } from '../Containers/Box/Box';
import { EmptyChart } from '../Icon/icons/EducationIcons/EmptyChart';
import { StyledText } from '../typography/StyledText';
import { RangeSelector } from './RangeSelector';
import { RangeOption } from './RangeSelector/types';
import { styles } from './styles';
import { ChartProps } from './types';

const options = [
  { value: '1', label: '1D' },
  { value: '7', label: '1W' },
  { value: '30', label: '1M' },
  { value: '356', label: '1Y' },
  { value: '5Y', label: '5Y' },
  { value: 'MAX', label: 'MAX' },
];

/*
 *  react-native-responsive-lineChart is not supporting React 18 types
 */
const ChartOverload: React.FC<PropsWithChildren<React.ComponentProps<typeof ChartBase>>> = ChartBase;

export const Chart = ({ compact, chartData }: ChartProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const selectHandler = (option: RangeOption) =>
    new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, 0.5);
    });

  const gridPosition = [0, 1, 2, 3].map(count => 48 * 0.8 * count);

  if (!chartData?.length) {
    return compact ? null : (
      <Box
        height={yScale(48) * 4}
        style={[styles.wrapper, compact && styles.compact]}
        justifyContent={'center'}
        alignItems={'center'}
        px={'48'}
      >
        <Box
          width={120}
          height={120}
        >
          <EmptyChart />
        </Box>
        <StyledText
          variant={'paragraphEmp'}
          color={'dark3'}
          style={{ textAlign: 'center' }}
        >
          Make an investment now for generating the chart
        </StyledText>
      </Box>
    );
  }

  return (
    <Box style={[styles.wrapper, compact && styles.compact]}>
      <Box
        fw={!compact}
        height={!compact ? 48 * 4 : undefined}
        justifyContent={'flex-end'}
      >
        {!compact &&
          gridPosition.map(position => (
            <Box
              key={position}
              fw
              style={{ borderBottomWidth: 1, borderBottomColor: palette.lightGray, position: 'absolute', bottom: position }}
            />
          ))}
        <ChartOverload
          style={{ borderColor: 'transparent', borderWidth: 0, height: !compact ? 48 * 4 : yScale(24), width: !compact ? PADDED_SAFE_WIDTH : yScale(64) }}
          data={chartData}
          /*
           Y Domain should be 25% higher than max data input
           */
          xDomain={{ min: -2, max: 10 }}
          yDomain={{ min: 0, max: 100 }}
        >
          <Area theme={{ gradient: { from: { color: palette.frostGreen, opacity: 1 }, to: { color: palette.frostGreen, opacity: 0.1 } } }} />
          <Line
            smoothing={'cubic-spline'}
            theme={{ stroke: { color: palette.pureBlack, width: compact ? 1 : 2 } }}
          />
        </ChartOverload>
      </Box>
      {!compact && (
        <RangeSelector
          onSelect={selectHandler}
          options={options}
        />
      )}
    </Box>
  );
};

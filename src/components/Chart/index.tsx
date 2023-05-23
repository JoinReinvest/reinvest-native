import React, { PropsWithChildren, useMemo, useState } from 'react';
import { Area, Chart as ChartBase, Line } from 'react-native-responsive-linechart';
import { useGetEVSChart } from 'reinvest-app-common/src/services/queries/getEVSChart';
import { EvsChartResolution } from 'reinvest-app-common/src/types/graphql';

import { getApiClient } from '../../api/getApiClient';
import { PADDED_SAFE_WIDTH } from '../../constants/styles';
import { palette } from '../../constants/theme';
import { currentAccount, useAtom } from '../../store/atoms';
import { yScale } from '../../utils/scale';
import { Box } from '../Containers/Box/Box';
import { Row } from '../Containers/Row';
import { Icon } from '../Icon';
import { EmptyChart } from '../Icon/icons/EducationIcons/EmptyChart';
import { Loader } from '../Loader';
import { StyledText } from '../typography/StyledText';
import { RANGE_OPTIONS } from './constants';
import { RangeSelector } from './RangeSelector';
import { RangeOption } from './RangeSelector/types';
import { styles } from './styles';
import { ChartProps } from './types';

/*
 *  react-native-responsive-lineChart is not supporting React 18 types
 */

const ChartOverload: React.FC<PropsWithChildren<React.ComponentProps<typeof ChartBase>>> = ChartBase;

export const Chart = ({ compact }: ChartProps) => {
  const [account] = useAtom(currentAccount);
  const [selectedOption, setSelectedOption] = useState<RangeOption | undefined>(RANGE_OPTIONS[0]);
  const { data, isLoading, isRefetching } = useGetEVSChart(getApiClient, {
    accountId: account.id ?? '',
    resolution: selectedOption?.resolution ?? EvsChartResolution.Day,
  });

  const chartData = useMemo(() => (data?.dataPoints ? data.dataPoints.map((point, index) => ({ x: index, y: point?.usd ?? 0 })) : []), [data?.dataPoints]);

  const gridPosition = [0, 1, 2, 3].map(count => 48 * 0.8 * count);

  if ((isLoading || isRefetching) && !chartData.length) {
    <Box
      height={yScale(48) * 4}
      style={[styles.wrapper, compact && styles.compact]}
      justifyContent="center"
      alignItems="center"
      px="48"
    >
      <Loader />
    </Box>;
  }

  if (!isLoading && !isRefetching && !chartData.length) {
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

  const yMax = Math.max(...chartData.map(p => p.y));
  const xMax = Math.max(...chartData.map(p => p.x));

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
        {!compact && !chartData.length ? (
          <Box
            height={yScale(48) * 4}
            style={[styles.wrapper, compact && styles.compact]}
            justifyContent="center"
            alignItems="center"
            px="48"
          >
            <Loader />
          </Box>
        ) : chartData.length ? (
          <ChartOverload
            style={{ borderColor: 'transparent', borderWidth: 0, height: !compact ? 48 * 4 : yScale(24), width: !compact ? PADDED_SAFE_WIDTH : yScale(64) }}
            data={chartData}
            /*
              Y Domain should be 25% higher than max data input
           */
            xDomain={{ min: 0, max: xMax }}
            yDomain={{ min: 0, max: yMax * 1.25 }}
          >
            <Area theme={{ gradient: { from: { color: palette.frostGreen, opacity: 1 }, to: { color: palette.frostGreen, opacity: 0.1 } } }} />
            <Line
              smoothing={'cubic-spline'}
              theme={{ stroke: { color: palette.pureBlack, width: compact ? 1 : 2 } }}
            />
          </ChartOverload>
        ) : null}
      </Box>
      {compact ? (
        <Box style={{ paddingTop: 6 }}>
          <Row
            alignItems={'center'}
            style={{ columnGap: 6 }}
          >
            <Box>
              <Icon
                size={'xs'}
                icon={'circleChevron'}
              />
            </Box>
            <StyledText>{data?.changeFactor}</StyledText>
          </Row>
        </Box>
      ) : (
        <RangeSelector
          resolution={selectedOption?.resolution ?? EvsChartResolution.Day}
          onSelect={setSelectedOption}
        />
      )}
    </Box>
  );
};

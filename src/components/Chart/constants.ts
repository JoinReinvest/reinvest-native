import { EvsChartResolution } from 'reinvest-app-common/src/types/graphql';

import { RangeOption } from './RangeSelector/types';

export const RANGE_OPTIONS: RangeOption[] = [
  { label: '1D', resolution: EvsChartResolution.Day },
  { label: '1W', resolution: EvsChartResolution.Week },
  { label: '1M', resolution: EvsChartResolution.Month },
  { label: '1Y', resolution: EvsChartResolution.Year },
  { label: '5Y', resolution: EvsChartResolution.FiveYears },
  { label: 'MAX', resolution: EvsChartResolution.Max },
];

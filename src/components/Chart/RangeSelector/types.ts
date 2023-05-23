import { EvsChartResolution } from 'reinvest-app-common/src/types/graphql';
export interface ChartProps {
  onSelect: (selected: RangeOption) => void;
  resolution: EvsChartResolution;
}

export type RangeOption = { label: string; resolution: EvsChartResolution };

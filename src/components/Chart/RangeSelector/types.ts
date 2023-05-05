export interface ChartProps {
  onSelect: (selected: RangeOption) => Promise<void>;
  options: RangeOption[];
}

export type RangeOption = { label: string; value: string };

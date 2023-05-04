export type ChartData = { x: number; y: number }[];
export interface ChartProps {
  chartData?: ChartData;
  compact?: boolean;
}

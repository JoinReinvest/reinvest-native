export interface QuotasTileGroupProps {
  onSelect: (selectedQuota: string) => void;
  quotas: string[];
  selectedQuota?: string;
}

export interface TileProps {
  id: string;
  onPress: (id: string) => void;
  selected?: boolean;
}

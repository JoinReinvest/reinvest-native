export interface CardProps<T> {
  id: string;
  onCardPress: (value: T) => void;
  title: string;
  value: T;
  compact?: boolean;
  dark?: boolean;
  description?: string;
  selected?: boolean;
}

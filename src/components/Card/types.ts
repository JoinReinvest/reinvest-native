export interface CardProps<T> {
  id: string;
  onCardPress: (value: T | undefined) => void;
  title: string;
  value: T;
  description?: string;
  selected?: boolean;
}

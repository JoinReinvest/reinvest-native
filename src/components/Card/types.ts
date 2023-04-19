export interface CardProps<T> {
  id: string;
  onCardPress: (value: T) => void;
  title: string;
  value: T;
  description?: string;
  selected?: boolean;
}

export interface CardProps<T> {
  id: T;
  title: string;
  selected?: boolean;
  onCardPress: (value: T | undefined) => void;
}

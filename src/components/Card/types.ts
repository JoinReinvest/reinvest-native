export interface CardProps<T> {
  id: T;
  onCardPress: (value: T | undefined) => void;
  title: string;
  selected?: boolean;
}

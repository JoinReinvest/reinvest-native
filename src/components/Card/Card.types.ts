export interface CardProps {
  id: string;
  title: string;
  selected?: boolean;
  onCardPress?: (pressedCardId: string | null) => void;
}

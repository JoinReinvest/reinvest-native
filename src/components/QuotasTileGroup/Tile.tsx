import { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';

import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { TileProps } from './types';

export const Tile = ({ id, selected, children, onPress }: PropsWithChildren<TileProps>) => {
  return (
    <Pressable
      style={[styles.tile, selected && styles.selected]}
      onPress={() => onPress(id)}
    >
      <StyledText
        variant="bonusHeading"
        style={[styles.text, selected && styles.selected]}
      >
        {children}
      </StyledText>
    </Pressable>
  );
};

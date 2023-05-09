import React from 'react';
import { Pressable } from 'react-native';

import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { CardProps } from './types';

export const Card = <T extends object | string>({ id, title, value, description, selected = false, onCardPress, dark = true, compact }: CardProps<T>) => {
  const handleCardPress = () => onCardPress?.(value);

  return (
    <Pressable
      id={`${id}`}
      style={[styles.cardWrapper, selected && styles.selected, compact && styles.compact]}
      onPress={handleCardPress}
    >
      <StyledText
        color={dark ? 'pureWhite' : 'pureBlack'}
        variant="bodyText"
        style={[styles.cardTitle, selected && styles.selected]}
      >
        {title}
      </StyledText>
      {description && (
        <StyledText
          color="darkerGray"
          variant="paragraph"
          style={[styles.cardContent, selected && styles.selected]}
        >
          {description}
        </StyledText>
      )}
    </Pressable>
  );
};

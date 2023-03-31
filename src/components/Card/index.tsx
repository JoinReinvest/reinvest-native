import { palette } from '@src/constants/theme';
import React from 'react';
import { Pressable } from 'react-native';

import { StyledText } from '../typography/StyledText';
import { styles } from './styles';
import { CardProps } from './types';

export const Card = <T extends string>({ id, title, value, description, selected = false, onCardPress }: CardProps<T>) => {
  const handleCardPress = () => onCardPress?.(selected ? undefined : value);

  return (
    <Pressable
      id={`${id}`}
      style={[styles.cardWrapper, selected && styles.selected]}
      onPress={handleCardPress}
    >
      <StyledText
        color={palette.pureWhite}
        variant="bodyText"
        style={[styles.cardTitle, selected && styles.selected]}
      >
        {title}
      </StyledText>
      {description && (
        <StyledText
          color={palette.darkerGray}
          variant="paragraph"
          style={[styles.cardContent, selected && styles.selected]}
        >
          {description}
        </StyledText>
      )}
    </Pressable>
  );
};

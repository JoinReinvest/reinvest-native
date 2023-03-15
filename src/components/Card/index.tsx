import React, {PropsWithChildren} from 'react';
import {Pressable} from 'react-native';
import {theme} from '@src/assets/theme';
import StyledText from '../typography/StyledText/StyledText';
import {styles} from './Card.styles';
import {CardProps} from './Card.types';

export const Card = ({
  id,
  title,
  children,
  selected = false,
  onCardPress,
}: PropsWithChildren<CardProps>) => {
  const handleCardPress = () => onCardPress?.(selected ? null : id);

  return (
    <Pressable
      id={id}
      style={[styles.cardWrapper, selected && styles.selected]}
      onPress={handleCardPress}>
      <StyledText
        color={theme.pureWhite}
        variant="bodyText"
        style={[styles.cardTitle, selected && styles.selected]}>
        {title}
      </StyledText>
      <StyledText
        color={theme.darkerGray}
        variant="paragraph"
        style={[styles.cardContent, selected && styles.selected]}>
        {children}
      </StyledText>
    </Pressable>
  );
};

import React, {PropsWithChildren} from 'react';
import {Pressable} from 'react-native';
import {palette} from '@src/constants/theme';
import {StyledText} from '../typography/StyledText';
import {styles} from './styles';
import {CardProps} from './types';

export const Card = <T extends unknown>({
  id,
  title,
  children,
  selected = false,
  onCardPress,
}: PropsWithChildren<CardProps<T>>) => {
  const handleCardPress = () => onCardPress?.(selected ? undefined : id);

  return (
    <Pressable
      id={`${id}`}
      style={[styles.cardWrapper, selected && styles.selected]}
      onPress={handleCardPress}>
      <StyledText
        color={palette.pureWhite}
        variant="bodyText"
        style={[styles.cardTitle, selected && styles.selected]}>
        {title}
      </StyledText>
      <StyledText
        color={palette.darkerGray}
        variant="paragraph"
        style={[styles.cardContent, selected && styles.selected]}>
        {children}
      </StyledText>
    </Pressable>
  );
};

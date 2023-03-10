import React from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from '../Icon';
import {StyledText} from '../typography/StyledText/StyledText';
import {styles} from './styles';
import {AvatarProps} from './types';
import {mapSizeToStyledTextVariantSuffix, computeUserInitials} from './utils';

export const Avatar = ({
  username,
  size = 'm',
  variant = 'individual',
  isEditable = false,
  onPress,
}: AvatarProps) => {
  const textVariant = mapSizeToStyledTextVariantSuffix(size);
  const userInitials = computeUserInitials(username);

  return (
    <Pressable
      disabled={!isEditable}
      onPress={onPress}
      style={[styles.wrapper, styles[size], styles[variant]]}>
      <StyledText
        style={[styles.initials, styles[variant]]}
        variant={`avatarInitials${textVariant}`}>
        {userInitials}
      </StyledText>
      {isEditable && (
        <View style={[styles.edit]}>
          <Icon icon="edit" />
        </View>
      )}
    </Pressable>
  );
};

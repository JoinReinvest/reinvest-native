import React from 'react';
import {Pressable, View} from 'react-native';
import {Icon} from '../Icon';
import {StyledText} from '../typography/StyledText';
import {TextVariants} from '../typography/StyledText/types';
import {styles} from './styles';
import {AvatarProps, AvatarSize} from './types';

const AvatarSizesSuffixes: {[key in AvatarSize]: TextVariants} = {
  xl: 'avatarInitialsExtraLarge',
  l: 'avatarInitialsLarge',
  m: 'avatarInitialsMedium',
  s: 'avatarInitialsSmall',
};

export const computeUserInitials = (username: string) => {
  const namesArr = username.split(' ');
  const firstName = namesArr[0];
  let lastName = '';

  if (namesArr.length > 1) {
    // skip middle name
    lastName = namesArr.pop()!;
  }

  return lastName ? `${firstName[0]}${lastName[0]}` : `${firstName[0]}`;
};

export const Avatar = ({
  username,
  size = 'm',
  variant = 'individual',
  isEditable = false,
  onPress,
}: AvatarProps) => {
  const [firstName, lastName] = username.split(' ');
  const initials = lastName ? `${firstName[0]}${lastName[0]}` : firstName[0];

  return (
    <Pressable
      disabled={!isEditable}
      onPress={onPress}
      style={[styles.wrapper, styles[size], styles[variant]]}>
      <StyledText
        style={[styles.initials, styles[variant], styles.avatarInitialsBase]}
        variant={AvatarSizesSuffixes[size]}>
        {initials}
      </StyledText>
      {isEditable && (
        <View style={[styles.edit]}>
          <Icon icon="edit" />
        </View>
      )}
    </Pressable>
  );
};

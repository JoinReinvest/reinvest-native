import React from 'react';
import { Pressable } from 'react-native';
import Image from 'react-native-fast-image';
import { ImagePickerResponse } from 'react-native-image-picker';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { palette } from '../../constants/theme';
import { Icon } from '../Icon';
import { ImagePicker } from '../ImagePicker';
import { Loader } from '../Loader';
import { StyledText } from '../typography/StyledText';
import { TextVariants } from '../typography/StyledText/types';
import { styles } from './styles';
import { AvatarProps, AvatarSize } from './types';

const AvatarSizesSuffixes: { [key in AvatarSize]: TextVariants } = {
  '2xl': 'avatarInitialsDoubleExtraLarge',
  xl: 'avatarInitialsExtraLarge',
  l: 'avatarInitialsLarge',
  m: 'avatarInitialsMedium',
  s: 'avatarInitialsSmall',
};

const pickerOptions = { maxWidth: 400, maxHeight: 400 };

export const Avatar = ({ uri, initials, size = 'm', variant = AccountType.Individual, isEditable = false, onPress, onImageSelect, isLoading }: AvatarProps) => {
  const handleImageSelect = (response: ImagePickerResponse) => {
    const selectedImage = response.assets?.[0]?.uri;

    onImageSelect?.(selectedImage);
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.wrapper, styles[`${size}`], styles[`${variant}`]]}
    >
      {isLoading ? (
        <Loader
          align={'center'}
          color={palette.pureWhite}
        />
      ) : (
        <>
          <StyledText
            style={[styles.initials, styles[`${variant}`], styles.avatarInitialsBase]}
            variant={AvatarSizesSuffixes[`${size}`]}
          >
            {initials}
          </StyledText>
          {uri && (
            <Image
              style={styles.image}
              source={{ uri }}
              resizeMode="cover"
            />
          )}
          {isEditable && (
            <ImagePicker
              style={[styles.edit]}
              type="library"
              onSelect={handleImageSelect}
              pickerOptions={pickerOptions}
            >
              <Icon icon="edit" />
            </ImagePicker>
          )}
        </>
      )}
    </Pressable>
  );
};

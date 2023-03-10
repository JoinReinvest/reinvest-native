import {AvatarSize} from './types';

export const mapSizeToStyledTextVariantSuffix = (size: AvatarSize) => {
  switch (size) {
    case 'xl':
      return 'ExtraLarge';
    case 'l':
      return 'Large';
    case 'm':
      return 'Medium';
    case 's':
      return 'Small';
  }
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

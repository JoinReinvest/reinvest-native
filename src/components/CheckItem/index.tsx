import React from 'react';
import { View } from 'react-native';

import { palette } from '../../constants/theme';
import { Icon } from '../Icon';
import { StyledText } from '../typography/StyledText';
import { styles } from './styles';

export const CheckItem = ({ isChecked, label, dark = true }: { isChecked: boolean; label: string; dark?: boolean }) => {
  const getTextColor = () => {
    if (!dark && isChecked) {
      return 'pureBlack';
    }

    if (dark && isChecked) {
      return 'pureWhite';
    }

    return 'dark3';
  };

  return (
    <View style={styles.itemWrapper}>
      <StyledText
        variant="paragraphLarge"
        color={getTextColor()}
      >
        {label}
      </StyledText>
      <Icon
        icon="tick"
        color={isChecked ? palette.success : palette.dark3}
      />
    </View>
  );
};

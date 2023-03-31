import { Icon } from '@components/Icon';
import { StyledText } from '@components/typography/StyledText';
import { palette } from '@constants/theme';
import React from 'react';
import { View } from 'react-native';

import { styles } from './styles';

export const CheckItem = ({ isChecked, label }: { isChecked: boolean; label: string }) => {
  return (
    <View style={styles.itemWrapper}>
      <StyledText
        variant="paragraphLarge"
        color={isChecked ? palette.pureWhite : palette.dark3}
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

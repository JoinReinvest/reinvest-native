import {View} from 'react-native';
import {StyledText} from '@components/typography/StyledText';
import {palette} from '@constants/theme';
import {Icon} from '@components/Icon';
import React from 'react';
import {styles} from './styles';

export const CheckItem = ({
  isChecked,
  label,
}: {
  isChecked: boolean;
  label: string;
}) => {
  return (
    <View style={styles.itemWrapper}>
      <StyledText color={palette.pureWhite}>{label}</StyledText>
      <Icon
        icon={'tick'}
        color={isChecked ? palette.success : palette.pureWhite}
      />
    </View>
  );
};

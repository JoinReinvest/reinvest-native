import { CheckItem } from '@components/CheckItem';
import React, { useMemo } from 'react';
import { View } from 'react-native';

import { styles } from './styles';

interface ReferralCodeCheckListProps {
  referralCode: string;
}

export const ReferralCodeCheckList = ({ referralCode = '' }: ReferralCodeCheckListProps) => {
  const digitsCheck = referralCode.length >= 6 && /^\d+$/.test(referralCode);
  // TODO right now validation is unclear
  const isInvalid = true;

  const checks = useMemo<[string, boolean][]>(
    () => [
      ['6 Digits', digitsCheck],
      ['Invalid Code', isInvalid],
    ],
    [digitsCheck, isInvalid],
  );

  return (
    <View style={styles.wrapper}>
      {checks.map(([label, isChecked]) => (
        <CheckItem
          key={label}
          label={label}
          isChecked={isChecked}
        />
      ))}
    </View>
  );
};

import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { formValidationRules } from '../../utils/formValidationRules';
import { CheckItem } from '../CheckItem';
import { styles } from './styles';

interface AuthenticationCodeCheckListProps extends ViewProps {
  code: string;
}

export const ReferralCodeCheckList = ({ code = '', ...props }: AuthenticationCodeCheckListProps) => {
  const isValid = formValidationRules.referralCode.safeParse(code).success;

  const checks = useMemo<[string, boolean][]>(
    () => [
      ['Valid Code', isValid],
      ['Invalid Code', !isValid],
    ],
    [isValid],
  );

  return (
    <View
      style={styles.wrapper}
      {...props}
    >
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

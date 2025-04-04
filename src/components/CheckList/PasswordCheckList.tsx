import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { CheckItem } from '../CheckItem';
import { styles } from './styles';

interface PasswordCheckListProps extends ViewProps {
  password: string;
  passwordConfirmation: string;
  dark?: boolean;
}

export const PasswordChecklist = ({ password = '', passwordConfirmation = '', dark = true, ...props }: PasswordCheckListProps) => {
  const hasLowerCaseLetter = password.toUpperCase() != password;
  const hasUpperCaseLetter = password.toLowerCase() != password;
  const hasNumber = /\d/.test(password);
  const hasMinimumLength = password.length >= 8;
  const passwordsMatch = password.length > 0 && password === passwordConfirmation;

  const checks = useMemo<[string, boolean][]>(
    () => [
      ['A lower case letter', hasLowerCaseLetter],
      ['An upper case letter', hasUpperCaseLetter],
      ['A number', hasNumber],
      ['Minimum 8 characters', hasMinimumLength],
      ['Passwords must match', passwordsMatch],
    ],
    [hasLowerCaseLetter, hasUpperCaseLetter, hasNumber, hasMinimumLength, passwordsMatch],
  );

  return (
    <View
      style={styles.wrapper}
      {...props}
    >
      {checks.map(([label, isChecked]) => (
        <CheckItem
          dark={dark}
          key={label}
          label={label}
          isChecked={isChecked}
        />
      ))}
    </View>
  );
};

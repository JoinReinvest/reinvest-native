import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { AmountsOption, INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';

import { Box } from '../../../../components/Containers/Box/Box';
import { Row } from '../../../../components/Containers/Row';
import { Input } from '../../../../components/Input';
import { StyledText } from '../../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { styles } from './styles';
import { Props } from './types';

export const InvestingAmountTable = ({ setAmount, amount, bankAccount, error, accountType, accountId }: Props) => {
  const presets = INVESTMENT_PRESET_AMOUNTS[accountType];
  const optionValue = presets.find(option => option.value === amount?.toString());
  const [customAmount, setCustomAmount] = useState((!optionValue && amount) || '');
  const { navigate } = useLogInNavigation();
  const inputRef = useRef<TextInput>(null);

  const setCustomValue = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const selectValueFromOptions = (option: AmountsOption) => {
    setCustomAmount('');
    inputRef.current?.blur();
    setAmount(option.value);
  };

  const openPlaid = () => {
    navigate(Screens.BankAccount, { sourceScreen: Screens.Investing, isUpdatingAccount: true, accountId });
  };

  return (
    <Box
      style={[styles.wrapper, styles.bordered]}
      p={'16'}
    >
      <Row
        style={styles.optionsRow}
        justifyContent={'space-between'}
      >
        {presets.map(preset => {
          const isActive = preset.value === (amount?.toString() || '');

          return (
            <Box
              onPress={() => selectValueFromOptions(preset)}
              style={[styles.tile, styles.bordered, isActive && styles.activeTile]}
              py={'16'}
              key={preset.value}
              justifyContent={'center'}
            >
              <StyledText
                variant={'button'}
                textAlign={'center'}
                color={isActive ? 'pureWhite' : 'pureBlack'}
              >
                {preset.label}
              </StyledText>
            </Box>
          );
        })}
      </Row>
      <Box pt={'16'}>
        <Input
          ref={inputRef}
          placeholder={'+ Add custom amount'}
          dark={false}
          keyboardType={'numeric'}
          value={customAmount.toString()}
          onChangeText={setCustomValue}
          error={error}
        />
      </Box>
      <StyledText>{`Checking ${bankAccount}`}</StyledText>
      <Box py={'16'}>
        <StyledText variant={'paragraphSmall'}>{`You can have 1 bank account connected to your REINVEST profile.`}</StyledText>
      </Box>
      <StyledText
        onPress={openPlaid}
        variant={'link'}
      >
        Change Bank Account
      </StyledText>
    </Box>
  );
};

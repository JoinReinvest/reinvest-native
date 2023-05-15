import React, { useState } from 'react';
import { INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';

import { Box } from '../../../../components/Containers/Box/Box';
import { Row } from '../../../../components/Containers/Row';
import { Input } from '../../../../components/Input';
import { StyledText } from '../../../../components/typography/StyledText';
import { useLogInNavigation } from '../../../../navigation/hooks';
import Screens from '../../../../navigation/screens';
import { styles } from './styles';
import { Props } from './types';

type Option = (typeof INVESTMENT_PRESET_AMOUNTS)[0];
export const InvestingAmountTable = ({ setAmount, amount, bankAccount }: Props) => {
  const optionValue = INVESTMENT_PRESET_AMOUNTS.find(option => option.value === amount);
  const [selectedFromOptions, setSelectedFromOptions] = useState<Option | undefined>(optionValue);
  const [customAmount, setCustomAmount] = useState((!optionValue && amount) || '');
  const { navigate } = useLogInNavigation();
  const setCustomValue = (value: string) => {
    setCustomAmount(value);
    setAmount(value);
  };

  const selectValueFromOptions = (option: Option) => {
    setSelectedFromOptions(option);
    setCustomAmount('');
    setAmount(option.value);
  };

  const openPlaid = () => {
    navigate(Screens.BankAccount, { sourceScreen: Screens.Investing, isUpdatingAccount: true });
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
        {INVESTMENT_PRESET_AMOUNTS.map(preset => {
          const isActive = preset.value === selectedFromOptions?.value && customAmount.length === 0;

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
          placeholder={'+ Add custom amount'}
          dark={false}
          keyboardType={'numeric'}
          value={customAmount}
          onChangeText={setCustomValue}
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

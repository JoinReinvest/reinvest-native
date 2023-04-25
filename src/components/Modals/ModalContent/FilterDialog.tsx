import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TextInput, View } from 'react-native';
import { SelectOption, SelectOptions } from 'reinvest-app-common/src/types/select-option';

import { palette } from '../../../constants/theme';
import { useDialog } from '../../../providers/DialogProvider';
import { Box } from '../../Containers/Box/Box';
import { Icon } from '../../Icon';
import { Input } from '../../Input';
import { InputProps } from '../../Input/types';
import { PaddedScrollView } from '../../PaddedScrollView';
import { StyledText } from '../../typography/StyledText';
import { styles } from './styles';

interface SearchViewProps extends InputProps {
  fillDetailsCallback: (value: string) => void;
  options: SelectOptions;
  dark?: boolean;
  value?: string;
}

export const FilterDialog = ({ fillDetailsCallback, options, dark = true, value, ...rest }: SearchViewProps) => {
  const inputRef = useRef<TextInput>(null);
  const [searchValue, setSearchValue] = useState<string>(value || '');
  const { closeDialog } = useDialog();

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const list = useMemo<SelectOptions>(() => {
    if (!searchValue) {
      return options;
    } else {
      return options?.filter(option => {
        return option.label.toLowerCase().includes(searchValue.toLowerCase());
      });
    }
  }, [options, searchValue]);

  const pickValue = (value: string) => {
    fillDetailsCallback(value);
    closeDialog();
  };

  return (
    <View
      pointerEvents={'box-none'}
      style={[styles.sheetContentWrapper, dark && styles.dark]}
    >
      <Box px={'default'}>
        <Input
          dark={dark}
          ref={inputRef}
          onChangeText={setSearchValue}
          value={searchValue}
          onSubmit={() => pickValue(list?.length ? (list[0] as SelectOption).label : '')}
          {...rest}
          rightSection={
            !!searchValue.length && (
              <Icon
                size={'s'}
                color={palette.pureWhite}
                icon={'hamburgerClose'}
                onPress={() => setSearchValue('')}
              />
            )
          }
        />
      </Box>

      {!!list?.length && (
        <PaddedScrollView keyboardShouldPersistTaps={'handled'}>
          {list.map((el, idx) => {
            return (
              <Box
                style={[list.length > idx + 1 && styles.bottomBordered]}
                py={'12'}
                key={el.value}
              >
                <StyledText
                  color={dark ? 'pureWhite' : 'pureBlack'}
                  onPress={() => pickValue(el.label)}
                >
                  {el.label}
                </StyledText>
              </Box>
            );
          })}
        </PaddedScrollView>
      )}
    </View>
  );
};

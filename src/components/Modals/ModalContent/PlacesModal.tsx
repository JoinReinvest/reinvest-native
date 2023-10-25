import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import { AddressAsOption } from 'reinvest-app-common/src/services/address/interfaces';
import { Address } from 'reinvest-app-common/src/types/graphql';

import { palette } from '../../../constants/theme';
import { useDebounce } from '../../../hooks/useDebounce';
import { useDialog } from '../../../providers/DialogProvider';
import { addressService } from '../../../services/address.service';
import { Box } from '../../Containers/Box/Box';
import { FormMessage } from '../../Forms/FormMessage';
import { Icon } from '../../Icon';
import { Input } from '../../Input';
import { InputProps } from '../../Input/types';
import { Loader } from '../../Loader';
import { StyledText } from '../../typography/StyledText';
import { styles } from './styles';

interface SearchViewProps extends InputProps {
  fillDetailsCallback: (option: Address) => void;
  noPadding?: boolean;
  shouldDismissModal?: boolean;
  value?: string;
}

export const SearchDialog = ({ fillDetailsCallback, shouldDismissModal = true, dark, value, noPadding = false, ...rest }: SearchViewProps) => {
  const inputRef = useRef<TextInput>(null);
  const [searchValue, setSearchValue] = useState<string>(value || '');
  const [list, setList] = useState<AddressAsOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const { closeDialog } = useDialog();

  const getAddressSuggestions = useCallback(async (query: string) => {
    try {
      const response = await addressService.getSuggestions(query);
      setLoading(false);

      return setList(response.map(res => ({ ...res, fullAddress: res.fullAddress?.replace(' USA', '') })));
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const getPredictions = useDebounce(getAddressSuggestions, 700);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (searchValue?.length > 2) {
      setLoading(true);
      setError(undefined);
      getPredictions(searchValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const parseDetails = async (placeId: string) => {
    setLoading(true);
    const details = await addressService.getAddressFromPlaceId(placeId);
    fillDetailsCallback(details);
    setLoading(false);
    shouldDismissModal && closeDialog();
  };

  return (
    <View
      pointerEvents={'box-none'}
      style={[styles.sheetContentWrapper, dark && styles.dark]}
    >
      <Box
        px={noPadding ? undefined : 'default'}
        fw={noPadding}
      >
        <Input
          dark={dark}
          ref={inputRef}
          onChangeText={setSearchValue}
          value={searchValue}
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
        {loading && (
          <Box alignItems="center">
            <Loader color={palette.pureWhite} />
          </Box>
        )}
        {error && !loading && (
          <FormMessage
            message={error}
            variant="error"
          />
        )}
        {!!list.length && (
          <ScrollView keyboardShouldPersistTaps={'handled'}>
            {list.map((el, idx) => {
              return (
                <Box
                  style={[list.length > idx + 1 && styles.bottomBordered, !dark && styles.borderLight]}
                  py={'12'}
                  key={el.fullAddress}
                >
                  <StyledText
                    color={dark ? 'pureWhite' : 'pureBlack'}
                    onPress={() => parseDetails(el?.placeId ?? '')}
                  >
                    {el.fullAddress}
                  </StyledText>
                </Box>
              );
            })}
          </ScrollView>
        )}
      </Box>
    </View>
  );
};

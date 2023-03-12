import React, {RefObject} from 'react';
import {Controller as ControllerBase} from 'react-hook-form';
import {TextInput} from 'react-native';
import {Input} from '@components/Input';
import {ControllerProps} from './types';

export const Controller = ({
  control,
  fieldName,
  onSubmit,
  inputProps,
  ...props
}: ControllerProps) => {
  const Comp = Input;
  return (
    <ControllerBase
      name={fieldName}
      control={control}
      rules={{
        required: true,
      }}
      render={({
        field: {onChange, onBlur, value, ref},
        fieldState: {error},
      }) => {
        return (
          <Comp
            onBlur={onBlur}
            onSubmit={onSubmit}
            value={value}
            inputRef={ref as unknown as RefObject<TextInput>}
            onChangeText={onChange}
            secureTextEntry={/password/gim.test(fieldName)}
            {...inputProps}
            error={error?.message}
          />
        );
      }}
      {...props}
    />
  );
};

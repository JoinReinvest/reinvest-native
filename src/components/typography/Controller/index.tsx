import React from 'react';
import {Controller as ControllerBase} from 'react-hook-form';
import {Input} from '@components/Input';
import {ControllerProps} from './types';
import {Dropdown} from '@src/components/Dropdown';

export const Controller = ({
  select = false,
  control,
  fieldName,
  onSubmit,
  inputProps,
  dropdownProps,
  ...props
}: ControllerProps) => {
  const Comp = select ? Dropdown : Input;
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
            ref={ref}
            onChangeText={onChange}
            secureTextEntry={/password/gim.test(fieldName)}
            autoCapitalize={/email/gim.test(fieldName) ? 'none' : undefined}
            {...(select
              ? {
                  ...dropdownProps,
                  onSelect: selected =>
                    onChange({target: {value: selected.value}}),
                }
              : inputProps)}
            error={error?.message}
          />
        );
      }}
      {...props}
    />
  );
};

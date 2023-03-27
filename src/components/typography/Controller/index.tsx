import { Input } from '@components/Input';
import React from 'react';
import { Controller as ControllerBase } from 'react-hook-form';

import { ControllerProps } from './types';

export const Controller = ({ control, fieldName, onSubmit, inputProps, ...props }: ControllerProps) => {
  const Comp = Input;

  return (
    <ControllerBase
      name={fieldName}
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
        return (
          <Comp
            onBlur={onBlur}
            onSubmit={onSubmit}
            value={value}
            ref={ref}
            onChangeText={onChange}
            secureTextEntry={/password/gim.test(fieldName)}
            autoCapitalize={/email/gim.test(fieldName) ? 'none' : undefined}
            {...inputProps}
            error={error?.message}
          />
        );
      }}
      {...props}
    />
  );
};

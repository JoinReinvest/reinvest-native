import React from 'react';
import { Controller as ControllerBase } from 'react-hook-form';

import { Dropdown } from '../../Dropdown';
import { Input } from '../../Input';
import { TextArea } from '../../TextArea';
import { ControllerProps, InputType } from './types';

const getComponent = (type: InputType) => {
  switch (type) {
    case 'input':
      return Input;
    case 'textarea':
      return TextArea;
    case 'dropdown':
      return Dropdown;
    default:
      return Input;
  }
};

export const Controller = ({ type = 'input', control, fieldName, onSubmit, trimmed, inputProps, dropdownProps, ...props }: ControllerProps) => {
  const Comp = getComponent(type);

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
            onChangeText={value => (trimmed ? onChange(value.trimStart()) : onChange(value))}
            secureTextEntry={/password/gim.test(fieldName)}
            autoCapitalize={/email/gim.test(fieldName) ? 'none' : undefined}
            {...(type === 'dropdown'
              ? {
                  ...dropdownProps,
                  onSelect: selected => {
                    onChange({ target: { value: selected.label } });
                    dropdownProps?.onSelect?.(selected);
                  },
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

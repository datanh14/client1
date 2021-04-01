import {
  FormControl,
  FormHelperText,
  InputBaseProps,
  InputLabel,
} from '@material-ui/core';
import { RED } from '../../assets/theme/colors';
import React from 'react';
import { BootstrapInput, redMark, useStylesForm } from './Form';

export interface FormControlTextFieldProps extends InputBaseProps {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  errorMessage?: string;
  optional?: boolean;
  focused?: boolean;
  helpText?: string;
  className?: string;
  disableError?: boolean;
}

const FormControlTextField = (props: FormControlTextFieldProps) => {
  const classes = useStylesForm();
  const {
    id,
    label,
    formControlStyle,
    errorMessage,
    optional,
    focused,
    value,
    fullWidth,
    helpText,
    className,
    disableError,
    ...rest
  } = props;

  return (
    <FormControl
      focused={focused}
      className={classes.margin}
      style={{ minWidth: 200, ...formControlStyle }}
      // error={focused ? false : !!errorMessage}
      fullWidth
    >
      {label && (
        <InputLabel shrink htmlFor={id}>
          {label}
          {!optional && <>&nbsp;{redMark}</>}
        </InputLabel>
      )}
      <BootstrapInput
        className={className}
        id={id}
        value={value || ''}
        {...rest}
        error={focused ? false : !!errorMessage}
      />
      {!disableError && (
        <FormHelperText
          id={id}
          style={{
            minHeight: 20,
            fontSize: helpText ? 12 : 14,
            color: errorMessage ? RED : undefined,
          }}
        >
          {errorMessage || helpText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default React.memo(FormControlTextField);

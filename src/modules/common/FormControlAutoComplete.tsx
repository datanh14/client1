import {
  FormControl,
  FormHelperText,
  InputLabel,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import {
  Autocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from '@material-ui/lab';
import { debounce } from 'lodash';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { BLUE, GREY_300, PRIMARY } from '../../assets/theme/colors';
import { redMark, useStylesForm } from './Form';

const autocompleteCS = makeStyles(() => ({
  endAdornment: {
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
  },
  option: {
    padding: 0,
  },
}));

// interface T extends Object {}

interface FormControlAutoCompleteProps<
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>
  extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    'renderInput'
  > {
  id?: string;
  label?: React.ReactNode;
  formControlStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  errorMessage?: string;
  disableError?: boolean;
  placeholder?: string;
  optional?: boolean;
  renderInput?: (params: AutocompleteRenderInputParams) => React.ReactNode;
  loadOptions?: (input: string) => Promise<T[]>;
  startAdornment?: JSX.Element;
  endAdornment?: JSX.Element;
  iRef?: React.RefObject<HTMLDivElement>;
  readOnly?: boolean;
}

function usePrevious(value: any) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const FormControlAutoComplete: <
  T,
  Multiple extends boolean | undefined = undefined,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
>(
  prop: FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
) => React.ReactElement<
  FormControlAutoCompleteProps<T, Multiple, DisableClearable, FreeSolo>
> = (props) => {
  const classes = useStylesForm();
  const classesComplete = autocompleteCS(props);
  const {
    id,
    label,
    placeholder,
    errorMessage,
    disableError,
    formControlStyle,
    optional,
    renderInput,
    options,
    loadOptions,
    getOptionLabel,
    startAdornment,
    endAdornment,
    inputStyle,
    labelStyle,
    iRef,
    readOnly,
    ...rest
  } = props;

  const [firstOption, setFirstOption] = React.useState<typeof options>(options);
  const [optionsTmp, setOption] = React.useState<typeof options>(options);
  const previous = usePrevious(optionsTmp);
  const [focus, setFocus] = React.useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onLoadOptions = React.useCallback(
    debounce(
      async (input: string) => {
        if (loadOptions) {
          if (input) {
            const data = await loadOptions(input);
            if (data && data.length > 0) {
              setOption(data);
              return;
            }
          }
          setOption(firstOption);
        }
      },
      500,
      {
        trailing: true,
        leading: false,
      }
    ),
    []
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onFirstLoadOptions = React.useCallback(
    debounce(
      async (input: string) => {
        if (loadOptions) {
          const data = await loadOptions(input);
          if (data && data.length > 0) {
            setOption(data);
            setFirstOption(data);
          }
        }
      },
      500,
      {
        trailing: true,
        leading: false,
      }
    ),
    []
  );

  React.useEffect(() => {
    if (loadOptions && options.length === 0) {
      onFirstLoadOptions('');
    } else {
      setOption(options);
    }
  }, [loadOptions, onFirstLoadOptions, options]);

  React.useEffect(() => {
    if (!loadOptions && previous !== options) {
      setOption(options);
    }
  }, [loadOptions, options, previous]);

  return (
    <FormControl
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={formControlStyle}
      error={!!errorMessage}
    >
      {label && (
        <InputLabel
          shrink
          htmlFor={id}
          style={{
            marginBottom: 4,
            position: 'relative',
            color: focus ? PRIMARY : undefined,
            ...labelStyle,
          }}
        >
          {label}
          {!optional && <> &nbsp;{redMark}</>}
        </InputLabel>
      )}
      <Autocomplete
        id={id}
        classes={{
          endAdornment: classesComplete.endAdornment,
          option: classesComplete.option,
        }}
        size="small"
        options={optionsTmp || []}
        onInputChange={(event: object, value: string, reason: string) => {
          reason === 'input' && loadOptions && onLoadOptions(value);
          (reason === 'clear' || value === '') &&
            loadOptions &&
            setOption(options.length ? options : firstOption);
        }}
        noOptionsText={<FormattedMessage id="IDS_NO_OPTION" />}
        renderInput={
          renderInput ||
          ((params) => (
            <TextField
              {...params}
              inputRef={iRef}
              fullWidth
              placeholder={placeholder}
              className={classes.bootstrap}
              inputProps={{
                ...params.inputProps,
                autoComplete: 'off',
                style: { padding: 8 },
              }}
              InputProps={{
                ...params.InputProps,
                readOnly,
                style: {
                  minHeight: 34,
                  padding: '0 4px',
                  ...inputStyle,
                },
                startAdornment: (
                  <>
                    {startAdornment}
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    {endAdornment}
                  </>
                ),
              }}
              onChange={(e) => {}}
              variant="outlined"
              size="small"
              error={focus ? undefined : !!errorMessage}
            />
          ))
        }
        getOptionLabel={getOptionLabel}
        renderOption={(option, { selected }) => (
          <ListItem
            role={undefined}
            dense
            button
            style={{
              background: selected ? GREY_300 : undefined,
              overflow: 'hidden',
            }}
          >
            <Typography
              variant="body2"
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                flex: 1,
              }}
            >
              {getOptionLabel && getOptionLabel(option)}
            </Typography>
            <DoneIcon
              style={{
                opacity: 0.6,
                width: 18,
                height: 18,
                visibility: selected ? 'visible' : 'hidden',
                color: BLUE,
                justifySelf: 'flex-end',
              }}
            />
          </ListItem>
        )}
        autoComplete
        {...rest}
      />
      {!disableError && (
        <FormHelperText id={id} style={{ minHeight: 20 }}>
          {errorMessage}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default FormControlAutoComplete;

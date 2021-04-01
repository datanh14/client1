import {
  ClickAwayListener,
  Fade,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Popper,
  Typography,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import IconClose from "@material-ui/icons/CloseOutlined";
import DoneIcon from "@material-ui/icons/Done";
import { remove } from "lodash";
import React from "react";
import { useIntl } from "react-intl";
import { BLUE, GREY_300 } from "../../assets/theme/colors";
import { some } from "../../constants/constants";
import FormControlTextField, {
  FormControlTextFieldProps,
} from "./FormControlTextField";

interface CommonProps<T> extends FormControlTextFieldProps {
  getOptionLabel?: (option: T) => string;
  valueKey?: (option: T) => any;
  disableCloseIcon?: boolean;
  options: T[];
  openPopper?: boolean;
}
interface SingleProps<T> extends CommonProps<T> {
  multiple?: false;
  value?: any;
  onSelectOption?: (value?: any) => void;
}
interface MultiProps<T> extends CommonProps<T> {
  multiple: true;
  value?: any[];
  onSelectOption?: (value?: any[]) => void;
}

export type SelectProps<T> = MultiProps<T> | SingleProps<T>;

export const SingleSelect: <T extends some>(
  prop: SelectProps<T>
) => React.ReactElement<SelectProps<T>> = (props) => {
  const {
    options,
    valueKey,
    getOptionLabel: getLabel,
    multiple,
    onSelectOption: test,
    id,
    disabled,
    disableCloseIcon,
    openPopper,
    ...rest
  } = props;
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<any>();
  const intl = useIntl();
  const handleClick = () => {
    !disabled && setOpen(true);
  };

  const getValueKey = React.useCallback(
    (one: typeof options[number]) => {
      return valueKey ? valueKey(one) : one?.id;
    },
    [valueKey]
  );

  const getOptionLabel = React.useCallback(
    (one: typeof options[number]) => {
      return getLabel ? getLabel(one) : one.name;
    },
    [getLabel]
  );
  const isChecked = React.useCallback(
    (one: typeof options[number]) => {
      if (props.multiple) {
        const { value } = props;
        return value && value?.length > 0
          ? value?.findIndex((v) => v === getValueKey(one)) !== -1
          : false;
      }
      const { value } = props;
      return value === getValueKey(one);
    },
    [getValueKey, props]
  );

  const onSelectValue = React.useCallback(
    (one: typeof options[number], index?: number) => {
      if (props.multiple) {
        const { value, onSelectOption } = props;
        let tmp;
        if (isChecked(one)) {
          tmp = value ? remove(value, (v) => v !== getValueKey(one)) : [];
        } else {
          tmp = value ? [...value, getValueKey(one)] : [getValueKey(one)];
        }
        const hasAll = tmp.filter((v) => v === undefined);
        const noUndefinedValue = tmp.filter((v: any) => v !== undefined);
        const noUndefinedOptions = options.filter(
          (v) => getValueKey(v) !== undefined
        );
        if (
          hasAll?.length > 0 ||
          (noUndefinedValue?.length === noUndefinedOptions?.length &&
            options?.length !== noUndefinedOptions?.length)
        ) {
          onSelectOption && onSelectOption([]);
        } else {
          onSelectOption && onSelectOption(tmp);
        }
      } else {
        const { onSelectOption } = props;
        onSelectOption && onSelectOption(getValueKey(one));
        setOpen(false);
      }
    },
    [getValueKey, isChecked, options, props]
  );

  const getTextInput = React.useMemo(() => {
    if (props.multiple) {
      const { value } = props;
      if (value?.length === options.length) {
        return intl.formatMessage({ id: "all" });
      }
      return value && value.length > 0
        ? options
            .filter((v) => value.includes(getValueKey(v)))
            .map((v) => getOptionLabel(v))
            .join(", ")
        : "";
    }
    const { value } = props;
    const tmp = options?.find((one) => getValueKey(one) === value);
    return tmp && getOptionLabel(tmp);
  }, [getOptionLabel, getValueKey, intl, options, props]);

  const renderClose = React.useCallback(() => {
    if (disableCloseIcon || !open) {
      return null;
    }
    if (props.multiple) {
      const { value, onSelectOption } = props;
      if (value && value?.length > 0) {
        return (
          <IconButton
            style={{ padding: 2 }}
            onClick={() => {
              onSelectOption && onSelectOption([]);
            }}
          >
            <IconClose style={{ height: 23, width: 23 }} />
          </IconButton>
        );
      }
    } else {
      const { value, onSelectOption } = props;
      if (value) {
        return (
          <IconButton
            style={{ padding: 2 }}
            onClick={() => {
              onSelectOption && onSelectOption(undefined);
            }}
          >
            <IconClose style={{ height: 23, width: 23 }} />
          </IconButton>
        );
      }
    }
  }, [disableCloseIcon, open, props]);

  React.useEffect(() => {
    openPopper !== undefined && setOpen(openPopper);
  }, [openPopper]);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div>
        <FormControlTextField
          {...rest}
          formControlStyle={{ margin: 0 }}
          id={id}
          readOnly
          focused={open}
          disabled={disabled}
          value={getTextInput || ""}
          innerRef={inputRef}
          endAdornment={
            <InputAdornment position="end">
              {renderClose()}
              <IconButton style={{ padding: 2 }}>
                <ArrowDropDownIcon
                  style={{ transform: open ? "rotate(180deg)" : undefined }}
                />
              </IconButton>
            </InputAdornment>
          }
          inputProps={{
            ...rest.inputProps,
            style: { textOverflow: "ellipsis", ...rest.inputProps?.style },
          }}
          onClick={handleClick}
        />
        <Popper
          open={open}
          anchorEl={inputRef?.current}
          style={{
            width: inputRef?.current?.offsetWidth,
            margin: "4px 0px",
            zIndex: 1300,
          }}
          placement="bottom"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List>
                  {multiple && (
                    <ListItem
                      role={undefined}
                      dense
                      button
                      onClick={() => {
                        if (props.multiple) {
                          const { value, onSelectOption } = props;
                          if (value?.length === options.length) {
                            onSelectOption && onSelectOption([]);
                          } else {
                            onSelectOption &&
                              onSelectOption(
                                options.map((v) => getValueKey(v))
                              );
                          }
                        }
                      }}
                      style={{
                        background:
                          props.value?.length === options.length
                            ? GREY_300
                            : undefined,
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="body2"
                        style={{
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          flex: 1,
                        }}
                      >
                        {intl.formatMessage({ id: "all" })}
                      </Typography>
                      <DoneIcon
                        style={{
                          opacity: 0.6,
                          width: 18,
                          height: 18,
                          visibility:
                            props.value?.length === options.length
                              ? "visible"
                              : "hidden",
                          color: BLUE,
                          justifySelf: "flex-end",
                        }}
                      />
                    </ListItem>
                  )}
                  {options?.length > 0 &&
                    options.map(
                      (one: typeof options[number], index: number) => (
                        <ListItem
                          key={index}
                          role={undefined}
                          dense
                          button
                          onClick={() => {
                            onSelectValue(one, index);
                          }}
                          style={{
                            background: isChecked(one) ? GREY_300 : undefined,
                            overflow: "hidden",
                          }}
                        >
                          <Typography
                            variant="body2"
                            style={{
                              textOverflow: "ellipsis",
                              overflow: "hidden",
                              whiteSpace: "nowrap",
                              flex: 1,
                            }}
                          >
                            {getOptionLabel && getOptionLabel(one)}
                          </Typography>
                          <DoneIcon
                            style={{
                              opacity: 0.6,
                              width: 18,
                              height: 18,
                              visibility: isChecked(one) ? "visible" : "hidden",
                              color: BLUE,
                              justifySelf: "flex-end",
                            }}
                          />
                        </ListItem>
                      )
                    )}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default SingleSelect;

import {
  IconButton,
  Switch,
  Theme,
  Tooltip,
  Typography,
  Card,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { AlertProps } from '@material-ui/lab/Alert';
import { OptionsObject, SnackbarMessage } from 'notistack';
import React from 'react';
import MaskedInput from 'react-text-mask';
import styled from 'styled-components';
import { GREY_100, GREY_500, PRIMARY, RED } from '../../assets/theme/colors';

export const redMark = <span style={{ color: RED }}>*</span>;

export const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${GREY_100};
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${GREY_100};
`;

export const Wrapper = styled.div`
  border-radius: 4px;
  position: absolute;
  top: 0;
  left: 0;
  transition: all 300ms;
  min-width: 100%;
  overflow: hidden;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldDiv = styled.div`
  margin-right: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export function snackbarSetting(
  closeSnackbar: (key: string) => void,
  alertProps?: AlertProps,
  alertTitle?: React.ReactNode
) {
  return {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right',
    },
    preventDuplicate: true,
    autoHideDuration: 3000,
    // persist: true,
    content: (key: string, msg: SnackbarMessage) => (
      <Alert
        style={{ minWidth: '240px' }}
        onClose={() => closeSnackbar(key)}
        severity={alertProps?.color}
        {...alertProps}
      >
        {alertTitle && <AlertTitle>{alertTitle}</AlertTitle>}
        <Typography variant="body2" color="inherit">
          {msg}
        </Typography>
      </Alert>
    ),
  } as OptionsObject;
}

export const IconButtonStyled = withStyles({
  root: {
    stroke: GREY_500,
    '&:hover': {
      stroke: PRIMARY,
    },
  },
})(IconButton);

export const LightTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    border: `0.5px solid ${GREY_500}`,
    color: theme.palette.text.primary,
    fontSize: theme.typography.caption.fontSize,
    borderRadius: 0,
    boxSizing: 'border-box',
    fontWeight: 'normal',
  },
}))(Tooltip);

interface DateMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
  placeholder: string;
}

export const DateMaskCustomRange = (props: DateMaskCustomProps) => {
  const { inputRef, placeholder, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
        ' ',
        '-',
        ' ',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        '/',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholder={placeholder}
      guide={false}
      // placeholderChar="\u2000"
      keepCharPositions
    />
  );
};

export const TimeMaskCustom = (props: DateMaskCustomProps) => {
  const { inputRef, placeholder, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/[01]?[0-9]|2[0-3]/, ':', /[0-5][0-9]/]}
      placeholder={placeholder}
      guide={false}
    />
  );
};

export const DateMaskCustomSingle = (props: DateMaskCustomProps) => {
  const { inputRef, placeholder, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
      placeholder={placeholder}
      guide={false}
    />
  );
};

export const YearMaskCustomSingle = (props: DateMaskCustomProps) => {
  const { inputRef, placeholder, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref: any) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/]}
      placeholder={placeholder}
      guide={false}
    />
  );
};
export const RenderTag = (value: any[], e: any, label?: string) => {
  return (
    <Tooltip title={value.map((v) => (label ? v[label] : v.name)).join(', ')}>
      <Typography
        variant="body2"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: 150,
          paddingLeft: 8,
        }}
      >
        {value.map((v) => (label ? v[label] : v.name)).join(', ')}
      </Typography>
    </Tooltip>
  );
};

export const RenderTagString = (value: string[], e: any) => {
  return (
    <Tooltip title={value.join(', ')}>
      <Typography
        variant="body2"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: 150,
          paddingLeft: 8,
        }}
      >
        {value.join(', ')}
      </Typography>
    </Tooltip>
  );
};

export const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.grey[500],
    },
    checked: {},
  })
)(Switch);

export const AntSwitchLarge = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 40,
      height: 20,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&$checked': {
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 16,
      height: 16,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.common.white}`,
      borderRadius: 20 / 2,
      opacity: 1,
      backgroundColor: theme.palette.grey[500],
    },
    checked: {},
  })
)(Switch);

export const CardCustom = withStyles(() => ({
  root: {
    '&:hover': {
      boxShadow:
        '0px 4px 9px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    cursor: 'pointer',
    padding: '12px 16px',
    display: 'flex',
    minHeight: 148,
    justifyContent: 'flex-start',
    flex: 1,
    border: 'none',
    borderRadius: 12,
  },
}))(Card);

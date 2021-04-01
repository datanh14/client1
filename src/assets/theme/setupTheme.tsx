import { createMuiTheme, darken, fade } from '@material-ui/core/styles';
// import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
// import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import { some } from '../../constants/constants';
import {
  BLACK,
  BLUE,
  GREEN,
  GREY,
  GREY_100,
  GREY_400,
  GREY_500,
  GREY_900,
  ORANGE,
  PRIMARY,
  SECONDARY,
  WHITE,
} from './colors';

// ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme({
  reactDates: {
    // ...DefaultTheme.reactDates,
    color: {
      // ...DefaultTheme.reactDates.color,
      selected: {
        // ...DefaultTheme.reactDates.color.selected,
        backgroundColor: PRIMARY,
        backgroundColor_active: PRIMARY,
        backgroundColor_hover: PRIMARY,
        borderColor: PRIMARY,
        borderColor_active: PRIMARY,
        borderColor_hover: PRIMARY,
      },
      selectedSpan: {
        backgroundColor: fade(PRIMARY, 0.2),
        backgroundColor_active: fade(PRIMARY, 0.2),
        backgroundColor_hover: fade(PRIMARY, 0.2),
        borderColor: fade(PRIMARY, 0.2),
        borderColor_active: fade(PRIMARY, 0.2),
        borderColor_hover: fade(PRIMARY, 0.2),
      },
      hoveredSpan: {
        backgroundColor: fade(PRIMARY, 0.2),
        backgroundColor_active: fade(PRIMARY, 0.2),
        backgroundColor_hover: fade(PRIMARY, 0.2),
        borderColor: fade(PRIMARY, 0.2),
        borderColor_active: fade(PRIMARY, 0.2),
        borderColor_hover: fade(PRIMARY, 0.2),
      },
    },
  },
});

export const THEME = {
  primary: PRIMARY,
  secondary: SECONDARY,
};

const typography: some = {
  htmlFontSize: 14,
  fontSize: 14,
  h1: { fontSize: 96, lineHeight: '134px', fontWeight: 'light' },
  h2: { fontSize: 60, lineHeight: '90px', fontWeight: 'light' },
  h3: { fontSize: 48, lineHeight: '72px', fontWeight: 'normal' },
  h4: { fontSize: 34, lineHeight: '48px', fontWeight: 'normal' },
  h5: { fontSize: 24, lineHeight: '34px', fontWeight: 'normal' },
  h6: { fontSize: 20, lineHeight: '32px', fontWeight: 500 },
  subtitle0: { fontSize: 18, lineHeight: '28px', fontWeight: 500 },
  subtitle1: { fontSize: 16, lineHeight: '24px', fontWeight: 500 },
  subtitle2: { fontSize: 14, lineHeight: '22px', fontWeight: 500 },
  subtitle3: { fontSize: 12, lineHeight: '18px', fontWeight: 500 },
  body1: { fontSize: 16, lineHeight: '24px', fontWeight: 'normal' },
  body2: { fontSize: 14, lineHeight: '20px', fontWeight: 'normal' },
  body3: { fontSize: 12, lineHeight: '18px', fontWeight: 'normal' },
  caption: { fontSize: '12px', lineHeight: '18px' },
  button: {
    fontSize: 14,
    textTransform: 'none',
    lineHeight: 'auto',
    fontWeight: '500',
  },
};

export const MUI_THEME = createMuiTheme({
  palette: {
    primary: {
      light: fade(PRIMARY, 0.9),
      main: PRIMARY,
      dark: darken(PRIMARY, 0.1),
      contrastText: '#ffffff',
    },
    secondary: {
      light: fade(SECONDARY, 0.9),
      main: SECONDARY,
      dark: darken(SECONDARY, 0.1),
      contrastText: '#ffffff',
    },
    text: {
      primary: GREY,
      secondary: fade(GREY, 0.6),
    },
    action: {
      disabledBackground: GREY_500,
      disabled: GREY_100,
    },
  },
  typography,
  overrides: {
    MuiPaper: {
      root: { borderRadius: 0 },
      outlined: {
        border: `1px solid ${GREY_400}`,
      },
      elevation1: {
        boxShadow:
          '2px 2px 4px rgba(0, 0, 0, 0.05), -2px -2px 4px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow:
          ' 3px 3px 6px rgba(0, 0, 0, 0.05), -3px -3px 6px rgba(0, 0, 0, 0.05)',
      },
      elevation3: {
        boxShadow:
          '5px 5px 9px rgba(0, 0, 0, 0.05), -5px -5px 9px rgba(0, 0, 0, 0.05)',
      },
      elevation4: {
        boxShadow:
          '5px 5px 16px rgba(0, 0, 0, 0.05), -5px -5px 16px rgba(0, 0, 0, 0.05)',
      },
      elevation5: {
        boxShadow:
          '5px 5px 24px rgba(0, 0, 0, 0.05), -5px -5px 24px rgba(0, 0, 0, 0.05)',
      },
      elevation6: {
        boxShadow:
          '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 6px 14px rgba(0, 0, 0, 0.2);',
      },
      elevation7: {
        boxShadow:
          '0px 5px 10px rgba(0, 0, 0, 0.1), 0px 3px 6px rgba(0, 0, 0, 0.1);',
      },
    },
    MuiButton: {
      sizeLarge: {
        minHeight: '48px',
        padding: '0 8px',
        ...typography.subtitle1,
      },
      sizeSmall: {
        minHeight: '36px',
        padding: '0 8px',
        ...typography.body2,
      },
      outlined: {
        color: GREY_900,
        background: WHITE,
        ...typography.button,
      },
      root: {
        minHeight: '40px',
        minWidth: 'unset',
        padding: '0 8px',
        ...typography.button,
      },
    },
    MuiInputLabel: {
      root: {
        ...typography.body2,
        color: BLACK,
        position: 'relative',
      },
      shrink: {
        transform: 'unset ',
      },
      formControl: {
        ...typography.body2,
        position: 'relative',
        marginBottom: 4,
        transform: 'unset ',
      },
    },
    MuiFormHelperText: {
      root: { marginTop: 0, ...typography.body2 },
    },
    MuiRadio: {
      colorSecondary: {
        '&$checked': {
          color: SECONDARY,
        },
      },
      colorPrimary: {
        '&$checked': {
          color: PRIMARY,
        },
      },
    },

    MuiCheckbox: {
      colorSecondary: {
        '&$checked': {
          color: BLUE,
        },
      },
      colorPrimary: {
        '&$checked': {
          color: ORANGE,
        },
      },
    },
    MuiSlider: {
      root: {},
      thumbColorPrimary: {
        background: 'white',
        border: `1px solid ${PRIMARY}`,
        marginTop: -4,
      },
      rail: { height: 4 },
      track: { height: 4 },
    },
    MuiFormControl: {
      root: {
        marginRight: 16,
      },
    },
    MuiSwitch: {
      colorSecondary: {
        '&$checked': {
          color: BLUE,
        },
      },
      colorPrimary: {
        '&$checked': {
          color: GREEN,
        },
      },
    },
  },
});

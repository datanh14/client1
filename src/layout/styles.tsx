import { makeStyles } from '@material-ui/core/styles';
import { BLUE_NAVY, GREY_600, WHITE } from '../assets/theme/colors';
import { SIDE_BAR_WIDTH } from '../constants/constants';

export const mainStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderRadius: 0,
  },
  appBarShift: {
    marginLeft: SIDE_BAR_WIDTH,
    width: `calc(100% - ${SIDE_BAR_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    margin: 'auto',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: SIDE_BAR_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    background: WHITE,
    color: WHITE,
  },
  drawerOpen: {
    width: SIDE_BAR_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    borderRadius: 0,
    background: WHITE,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    background: WHITE,
    width: theme.spacing(7) + 1,
    borderRadius: 0,
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    color: BLUE_NAVY,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
  menuItem: {
    cursor: 'pointer',
    minWidth: 200,
    padding: 12,
    color: GREY_600,
    fontWeight: 500,
    '&:hover': {
      background: 'rgb(232, 241, 255)',
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  customIcon: {
    color: 'rgb(117, 117, 117)',
  },
  subMenu: {
    marginLeft: 18,
    color: GREY_600,
    background: 'transparent',
    borderBottom: 'none',
  },
}));

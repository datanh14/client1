import {
  Collapse,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Popover,
  Typography,
} from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import React, { ReactNode } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { ReactComponent as IconManagement } from "../assets/icons/ic_general_setting.svg";
import { ReactComponent as IconMenuBack } from "../assets/icons/ic_menu_back_arrow.svg";
import { BLUE_NAVY, GREY_100, GREY_600, WHITE } from "../assets/theme/colors";
import { SIDE_BAR_WIDTH, some } from "../constants/constants";
import { routes } from "../constants/routes";
import ConfirmationDialog from "../modules/app_manager/components/ConfirmCloseDialog";
import { PageWrapper } from "../modules/common/Elements";
import LoadingIcon from "../modules/common/LoadingIcon";
import Home from "../modules/home/Home";
import { AppState } from "../modules/rootReducer";
import DefaultHelmet from "./DefaultHelmet";
import { mainStyles } from "./styles";

const SIDE_BAR_MENU: some[] = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    route: routes.HOME,
    component: Home,
  },
];
const SUB_MENU: some[] = [];
function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const MainLayout: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { profile } = props;
  const classes = mainStyles();
  const intl = useIntl();
  const { pathname } = props?.location;
  const [open, setOpen] = React.useState(false); // open side bar
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [openConfirmLogout, setOpenConfirmLogout] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); // open logout dialog
  const [isCollapse, setCollapse] = React.useState<null | HTMLElement>(null); // open menu management

  const handleCollapse = (e: any) => {
    setCollapse(Boolean(isCollapse) ? null : e.currentTarget);
  };
  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => {
    setOpen(false);
    if (Boolean(isCollapse)) setCollapse(null);
  };
  const gotoAction = (route: string) => props?.history?.push(route);

  const handleCloseLogOut = () => {
    setOpenConfirmLogout(false);
  };
  const handleOpenMenu = (event: any) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);
  const customIcon = (
    icon: ReactNode,
    isLast?: boolean,
    isActive?: boolean
  ) => (
    <span
      className={classes.customIcon}
      style={{
        marginRight: isLast ? 0 : 5,
        color: isActive ? BLUE_NAVY : "rgb(117, 117, 117)",
      }}
    >
      {icon}
    </span>
  );

  return (
    <PageWrapper style={{ background: GREY_100 }}>
      <DefaultHelmet />
      <CssBaseline />
      <main
        className={classes.content}
        style={{
          marginLeft: open ? SIDE_BAR_WIDTH : 73,
          transition: "linear 225ms",
        }}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Switch>
            {[...SIDE_BAR_MENU].map((item: some) => (
              <Route
                exact
                path={item.route}
                component={item.component}
                key={item.route}
              />
            ))}
          </Switch>
        </React.Suspense>
      </main>
    </PageWrapper>
  );
};

export default connect(mapStateToProps)(withRouter(MainLayout));

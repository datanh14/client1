import {
  Collapse,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  Popover,
  Typography
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
  withRouter
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
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {open && (
            <p
              style={{
                width: "100%",
                paddingLeft: 16,
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              Manager Portal{" "}
            </p>
          )}
          <IconButton
            onClick={handleDrawerClose}
            className={clsx({ [classes.hide]: !open })}
          >
            <IconMenuBack />
          </IconButton>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, { [classes.hide]: open })}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <List style={{ padding: 0 }}>
          {SIDE_BAR_MENU.map((el: some, index: number) => {
            const isActive = pathname === el.route;
            return (
              <ListItem
                button
                key={index}
                onClick={() => gotoAction(el?.route)}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  background: isActive ? "rgb(232, 241, 255)" : WHITE,
                  borderRight:
                    open && isActive ? `4px solid ${BLUE_NAVY}` : "none",
                }}
                title={el?.name}
              >
                {customIcon(el?.icon, false, isActive)}
                {open && (
                  <ListItemText
                    primary={el?.name}
                    style={{ color: isActive ? BLUE_NAVY : GREY_600 }}
                  />
                )}
              </ListItem>
            );
          })}
          <ListItem
            button
            onClick={handleCollapse}
            style={{
              display: "flex",
              justifyContent: "center",
              background:
                !open && pathname.includes("management")
                  ? "rgb(232, 241, 255)"
                  : WHITE,
            }}
            title={intl.formatMessage({ id: "IDS_APP_MANAGEMENT" })}
          >
            {customIcon(
              <IconManagement
                className="svgFillAll"
                style={{
                  fill:
                    !open && pathname.includes("management")
                      ? BLUE_NAVY
                      : GREY_600,
                }}
              />,
              false,
              pathname.includes("management")
            )}
            {open && (
              <>
                <ListItemText
                  primary={intl.formatMessage({
                    id: "IDS_APP_MANAGEMENT",
                  })}
                  style={{
                    color:
                      !open && pathname.includes("management")
                        ? BLUE_NAVY
                        : GREY_600,
                  }}
                />
                {isCollapse
                  ? customIcon(<ExpandLess />, true)
                  : customIcon(<ExpandMore />, true)}
              </>
            )}
          </ListItem>
          {open && (
            <Collapse in={Boolean(isCollapse)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {SUB_MENU.map((item: some) => {
                  const isActive = pathname === item.route;
                  return (
                    <ListItem
                      button
                      className={classes.nested}
                      key={item.route}
                      onClick={() => gotoAction(item?.route)}
                      style={{
                        background: isActive ? "rgb(232, 241, 255)" : WHITE,
                        borderRight: isActive
                          ? `4px solid ${BLUE_NAVY}`
                          : "none",
                      }}
                    >
                      <ListItemText
                        primary={item.name}
                        style={{ color: isActive ? BLUE_NAVY : GREY_600 }}
                        className={classes.subMenu}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Collapse>
          )}
        </List>
        {!open && (
          <Popover
            id={Boolean(isCollapse) ? "simple-popover" : undefined}
            open={Boolean(isCollapse)}
            anchorEl={isCollapse}
            onClose={() => setCollapse(null)}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <List component="div" disablePadding>
              {SUB_MENU.map((item: some) => (
                <ListItem
                  button
                  className={classes.nested}
                  key={item.route}
                  onClick={() => {
                    gotoAction(item?.route);
                    setCollapse(null);
                  }}
                  style={{
                    paddingLeft: 0,
                    background:
                      pathname === item.route ? "rgb(232, 241, 255)" : WHITE,
                  }}
                >
                  <ListItemText
                    style={{
                      color: pathname === item.route ? BLUE_NAVY : GREY_600,
                    }}
                    primary={item.name}
                    className={classes.subMenu}
                  />
                </ListItem>
              ))}
            </List>
          </Popover>
        )}
        <List
          style={{ width: "100%", padding: 0, position: "absolute", bottom: 0 }}
        >
          <ListItem button onClick={handleOpenMenu} title={profile?.name}>
            <ListItemIcon>
              {profile?.profilePhoto ? (
                <img
                  src={profile?.profilePhoto}
                  alt=""
                  style={{ width: 28, height: 28 }}
                />
              ) : (
                <AccountCircleIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={profile?.name} style={{ color: GREY_600 }} />
          </ListItem>
        </List>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
          transformOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Typography
            variant="body2"
            onClick={() => {
              setOpenConfirmLogout(true);
              handleCloseMenu();
            }}
            className={classes.menuItem}
          >
            {intl.formatMessage({ id: "IDS_LOGOUT" })}
          </Typography>
        </Popover>
        <ConfirmationDialog
          dialogTitle="IDS_LOGOUT"
          dialogContent="IDS_CONFIRM_LOGOUT"
          handleCloseDialog={handleCloseLogOut}
          onAcceptDialog={() => {
            gotoAction(routes.LOGIN);
          }}
          openDialog={openConfirmLogout}
        />
      </Drawer>
      <main
        className={classes.content}
        style={{
          marginLeft: open ? SIDE_BAR_WIDTH : 73,
          transition: "linear 225ms",
        }}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Switch>
            {[...SIDE_BAR_MENU, ...SUB_MENU].map((item: some) => (
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

import { Avatar, Paper, Popper } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import MoreIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import React, { useEffect } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ACCESS_TOKEN, some, SUCCESS_CODE } from "../constants/constants";
import { routes } from "../constants/routes";
import { Col, Row } from "../modules/common/Elements";
import { actionGetAllProduct } from "../modules/system/systemAction";
import Helmet from "react-helmet";

interface Props {
  readonly profile?: some;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: "none",
    },
    paper: {
      padding: theme.spacing(1),
    },
    grow: {
      // flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    large: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("xl")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);
const DefaultHelmet: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { profile } = props;
  console.log(profile);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState<any>();
  const [anchorElMenu, setAnchorElMenu] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElMenuAgent, setAnchorElMenuAgent] = React.useState(null);
  const handleClickAgent = (event: any) => {
    setAnchorElMenuAgent(event.currentTarget);
  };
  const handleCloseAgent = () => {
    setAnchorElMenuAgent(null);
  };
  const open = Boolean(anchorElMenu);
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  ] = React.useState<null | HTMLElement>(null);
  const [islogin, setLogin] = React.useState(profile?.account !== undefined);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    setLogin(profile?.account !== undefined); // eslint-disable-next-line
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElMenu(null);
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const fetchListCategory = async () => {
    try {
      const res: some = await actionGetAllProduct();
      if (res?.code === SUCCESS_CODE) {
        setData(res);
        console.log("res", res);
      } else {
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    fetchListCategory();
  }, []);
  // console.log("data", data);
  console.log("data", data);
  const dataCategory = [
    {
      id: 1,
      name: "Tủ Lạnh",
    },
    {
      id: 2,
      name: "Máy Giặt",
    },
    {
      id: 3,
      name: "Nồi",
    },
  ];

  const handleMenuLogin = (route: string) => props?.history?.push(route);

  const handleMenuLogout = (route: string) => {
    localStorage.removeItem(ACCESS_TOKEN);
    props?.history?.push(route);
  };
  const gotoDetailCategory = (id: number) => {
    props?.history?.push(`/`);
    props?.history?.push(`detail-category/${id}`);
  };

  const gotoCart = (route: string) => props?.history?.push(route);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {islogin ? (
        <MenuItem
          onClick={() => {
            handleMenuLogout(routes.LOGIN);
          }}
        >
          Logout
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            handleMenuLogin(routes.LOGIN);
          }}
        >
          Login
        </MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ShoppingCartIcon />
          <Typography>Giỏ hàng</Typography>
        </IconButton>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            style={{ marginRight: 10, width: 150, userSelect: "none", }}
            onClick={() => {
              props?.history?.push(`/`);
            }}
          >
            Team Đụt
          </Typography>
          <Row style={{ width: 200 }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              aria-owns={open ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              // onClick={handleClickAgent}
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            >
              <Row>
                <MenuIcon fontSize="large" />
                <Col>
                  <Typography
                    style={{ fontSize: 10, paddingTop: 10, textAlign: "left" }}
                    variant="body2"
                  >
                    Danh Mục
                  </Typography>
                  <Typography
                    style={{
                      fontSize: 12,
                      paddingBottom: 10,
                      fontWeight: "bold",
                    }}
                    variant="body2"
                  >
                    Sản Phẩm
                  </Typography>
                </Col>
                <Popper
                  id="mouse-over-popover"
                  open={open}
                  anchorEl={anchorElMenu}
                  placement="top-start"
                  disablePortal={true}
                  modifiers={{
                    flip: {
                      enabled: true,
                    },
                    preventOverflow: {
                      enabled: true,
                      boundariesElement: "scrollParent",
                    },
                  }}
                  style={{zIndex: 3,}}
                >
                  <Paper onMouseLeave={handlePopoverClose}>
                    {data !== undefined &&
                      data.message.childList.map(
                        (items: some, index: number) => {
                          return (
                            <MenuItem
                              key={index}
                              onClick={() => {
                                gotoDetailCategory(items.id);
                                handlePopoverClose();
                              }}
                            >
                              {items?.name}
                            </MenuItem>
                          );
                        }
                      )}
                  </Paper>
                </Popper>
              </Row>
            </IconButton>
          </Row>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Row style={{ width: 120 }}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Row>
                  <Avatar
                    alt="Remy Sharp"
                    src="https://scontent.fhan2-5.fna.fbcdn.net/v/t1.6435-9/153745673_1997564207066819_2723027247060726863_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=A5IMouMiviEAX-qd3fr&_nc_ht=scontent.fhan2-5.fna&oh=732a6d84a3ae1cb3d41924496738ebd6&oe=608C0150"
                    className={classes.large}
                  />
                  <Col>
                    <Typography
                      style={{
                        fontSize: 10,
                        paddingTop: 10,
                        textAlign: "left",
                      }}
                      variant="body2"
                    >
                      Tài khoản
                    </Typography>
                    <Typography
                      style={{ fontSize: 10, paddingBottom: 10 }}
                      variant="body2"
                    >
                      {profile?.account}
                    </Typography>
                  </Col>
                </Row>
              </IconButton>
            </Row>
          </div>
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                gotoCart(routes.PRODUCT_CART);
              }}
            >
              <Row>
                <ShoppingCartIcon fontSize="large" />
                <Typography style={{ fontSize: 10, paddingTop: 12 }}>
                  Giỏ hàng
                </Typography>
              </Row>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default withRouter(DefaultHelmet);

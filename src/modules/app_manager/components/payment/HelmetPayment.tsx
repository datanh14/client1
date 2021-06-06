import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface Props {}

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
const HelmetPayment: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Container>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            style={{
              margin: 15,
              width: 150,
              cursor: "pointer",
              color: "white",
            }}
            onClick={() => {
              props?.history?.push(`/`);
            }}
          >
            TIKO DUT
          </Typography>
        </Container>
      </AppBar>
    </div>
  );
};

export default withRouter(HelmetPayment);

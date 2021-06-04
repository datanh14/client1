import { Avatar, Box, Container, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useRef } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { some } from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props {
  isOpen: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: 500,
      marginLeft: "30%",
      position: "relative",
      scrollBehavior: "smooth",
      borderRadius: 10,
      transition: theme.transitions.create("transform"),
    },
    slider: {
      width: "100%",
      display: "flex",
      overflow: "hidden",
    },
    next: {
      position: "absolute",
      right: -100,
      top: "40%",
    },
    prev: {
      position: "absolute",
      left: -100,
      top: "40%",
    },
    grey: {
      color: theme.palette.getContrastText(grey[50]),
      backgroundColor: grey[50],
    },
    img: {
      width: "100%",
      height: "100%",
    },
    boxImg: {
      minWidth: 500,
      height: 400,
      borderRadius: 10,
      backgroundColor: "orange",
    },
    imgSmall: {
      width: 70,
      height: 70,
      marginRight: 10,
      borderRadius: 5,
      display: "flex",
    },
    imgSmallBorder: {
      width: 80,
      height: 80,
      borderRadius: 5,
      marginRight: 10,
      borderStyle: "solid",
      display: "flex",
      borderWidth: 2,
      borderColor: "#ff9800",
    },
  })
);

const LoaddingPage: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { isOpen } = props;

  return (
    <>
      <Dialog
        fullScreen
        open={isOpen}
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.0)",
            width: "100%",
            height: "100%",
          }}
        >
          <Container
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Container>
        </div>
      </Dialog>
    </>
  );
};

export default withRouter(LoaddingPage);

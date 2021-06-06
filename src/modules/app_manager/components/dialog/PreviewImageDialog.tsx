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

interface Props {
  isOpen: boolean;
  onCloseDialog(): void;
  image: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      scrollBehavior: "smooth",
      borderRadius: 10,
      justifyContent: "center",
    },
    grey: {
      color: theme.palette.getContrastText(grey[50]),
      backgroundColor: grey[50],
    },
    img: {
      maxWidth: 550,
      maxHeight: 550,
    },
  })
);

const PreviewImageDialog: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { isOpen, onCloseDialog, image } = props;
  const classes = useStyles();

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
        key={image}
      >
        <div
          style={{
            backgroundColor: "rgba(18, 17, 17, 0.85)",
            width: "100%",
            height: "100%",
          }}
        >
          <Container>
            <Box justifyContent="flex-end" display="flex">
              <IconButton aria-label="back" onClick={onCloseDialog}>
                <CloseIcon fontSize="large" style={{ color: "white" }} />
              </IconButton>
            </Box>
            <div className={classes.root}>
              <img className={classes.img} src={image} alt={image} />
            </div>
          </Container>
        </div>
      </Dialog>
    </>
  );
};

export default withRouter(PreviewImageDialog);

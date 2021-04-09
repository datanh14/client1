import { Avatar, Box, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useRef } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { some } from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import CloseIcon from "@material-ui/icons/Close";

interface Props {
  isOpen: boolean;
  onCloseDialog(): void;
  item: some;
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
      right: 5,
      top: "40%",
    },
    prev: {
      position: "absolute",
      left: 5,
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
      width: 90,
      height: 90,
      marginRight: 10,
      borderRadius: 5,
      display: "flex",
    },
    imgSmallBorder: {
      width: 90,
      height: 90,
      borderRadius: 5,
      marginRight: 10,
      borderStyle: "solid",
      display: "flex",
      borderWidth: 2,
      borderColor: "#ff9800",
    },
  })
);

const PreviewDialog: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { isOpen, onCloseDialog, item } = props;
  const sliderRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handlePrevClick = () => {
    if (sliderRef.current) {
      const slide = sliderRef.current;
      let idx = index < 1 ? 0 : index - 1;
      slide.scrollLeft = slide.offsetWidth * (idx);
      if (slide.scrollLeft < 0) {
        slide.scrollLeft = slide.scrollWidth;
        setIndex(0);
        return;
      }
      setIndex(idx);
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      const slide = sliderRef.current;
      let idx = index > item.img.length - 1 ? 0 : index + 1;
      slide.scrollLeft = slide.offsetWidth * (idx);
      if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
        slide.scrollLeft = 0;
        setIndex(0);
        return;
      }
      setIndex(idx);
    }
  };

  const onClickImg = (idx: number) => {
    setIndex(idx);
    if (sliderRef.current) {
      const slide = sliderRef.current;
      slide.scrollLeft = slide.offsetWidth * (idx);
    }
  }
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
            backgroundColor: "rgba(18, 17, 17, 0.85)",
            width: "100%",
            height: "100%",
          }}
        >
          <Row>
            <IconButton aria-label="back" onClick={onCloseDialog}>
              <CloseIcon fontSize="large" className={classes.grey} />
            </IconButton>
          </Row>
          <div className={classes.root}>
            <Avatar className={`${classes.grey} ${classes.prev}`}>
              <IconButton aria-label="prev">
                <NavigateBeforeIcon onClick={handlePrevClick} />
              </IconButton>
            </Avatar>
            <div className={classes.slider} ref={sliderRef}>
              {item.img.map((it: any, index: number) => {
                return (
                  <Box className={classes.boxImg}>
                    <img className={classes.img} src={it} alt={item.title} />
                  </Box>
                );
              })}
            </div>
            <Avatar className={`${classes.grey} ${classes.next}`}>
              <IconButton aria-label="next">
                <NavigateNextIcon onClick={handleNextClick} />
              </IconButton>
            </Avatar>
          </div>
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            {item.img.map((it: any, idx: number) => (
              <img
                className={
                  index === idx ? classes.imgSmallBorder : classes.imgSmall
                }
                src={it}
                alt={item.title}
                onClick={() => onClickImg(idx)}
              />
            ))}
          </Row>
        </div>
      </Dialog>
    </>
  );
};

export default withRouter(PreviewDialog);

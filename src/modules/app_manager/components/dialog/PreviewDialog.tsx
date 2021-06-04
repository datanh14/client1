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
  key: string;
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

const PreviewDialog: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { key, isOpen, onCloseDialog, item } = props;
  const sliderRef = useRef<HTMLDivElement>(null);
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  const handlePrevClick = () => {
    if (sliderRef.current) {
      const slide = sliderRef.current;
      let idx = index < 1 ? 0 : index - 1;
      slide.scrollLeft = slide.offsetWidth * idx;
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
      let idx = index > item.images.length - 1 ? 0 : index + 1;
      slide.scrollLeft = slide.offsetWidth * idx;
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
      slide.scrollLeft = slide.offsetWidth * idx;
    }
  };

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
          <Container>
            <Box justifyContent="flex-end" display="flex">
              <IconButton aria-label="back" onClick={onCloseDialog}>
                <CloseIcon fontSize="large" style={{ color: "white" }} />
              </IconButton>
            </Box>
            <div className={classes.root}>
              <Avatar className={`${classes.grey} ${classes.prev}`}>
                <IconButton aria-label="prev">
                  <NavigateBeforeIcon onClick={handlePrevClick} />
                </IconButton>
              </Avatar>
              <div className={classes.slider} ref={sliderRef}>
                {item.images &&
                  item.images.map((it: any, index: number) => {
                    return (
                      <Box className={classes.boxImg}>
                        <img className={classes.img} src={it} alt={item.name} />
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
                marginTop: 40,
              }}
            >
              {item.images &&
                item.images.map((it: any, idx: number) => (
                  <img
                    className={
                      index === idx ? classes.imgSmallBorder : classes.imgSmall
                    }
                    src={it}
                    alt={item.name}
                    onClick={() => onClickImg(idx)}
                  />
                ))}
            </Row>
          </Container>
        </div>
      </Dialog>
    </>
  );
};

export default withRouter(PreviewDialog);

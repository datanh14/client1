import { Avatar, Box, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useRef } from "react";
import { some } from "../../../../constants/constants";
import { Row } from "../../../common/Elements";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: "100%",
      marginBottom: 24,
      position: "relative",
      scrollBehavior: "smooth",
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
      minWidth: "100%",
      height: 300,
      borderRadius: 10,
      backgroundColor: "orange",
    },
    boxSmall: {
      backgroundColor: "rgba(242, 241, 241, 0.66)",
      borderRadius: "50%",
      width: 15,
      height: 15,
      margin: 5,
    },
    boxSmallClick: {
      backgroundColor: "#ff9800",
      borderRadius: "50%",
      width: 15,
      height: 15,
      margin: 5,
    },
  })
);
const dataItems = [
  {
    sale: true,
    id: 1,
    img:
      "https://salt.tikicdn.com/ts/banner/06/af/22/c5783f6d2c935633f21659b64e6af628.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 2,
    img:
      "https://salt.tikicdn.com/ts/banner/06/af/22/c1aec3dd9d1a316783a4c5d1bbffdf58.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 3,
    img:
      "https://salt.tikicdn.com/ts/banner/94/24/36/805d8a739056734bb60e82bdfd9a76ff.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 4,
    img:
      "https://salt.tikicdn.com/ts/banner/c7/1e/29/cad2cd9b123bf09897e902400910d4cb.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
];
const CarouselProduct = (props: some) => {
  const classes = useStyles();
  const sliderRef = useRef<HTMLDivElement>(null);
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
      let idx = index > dataItems.length - 1 ? 0 : index + 1;
      slide.scrollLeft = slide.offsetWidth * (idx);
      if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
        slide.scrollLeft = 0;
        setIndex(0);
        return;
      }
      setIndex(idx);
    }
  };

  const onClickBox = (idx: number) => {
    setIndex(idx);
    if (sliderRef.current) {
      const slide = sliderRef.current;
      slide.scrollLeft = slide.offsetWidth * (idx);
    }
  }
  return (
    <div className={classes.root}>
      <Avatar className={`${classes.grey} ${classes.prev}`}>
        <IconButton aria-label="prev">
          <NavigateBeforeIcon onClick={handlePrevClick} />
        </IconButton>
      </Avatar>
      <div className={classes.slider} ref={sliderRef}>
        {dataItems.map((item: some, index: number) => {
          return (
            <Box className={classes.boxImg}>
              <img className={classes.img} src={item.img} alt={item.title} />
            </Box>
          );
        })}
      </div>
      <Avatar className={`${classes.grey} ${classes.next}`}>
        <IconButton aria-label="next">
          <NavigateNextIcon onClick={handleNextClick} />
        </IconButton>
      </Avatar>
      <Row
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 50,
          position: "absolute",
          bottom: 10,
          width: "100%",
        }}
      >
        {dataItems.map((it: any, idx: number) => (
          <Box
            className={index === idx ? classes.boxSmallClick : classes.boxSmall}
            onClick={() => onClickBox(idx)}
          ></Box>
        ))}
      </Row>
    </div>
  );
};
export default CarouselProduct;

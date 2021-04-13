import { Avatar, IconButton } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { useRef } from "react";
import { some } from "../../../../constants/constants";
import Product from "../product/Product";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: "100%",
      height: 326,
      marginTop: 24,
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
      top: "50%",
      zIndex: 3,
    },
    prev: {
      position: "absolute",
      left: 5,
      top: "50%",
      zIndex: 3,
    },
    grey: {
      color: theme.palette.getContrastText(grey[200]),
      backgroundColor: grey[200],
    },
  })
);
const dataItems = [
  {
    sale: true,
    id: 1,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 2,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 3,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 4,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 5,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 6,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 7,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 8,
    images:
      ["https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg"],
    title: "ok",
    price: "100d",
    name: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
];
const SliderProduct = (props: some) => {
  const classes = useStyles();
  const sliderRef = useRef<HTMLDivElement>(null);

  const handlePrevClick = () => {
    if (sliderRef.current) {
      console.log("prev");
      const slide = sliderRef.current;
      slide.scrollLeft -= slide.offsetWidth;
      if (slide.scrollLeft < 0) {
        slide.scrollLeft = slide.scrollWidth;
      }
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      const slide = sliderRef.current;
      slide.scrollLeft += slide.offsetWidth;
      if (slide.scrollLeft >= slide.scrollWidth - slide.offsetWidth) {
        slide.scrollLeft = 0;
      }
    }
  };
  return (
    <div className={classes.root}>
      <Avatar className={`${classes.grey} ${classes.prev}`}>
        <IconButton aria-label="prev">
          <NavigateBeforeIcon onClick={handlePrevClick} />
        </IconButton>
      </Avatar>
      <div className={classes.slider} ref={sliderRef}>
        {dataItems.map((item: some, index: number) => {
          return <Product key={index} data={item} />;
        })}
      </div>
      <Avatar className={`${classes.grey} ${classes.next}`}>
        <IconButton aria-label="next">
          <NavigateNextIcon onClick={handleNextClick} />
        </IconButton>
      </Avatar>
    </div>
  );
};
export default SliderProduct;

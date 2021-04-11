import React, { useState, useEffect, useRef } from "react";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Button,
} from "@material-ui/core";
import { Box, Paper, Avatar, Grid } from "@material-ui/core";
import { some } from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import Product from "../product/Product";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import { grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: 1300,
      marginLeft: 50,
      marginRight: 50,
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
      zIndex: 2,
    },
    prev: {
      position: "absolute",
      left: 5,
      top: "50%",
      zIndex: 2,
    },
    grey: {
      color: theme.palette.getContrastText(grey[50]),
      backgroundColor: grey[50],
    },
  })
);
const dataItems = [
  {
    sale: true,
    id: 1,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 2,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 3,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 4,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 5,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 6,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 7,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 8,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
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

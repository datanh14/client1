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
  ButtonGroup,
  Collapse,
} from "@material-ui/core";
import { Box, Paper, Avatar, Grid } from "@material-ui/core";
import { some } from "../../../../constants/constants";
import clsx from "clsx";
import { Col, Row } from "../../../common/Elements";
import Rating from "@material-ui/lab/Rating";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReceiptIcon from "@material-ui/icons/Receipt";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { blue, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grid: {
      display: "flex",
    },
  })
);
const Footer = (props: some) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = {
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
    pt: "-26%",
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        style={{
          marginBottom: 20,
          backgroundColor: "white",
          padding: 20,
        }}
      >
      Footer
      </Grid>
    </div>
  );
};
export default Footer;

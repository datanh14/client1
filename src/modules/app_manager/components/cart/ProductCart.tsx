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
      maxWidth: 900,
      transition: theme.transitions.create("transform"),
    },
    grid: {
      display: "flex",
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    button: {
      width: 20,
      height: 20,
      color: "#2979ff",
    },
    icon: {
      color: "#2979ff",
    },
    grey: {
      color: "#bdbdbd",
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
    iconSmall: {
      width: 20,
      height: 20,
    },
  })
);
const Comment = (props: some) => {
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
        <Grid item xs={12}>
          <Typography>
            <Box
              fontWeight="fontWeightBold"
              fontSize={15}
              paddingRight={1}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Cửa hàng ABC
              <NavigateNextIcon
                className={classes.iconSmall}
                style={{
                  marginLeft: 5,
                }}
              />
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Row>
            <Typography>
              <Box
                fontWeight="fontWeightBold"
                fontSize={15}
                marginRight={1}
                paddingRight={1}
                style={{
                  color: "#ff9800",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <ReceiptIcon
                  className={classes.iconSmall}
                  style={{
                    color: "#ff9800",
                    marginRight: 5,
                  }}
                />
                Bạn được giảm giá 46k
              </Box>
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </Row>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron
              </Typography>
            </CardContent>
          </Collapse>
        </Grid>
        <Grid item xs={12} sm={2}>
          <img
            style={{
              width: "100%",
              borderRadius: 10,
            }}
            src={data.img}
            alt={data.title}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Typography>
            <Box
              fontSize={15}
              padding={1}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Set 1 Giỏ Quà Đậm Đà Tình Thân nước mắm tôm biển bình gốm đỏ 60N
              và cá cơm vàng ruột đỏ bình gốm vàng 60N
            </Box>
          </Typography>
          <Typography>
            <Box
              fontWeight="fontWeightBold"
              fontSize={15}
              padding={1}
              style={{
                color: "green",
                display: "flex",
              }}
            >
              GIAO TRONG NGÀY
            </Box>
          </Typography>
          <Row>
            <Button color="secondary">Xóa</Button>
            <Button color="secondary">Để dành mua sau</Button>
          </Row>
        </Grid>
        <Grid container xs={12} sm={2} spacing={1}>
          <Typography>
            <Box paddingTop={1} fontWeight="fontWeightBold" fontSize={17}>
              {data.gia}
            </Box>
            <Row>
              <Typography>
                <Box
                  fontSize={15}
                  style={{
                    textDecoration: "line-through",
                    borderRight: "1px solid #ededed",
                    paddingRight: 20,
                  }}
                >
                  {data.gia}
                </Box>
              </Typography>
              <Typography>
                <Box
                  style={{
                    marginLeft: 20,
                  }}
                >
                  {data.pt}
                </Box>
              </Typography>
            </Row>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box paddingTop={2}>
            <ButtonGroup>
              <Button
                aria-label="reduce"
                size="small"
                onClick={() => {
                  setCount(Math.max(count - 1, 0));
                }}
              >
                <RemoveIcon fontSize="small" />
              </Button>
              <Button size="small">{count}</Button>
              <Button
                aria-label="increase"
                size="small"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};
export default Comment;

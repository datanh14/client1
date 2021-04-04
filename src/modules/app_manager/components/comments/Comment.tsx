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
import Rating from "@material-ui/lab/Rating";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { blue, grey } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginLeft: 50,
      marginRight: 50,
      transition: theme.transitions.create("transform"),
    },
    grid: {
      display: "flex",
    },
    button: {
      margin: 20,
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
    iconsmall: {
      width: 20,
      height: 20,
    },
  })
);
const Comment = (props: some) => {
  const classes = useStyles();
  const data = {
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        style={{
          marginBottom: 20,
          backgroundColor: "white",
          paddingTop: 20,
        }}
      >
        <Grid container xs={12} sm={3} className={classes.grid}>
          <Col
            style={{
              marginLeft: 20,
            }}
          >
            <Row
              style={{
                marginBottom: 20,
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                className={classes.large}
              />
              <Typography>
                <Box
                  fontWeight="fontWeightBold"
                  fontSize={15}
                  marginLeft={1}
                  style={{
                    borderRight: "1px solid #ededed",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Chaâu Đăng khoa
                </Box>
                <Box className={classes.grey} marginLeft={1} fontSize={15}>
                  Đã tham gia 5 năm
                </Box>
              </Typography>
            </Row>
            <Row
              style={{
                marginBottom: 5,
              }}
            >
              <Typography>
                <Box
                  fontSize={14}
                  marginLeft={1}
                  className={classes.grey}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <AssistantOutlinedIcon className={classes.iconsmall} />
                  Đã viết
                </Box>
              </Typography>
              <Typography>
                <Box marginLeft={1} fontSize={14}>
                  22 Đánh giá
                </Box>
              </Typography>
            </Row>
            <Row>
              <Typography>
                <Box
                  fontSize={14}
                  marginLeft={1}
                  className={classes.grey}
                  style={{
                    borderRight: "1px solid #ededed",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <ThumbUpAltOutlinedIcon className={classes.iconsmall} />
                  Đã nhận
                </Box>
              </Typography>
              <Typography>
                <Box marginLeft={1} fontSize={14}>
                  22 Lượt cảm ơn
                </Box>
              </Typography>
            </Row>
          </Col>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          sm={9}
          className={classes.grid}
          style={{
            backgroundColor: "white",
          }}
        >
          <Grid item xs={12}>
            <Row>
              <Rating
                name="half-rating-read"
                defaultValue={2.5}
                precision={0.5}
                emptyIcon={<StarBorderIcon fontSize="inherit" style={{color: "#ffc107"}} />}
                readOnly
              />
              <Typography>
                <Box fontWeight="fontWeightBold" fontSize={15}>
                  Hai long
                </Box>
              </Typography>
            </Row>
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
                    borderRight: "1px solid #ededed",
                    color: "green",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  Đã mua từ
                  <CheckCircleIcon
                    className={classes.iconsmall}
                    style={{
                      color: "green",
                      margin: 5,
                    }}
                  />
                  ĐẠI LÝ NỆM ĐỨC LỢI
                </Box>
              </Typography>
              <Typography>
                <Box className={classes.grey} fontSize={15}>
                  size 100*200*5cm size 120*200*5cm
                </Box>
              </Typography>
            </Row>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Box fontSize={15}>
                Nằm êm hơn khi có em nó. Bao bì nhãn mác everon nhìn hơi bình
                thường ko biết có phải chính hãng ko hay gia công bên ngoài.
                Giao hàng nhanh.
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <img
              style={{
                width: "15%",
                borderRadius: 10,
              }}
              src={data.img}
              alt={data.title}
            />
          </Grid>
          <Grid item xs={12}>
            <Row>
              <Typography>
                <Box
                  className={classes.grey}
                  fontSize={15}
                  marginRight={1}
                  paddingRight={1}
                  style={{
                    borderRight: "1px solid #ededed",
                  }}
                >
                  Nhận xét vào 19/01/2021
                </Box>
              </Typography>
              <Typography>
                <Box className={classes.grey} fontSize={15}>
                  Đã dùng 1 tháng
                </Box>
              </Typography>
            </Row>
          </Grid>
          <Grid item xs={12}>
            <Row>
              <Button
                variant="outlined"
                className={classes.button}
                startIcon={<ThumbUpAltOutlinedIcon className={classes.icon} />}
              >
                Hữu ích
              </Button>
              <Button className={classes.button}>Gửi trả lời</Button>
            </Row>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Comment;

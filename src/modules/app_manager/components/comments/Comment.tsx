import { Avatar, Box, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AssistantOutlinedIcon from "@material-ui/icons/AssistantOutlined";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { some } from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import { RouteComponentProps, withRouter } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      transition: theme.transitions.create("transform"),
      backgroundColor: "white",
      borderTop: "1px solid #ededed",
    },
    grid: {
      display: "flex",
    },
    button: {
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
    linkStore: {
      display: "flex",
      "&:hover": {
        fontWeight: "bold",
        cursor: "pointer",
      },
    },
  })
);

interface Props {
  item?: some;
  store?: some;
}

const Comment: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const classes = useStyles();
  const { item, store } = props;
  const data = {
    img: "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
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
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {item?.user.name}
                </Box>
                {/* <Box className={classes.grey} marginLeft={1} fontSize={15}>
                  Đã tham gia 5 năm
                </Box> */}
              </Typography>
            </Row>
            {/* <Row
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
            </Row> */}
            {/* <Row>
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
            </Row> */}
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
                size="small"
                name="half-rating-read"
                defaultValue={item?.star}
                precision={0.5}
                emptyIcon={
                  <StarBorderIcon
                    fontSize="inherit"
                    style={{ color: "#ffc107", marginRight: 20 }}
                  />
                }
                readOnly
              />
              <Typography>
                <Box fontWeight="fontWeightBold" fontSize={15}>
                  {item?.star === 5
                    ? "Cực kì hài lòng"
                    : item?.star < 5 && item?.star >= 4
                    ? "Hài lòng"
                    : item?.star < 4 && item?.star >= 3
                    ? "Bình thường"
                    : item?.star < 3 && item?.star >= 2
                    ? "Không hài lòng"
                    : "Rất không hài lòng"}
                </Box>
              </Typography>
            </Row>
          </Grid>
          <Grid item xs={12}>
            <Row>
              <Typography>
                <Box
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
                  <Typography
                    onClick={() => {
                      props?.history?.push(`/store/${store?.id}`);
                    }}
                    className={classes.linkStore}
                  >
                    <Box fontSize={15}>{store?.name}</Box>
                  </Typography>
                </Box>
              </Typography>
              <Typography>
                {/* <Box className={classes.grey} fontSize={15}>
                  size 100*200*5cm size 120*200*5cm
                </Box> */}
              </Typography>
            </Row>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              <Box fontSize={15}>{item?.comment}</Box>
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
                  Nhận xét vào {item?.time}
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
              {/* <Button className={classes.button}>Gửi trả lời</Button> */}
            </Row>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(Comment);

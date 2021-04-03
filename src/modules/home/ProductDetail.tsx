import React from "react";
import { Animation } from "@devexpress/dx-react-chart";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import {
  ArgumentAxis,
  Chart,
  LineSeries,
  PieSeries,
  Title,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
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
import { some } from "../../constants/constants";
import Rating from "@material-ui/lab/Rating";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import RemoveIcon from "@material-ui/icons/Remove";
import { Col, Row } from "../common/Elements";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    grow: {
      flexGrow: 1,
      background: "white",
    },
    img: {
      width: "40%",
    },
    content: {
      display: "flex",
      flexDirection: "row",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    price: {
      maxHeight: 30,
      alignItems: "center",
      display: "flex",
    },
    button: {
      fontWeight: "bold",
    },
    grid: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },
  })
);
const ProductDetail = (props: any) => {
  const { productId } = props;
  const classes = useStyles();
  const tile = {
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "1.000.000 ₫",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
    pt: "-26%",
  };
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link
          color="inherit"
          href="/getting-started/installation/"
          onClick={handleClick}
        >
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
      <Card className={classes.grow}>
        <div className={classes.content}>
          <CardMedia
            className={classes.img}
            image={tile.img}
            title={tile.title}
          />
          <CardContent className={classes.details}>
            <Row>
              <Typography style={{ marginBottom: 10, flexDirection: "column" }}>
                <Box
                  lineHeight={1.2}
                  textAlign="left"
                  fontSize={30}
                  marginBottom={2}
                >
                  {productId.match.params.id}
                </Box>
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
              </Typography>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Row>
            <Row style={{ flex: 1 }}>
              <Col
                style={{
                  flex: 2,
                  marginRight: 10,
                }}
              >
                <Col
                  style={{
                    padding: 15,
                    marginTop: 10,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 5,
                  }}
                >
                  <Row
                    style={{
                      marginBottom: 10,
                    }}
                  >
                    <Typography>
                      <Box fontSize={40}>{tile.gia}</Box>
                    </Typography>
                    <Typography>
                      <Box fontSize={15} marginLeft={1.5} style={{textDecoration: "line-through"}}>
                        {tile.gia}
                      </Box>
                    </Typography>
                    <Typography>
                      <Box
                        style={{
                          maxWidth: 45,
                          maxHeight: 30,
                          padding: 10,
                          marginLeft: 10,
                          textAlign: "center",
                          borderRadius: 5,
                          backgroundColor: "#ff424e",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        {tile.pt}
                      </Box>
                    </Typography>
                  </Row>
                  <Typography>
                    <Box fontWeight="fontWeightBold" fontSize={15}>
                      Hoàn tiền 15% tối đa 600k/tháng
                    </Box>
                  </Typography>
                </Col>
                <Typography>
                  <Box
                    style={{
                      padding: 10,
                      marginTop: 10,
                      borderTop: "1px solid #ededed",
                      borderBottom: "1px solid #ededed",
                    }}
                  >
                    Bạn hãy NHẬP ĐỊA CHỈ nhận hàng để được dự báo thời gian &
                    chi phí giao hàng một cách chính xác nhất.
                  </Box>
                </Typography>
                <Box>
                  <Row>
                    <IconButton aria-label="remove">
                      <IndeterminateCheckBoxIcon style={{ color: "#eb4034" }} />
                    </IconButton>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        fontSize={15}
                        padding={1}
                      >
                        2
                      </Box>
                    </Typography>
                    <IconButton aria-label="add">
                      <AddBoxIcon style={{ color: "#eb4034" }} />
                    </IconButton>
                  </Row>
                  <Typography>
                    <Button
                      style={{
                        width: "50%",
                        textAlign: "center",
                        padding: 10,
                        color: "#ffffff",
                        backgroundColor: "#eb4034",
                        borderRadius: 5,
                        marginTop: 10,
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>
                  </Typography>
                </Box>
              </Col>
              <Col style={{ flex: 1 }}>
                <Box border={0.1} borderRadius={10} borderColor="#ededed">
                  <Row>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://img.icons8.com/color/48/000000/shop.png"
                      style={{
                        marginTop: 10,
                        marginLeft: 20,
                        marginRight: 20,
                      }}
                    />
                    <Typography>
                      <Box
                        style={{
                          padding: 10,
                          marginTop: 10,
                        }}
                      >
                        Shop vai lon shop
                      </Box>
                    </Typography>
                  </Row>
                  <Grid
                    container
                    style={{
                      marginBottom: 20,
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.grid}
                      style={{
                        borderRight: "1px solid #ededed",
                      }}
                    >
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          4.5 / 5.0
                        </Box>
                      </Typography>
                      <StarIcon style={{ color: "#ffea00" }} />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      className={classes.grid}
                      style={{
                        borderLeft: "1px solid #ededed",
                      }}
                    >
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          188
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid}>
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          188
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid}>
                      <Typography>
                        <Box fontWeight="fontWeightBold" fontSize={15}>
                          Theo dõi
                        </Box>
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid}>
                      <Button
                        variant="outlined"
                        color="default"
                        className={classes.button}
                        startIcon={<StorefrontIcon />}
                      >
                        Xem shop
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.grid}>
                      <Button
                        variant="outlined"
                        color="default"
                        className={classes.button}
                        startIcon={<AddIcon />}
                      >
                        Theo dõi
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Col>
            </Row>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
export default ProductDetail;

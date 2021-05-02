import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import AddBoxIcon from "@material-ui/icons/AddBox";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ShareIcon from "@material-ui/icons/Share";
import StarIcon from "@material-ui/icons/Star";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import { actionProductById } from "../../../system/systemAction";
import PreviewDialog from "../dialog/PreviewDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      marginLeft: 73,
      marginRight: 73,
    },
    grow: {
      flexGrow: 1,
      background: "white",
    },
    img: {
      width: 400,
      height: 400,
      margin: 10,
    },
    imgSmall: {
      width: 70,
      height: 70,
      marginRight: 10,
      borderRadius: 5,
      display: "flex",
    },
    imgSmallBorder: {
      width: 70,
      height: 70,
      borderRadius: 5,
      marginRight: 10,
      borderStyle: "solid",
      display: "flex",
      borderWidth: 1,
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
  const id: some = useParams();
  const [index, setIndex] = useState(0);
  const [isOpenPreviewDialog, setIsOpenPreviewDialog] = React.useState(false);
  const [idProduct, setIdProduct] = React.useState<string>(id.id);
  const [dataListProduct, setDataListProduct] = React.useState<any>();

  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductById({
        ProductID: idProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataListProduct(res);
        console.log("idProduct", res);
        // setDataListProduct(res);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListProduct();
  }, [idProduct]);

  const tile = {
    img: [
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
      "https://salt.tikicdn.com/cache/w444/ts/product/6d/fd/20/91181cd3d2b7483399017e8821f30d35.jpg",
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
      "https://salt.tikicdn.com/cache/w444/ts/product/6d/fd/20/91181cd3d2b7483399017e8821f30d35.jpg",
      "https://salt.tikicdn.com/cache/w444/ts/product/6d/fd/20/91181cd3d2b7483399017e8821f30d35.jpg",
      "https://salt.tikicdn.com/cache/w444/ts/product/6d/fd/20/91181cd3d2b7483399017e8821f30d35.jpg",
      "https://salt.tikicdn.com/cache/w444/ts/product/6d/fd/20/91181cd3d2b7483399017e8821f30d35.jpg",
      "https://salt.tikicdn.com/cache/w444/ts/product/6d/fd/20/91181cd3d2b7483399017e8821f30d35.jpg",
    ],
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

  const onCloseDialog = () => {
    setIsOpenPreviewDialog(false);
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
      {dataListProduct !== undefined && (
        <Card className={classes.grow}>
          <div className={classes.content}>
            <Col style={{ maxWidth: 400 }}>
              <img
                className={classes.img}
                src={dataListProduct?.message.images[index]}
                alt={dataListProduct?.message.name}
              />
              <Row
                style={{
                  marginLeft: 10,
                }}
              >
                {dataListProduct?.message.images.map(
                  (item: any, idx: number) =>
                    idx < 4 && (
                      <img
                        className={
                          index === idx
                            ? classes.imgSmallBorder
                            : classes.imgSmall
                        }
                        src={item}
                        alt={dataListProduct?.message.name}
                        onClick={() => setIndex(idx)}
                      />
                    )
                )}
                {dataListProduct?.message.images.length >= 4 && (
                  <div
                    style={{
                      backgroundImage: `url(${dataListProduct?.message.images[4]})`,
                      backgroundSize: "70px 70px",
                      minWidth: 70,
                      minHeight: 70,
                      marginRight: 10,
                      borderRadius: 5,
                      display: "flex",
                      textAlign: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setIsOpenPreviewDialog(true)}
                  >
                    <Typography
                      variant="body2"
                      style={{
                        minWidth: 70,
                        minHeight: 70,
                        lineHeight: 1.8,
                        color: "white",
                        backgroundColor: "black",
                        opacity: 0.7,
                        borderRadius: 5,
                        paddingTop: 5,
                      }}
                    >
                      <Box fontSize={11}>Xem</Box>
                      <Box fontSize={11}>thêm 10</Box>
                      <Box fontSize={11}>hình</Box>
                    </Typography>
                  </div>
                )}

                <PreviewDialog
                  key={dataListProduct?.message.id}
                  isOpen={isOpenPreviewDialog}
                  onCloseDialog={onCloseDialog}
                  item={dataListProduct?.message}
                />
              </Row>
            </Col>

            <CardContent className={classes.details}>
              <Row>
                <Typography
                  style={{ flexDirection: "column" }}
                >
                  <Box
                    lineHeight={1.2}
                    textAlign="left"
                    fontSize={30}
                    marginBottom={2}
                  >
                    {dataListProduct?.message.name}
                  </Box>
                  <Rating
                    name="half-rating-read"
                    defaultValue={dataListProduct?.message.ratingsCount}
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
                        <Box fontSize={40}>
                          {dataListProduct?.message.price}
                        </Box>
                      </Typography>
                      <Typography>
                        <Box
                          fontSize={15}
                          marginLeft={1.5}
                          style={{ textDecoration: "line-through" }}
                        >
                          {dataListProduct?.message.price}
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
                        <IndeterminateCheckBoxIcon
                          style={{ color: "#eb4034" }}
                        />
                      </IconButton>
                      <Typography>
                        <Box
                          fontWeight="fontWeightBold"
                          fontSize={15}
                          padding={1}
                        >
                          1
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
                          {dataListProduct?.message.store.name}
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
                          <Box fontSize={15}>
                            {dataListProduct?.message.store.star} / 5.0
                          </Box>
                        </Typography>
                        <StarIcon style={{ color: "#ffea00", height: 20, width: 20,marginLeft:2, }} />
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
                          <Box fontSize={15}>
                            {dataListProduct?.message.store.ratingsCount}
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <Typography>
                          <Box fontSize={15}>
                            {dataListProduct?.message.store.followerCount}
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <Typography>
                          <Box fontSize={15}>Theo dõi</Box>
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
      )}
    </div>
  );
};
export default ProductDetail;

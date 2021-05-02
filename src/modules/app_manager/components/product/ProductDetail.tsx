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
import {
  ACCOUNTS_ID,
  CART_LOCAL_STORAGE,
  some,
  SUCCESS_CODE,
} from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import { actionAddProductToCart, actionProductById } from "../../../system/systemAction";
import PreviewDialog from "../dialog/PreviewDialog";
import { formatter } from "../../../../utils/helpers/helpers";
import JSONbig from "json-bigint";

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
  const [dataProduct, setDataProduct] = React.useState<any>();
  const [count, setCount] = React.useState<number>(1);
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );

  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductById({
        ProductID: idProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataProduct(res);
        console.log("idProduct", res);
        // setDataListProduct(res);
      } else {
      }
    } catch (error) {}
  };

  const fetchAddProductToCart = async (data: some) => {
    try {
      const res: some = await actionAddProductToCart({
        BuyerID: userID,
        ProductID: data.id,
        Quantity: data.count,
      });
      if (res?.code === SUCCESS_CODE) {
        console.log("actionAddProductToCart");
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListProduct();
  }, [idProduct]);

  React.useEffect(() => {
    setUserID(localStorage.getItem(ACCOUNTS_ID) || "");
  }, []);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  };

  const handleAddToCart = () => {
    // localStorage.setItem(
    //   CART_LOCAL_STORAGE,
    //   ""
    // );
    var check = false;
    var listProductInCart: some[] = JSONbig.parse(localStorage.getItem(CART_LOCAL_STORAGE) || '[]');
    if (listProductInCart === []) {
      listProductInCart = [...listProductInCart, { ...dataProduct?.message, "count":count }];
      fetchAddProductToCart({ ...dataProduct?.message, "count":count });
    } else {
      listProductInCart.map((item: some, index:number) => {
          if (item.id === dataProduct?.message?.id) {
            check = true;
            listProductInCart = [...listProductInCart.slice(0,index), { ...dataProduct?.message, "count":count + item.count }, ...listProductInCart.slice(index + 1)];
            fetchAddProductToCart({ ...dataProduct?.message, "count":count + item.count });
          }
      });
    }
    if (!check) {
      listProductInCart = [...listProductInCart, { ...dataProduct?.message, "count":count }];
      fetchAddProductToCart({ ...dataProduct?.message, "count":count });
    } 
    localStorage.setItem(
      CART_LOCAL_STORAGE,
      JSONbig.stringify(listProductInCart)
    );
    console.log("listProductInCart",listProductInCart);
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
      {dataProduct !== undefined && (
        <Card className={classes.grow}>
          <div className={classes.content}>
            <Col style={{ maxWidth: 400 }}>
              <img
                className={classes.img}
                src={dataProduct?.message.images[index]}
                alt={dataProduct?.message.name}
              />
              <Row
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                }}
              >
                {dataProduct?.message.images.map(
                  (item: any, idx: number) =>
                    idx < 4 && (
                      <img
                        className={
                          index === idx
                            ? classes.imgSmallBorder
                            : classes.imgSmall
                        }
                        src={item}
                        alt={dataProduct?.message.name}
                        onClick={() => setIndex(idx)}
                      />
                    )
                )}
                {dataProduct?.message.images.length >= 4 && (
                  <div
                    style={{
                      backgroundImage: `url(${dataProduct?.message.images[4]})`,
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
                  key={dataProduct?.message.id}
                  isOpen={isOpenPreviewDialog}
                  onCloseDialog={onCloseDialog}
                  item={dataProduct?.message}
                />
              </Row>
            </Col>

            <CardContent className={classes.details}>
              <Row>
                <Typography style={{ flexDirection: "column" }}>
                  <Box
                    lineHeight={1.2}
                    textAlign="left"
                    fontSize={30}
                    marginBottom={2}
                  >
                    {dataProduct?.message.name}
                  </Box>
                  <Rating
                    name="half-rating-read"
                    defaultValue={dataProduct?.message.ratingsCount}
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
              <Grid container style={{ flex: 1, display: "flex" }}>
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
                          {formatter(
                            dataProduct?.message.price +
                              (dataProduct?.message.price *
                                dataProduct?.message.discount) /
                                100
                          )}
                        </Box>
                      </Typography>
                      <Typography>
                        <Box
                          fontSize={15}
                          marginLeft={1.5}
                          style={{ textDecoration: "line-through" }}
                        >
                          {formatter(dataProduct?.message.price)}
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
                          {dataProduct?.message.discount}%
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
                      <IconButton
                        aria-label="remove"
                        onClick={() => {
                          setCount(Math.max(count - 1, 1));
                        }}
                      >
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
                          {count}
                        </Box>
                      </Typography>
                      <IconButton
                        aria-label="add"
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
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
                        onClick={handleAddToCart}
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
                          {dataProduct?.message.store.name}
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
                            {dataProduct?.message.store.star} / 5.0
                          </Box>
                        </Typography>
                        <StarIcon
                          style={{
                            color: "#ffea00",
                            height: 20,
                            width: 20,
                            marginLeft: 2,
                          }}
                        />
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
                            {dataProduct?.message.store.ratingsCount}
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <Typography>
                          <Box fontSize={15}>
                            {dataProduct?.message.store.followerCount}
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
              </Grid>
            </CardContent>
          </div>
        </Card>
      )}
    </div>
  );
};
export default ProductDetail;

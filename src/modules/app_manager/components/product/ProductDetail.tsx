import {
  Avatar,
  Box,
  Button,
  CardActions,
  Grid,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import AddBoxIcon from "@material-ui/icons/AddBox";
import CheckIcon from "@material-ui/icons/Check";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ShareIcon from "@material-ui/icons/Share";
import StarIcon from "@material-ui/icons/Star";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Rating from "@material-ui/lab/Rating";
import parse from "html-react-parser";
import JSONbig from "json-bigint";
import React, { useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import {
  ACCOUNTS_ID,
  CART_LOCAL_STORAGE,
  some,
  SUCCESS_CODE,
} from "../../../../constants/constants";
import { formatter } from "../../../../utils/helpers/helpers";
import { Col, Row } from "../../../common/Elements";
import {
  actionAddFollow,
  actionAddProductToCart,
  actionGetRatingForProduct,
  actionGetStoreFollowing,
  actionLikeOrDislike,
  actionProductById,
  actionUnFollow,
} from "../../../system/systemAction";
import Comment from "../comments/Comment";
import LoginDialog from "../dialog/LoginDialog";
import PreviewDialog from "../dialog/PreviewDialog";
import LoaddingPage from "../loading/LoaddingPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      marginTop: 20,
    },
    grow: {
      flexGrow: 1,
      background: "white",
    },
    img: {
      // width: 400,
      // height: 400,
      margin: 10,
    },
    imgSmall: {
      // width: 70,
      // height: 70,
      marginRight: 13,
      borderRadius: 5,
      display: "flex",
    },
    imgSmallBorder: {
      // width: 70,
      // height: 70,
      borderRadius: 5,
      marginRight: 13,
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
  const imageRef = React.useRef<HTMLDivElement>(null);
  const [sizeImage, setSizeImage] = useState(0);
  const [loading, setLoading] = React.useState(false);
  const [storeData, setStoreData] = React.useState<some>({});
  const [sizeImageSmall, setSizeImageSmall] = useState(0);
  const [index, setIndex] = useState(0);
  const [isOpenPreviewDialog, setIsOpenPreviewDialog] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);
  const [idProduct, setIdProduct] = React.useState<string>(id.id);
  const [dataProduct, setDataProduct] = React.useState<any>();
  const [dataComment, setDataComment] = React.useState<any>();
  const [count, setCount] = React.useState<number>(1);
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );
  const [isFollow, setFollow] = React.useState(false);

  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductById({
        ProductID: idProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataProduct(res);
        // setDataListProduct(res);
      } else {
      }
    } catch (error) {}
  };

  const fetchListComment = async () => {
    try {
      const res: some = await actionGetRatingForProduct({
        ProductID: idProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataComment(res);
        // setDataListProduct(res);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };

  const fetchAddProductToCart = async (data: some) => {
    try {
      const res: some = await actionAddProductToCart({
        BuyerID: userID,
        ProductID: data.id,
        Quantity: data.count,
      });
      if (res?.code === SUCCESS_CODE) {
        setFollow(true);
      } else {
      }
    } catch (error) {}
  };

  const fetchAddFollow = async () => {
    try {
      const res: some = await actionAddFollow({
        userID: userID,
        storeID: dataProduct?.message.store.id,
      });
      if (res?.code === SUCCESS_CODE) {
        setFollow(true);
      } else {
      }
    } catch (error) {}
  };

  const fetchUnFollow = async () => {
    try {
      const res: some = await actionUnFollow({
        userID: userID,
        storeID: dataProduct?.message.store.id,
      });
      if (res?.code === SUCCESS_CODE) {
        setFollow(false);
      } else {
      }
    } catch (error) {}
  };

  const fetchLikeOrDislike = async (id: string) => {
    try {
      const res: some = await actionLikeOrDislike({
        RatingID: id,
      });
      if (res?.code === SUCCESS_CODE) {
        fetchListComment();
      } else {
      }
    } catch (error) {}
  };

  const fetchGetStoreFollowing = async () => {
    try {
      const res: some = await actionGetStoreFollowing({
        userID: userID,
      });
      if (res?.code === SUCCESS_CODE) {
        let follow: boolean = false;
        res?.message &&
          res?.message.map((item: some, index: number) => {
            if (item?.id === dataProduct?.message.store.id) {
              follow = true;
            }
          });
        setFollow(follow);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };

  React.useEffect(() => {
    fetchListProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProduct, isFollow, id]);

  React.useEffect(() => {
    setIdProduct(id.id);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  React.useEffect(() => {
    dataProduct && userID && fetchGetStoreFollowing();
    dataProduct && fetchListComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataProduct]);

  React.useEffect(() => {
    setUserID(localStorage.getItem(ACCOUNTS_ID) || "");
  }, []);

  React.useEffect(() => {
    if (imageRef.current) {
      setSizeImage(imageRef?.current?.offsetWidth / 3 - 20);
      setSizeImageSmall(imageRef?.current?.offsetWidth / 15 - 14);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageRef.current]);

  const handleAddToCart = () => {
    var check = false;
    var listProductInCart: some[] = JSONbig.parse(
      localStorage.getItem(CART_LOCAL_STORAGE) || "[]"
    );
    if (listProductInCart === []) {
      listProductInCart = [
        ...listProductInCart,
        { ...dataProduct?.message, count: count },
      ];
      fetchAddProductToCart({ ...dataProduct?.message, count: count });
    } else {
      listProductInCart.map((item: some, index: number) => {
        if (item.id === dataProduct?.message?.id) {
          check = true;
          listProductInCart = [
            ...listProductInCart.slice(0, index),
            { ...dataProduct?.message, count: count + item.count },
            ...listProductInCart.slice(index + 1),
          ];
          fetchAddProductToCart({
            ...dataProduct?.message,
            count: count + item.count,
          });
        }
      });
    }
    if (!check) {
      listProductInCart = [
        ...listProductInCart,
        { ...dataProduct?.message, count: count },
      ];
      fetchAddProductToCart({ ...dataProduct?.message, count: count });
    }
    localStorage.setItem(
      CART_LOCAL_STORAGE,
      JSONbig.stringify(listProductInCart)
    );
  };

  const onCloseDialog = () => {
    setIsOpenPreviewDialog(false);
  };

  const handleFollow = () => {
    userID === ""
      ? setOpenLoginDialog(true)
      : isFollow
      ? fetchUnFollow()
      : fetchAddFollow();
  };

  const gotoStore = () => {
    props?.history?.push(`/store/${dataProduct?.message.store.id}`);
  };

  const handleLike = (id: string) => {
    fetchLikeOrDislike(id);
  };

  return (
    <div className={classes.root} ref={imageRef}>
      {!loading && <LoaddingPage isOpen={!loading} />}
      {dataProduct !== undefined && (
        <Col>
          <Grid
            container
            className={classes.grow}
            direction="row"
            justify="flex-start"
          >
            <Grid
              item
              xs={12}
              sm={4}
              direction="column"
              style={{ display: "flex" }}
            >
              <img
                style={{
                  width: sizeImage,
                  height: sizeImage,
                }}
                className={classes.img}
                src={
                  dataProduct?.message?.image !== ""
                    ? dataProduct?.message?.images[index]
                    : "https://vnpi-hcm.vn/wp-content/uploads/2018/01/no-image-800x600.png"
                }
                alt={dataProduct?.message.name}
              />
              <Row
                style={{
                  marginLeft: 10,
                  marginBottom: 10,
                }}
              >
                {dataProduct?.message.images &&
                  dataProduct?.message.images.map(
                    (item: any, idx: number) =>
                      idx < 4 && (
                        <img
                          style={{
                            width: sizeImageSmall,
                            height: sizeImageSmall,
                          }}
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
                {dataProduct?.message.images &&
                  dataProduct?.message.images.length > 4 && (
                    <div
                      style={{
                        backgroundImage: `url(${dataProduct?.message.images[4]})`,
                        backgroundSize: `${sizeImageSmall}px ${sizeImageSmall}px`,
                        width: sizeImageSmall,
                        height: sizeImageSmall,
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
                          width: sizeImageSmall,
                          height: sizeImageSmall,
                          lineHeight: 1.8,
                          color: "white",
                          backgroundColor: "black",
                          opacity: 0.7,
                          borderRadius: 5,
                          paddingTop: 5,
                        }}
                      >
                        <Box fontSize={8}>Xem</Box>
                        <Box fontSize={8}>
                          thêm {dataProduct?.message.images.length - 4}
                        </Box>
                        <Box fontSize={8}>hình</Box>
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
            </Grid>
            <Grid container xs={12} sm={8}>
              <Grid item xs={8} style={{ flex: 1, alignContent: "center" }}>
                <Row>
                  <Typography style={{ flexDirection: "column" }}>
                    <Box
                      lineHeight={1.2}
                      textAlign="left"
                      fontSize={30}
                      marginBottom={2}
                      marginTop={1}
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
                </Row>
              </Grid>
              <Grid item xs={4}>
                <CardActions disableSpacing>
                  {/* <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton> */}
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
              </Grid>
              <Grid item xs={8}>
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
                            dataProduct?.message.price -
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
                          marginBottom: 10,
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
              </Grid>
              <Grid item xs={4}>
                <Col style={{ flex: 1, marginRight: 10 }}>
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
                            {dataProduct?.message.store.followerCount}
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <Typography>
                          <Box fontSize={12} marginBottom={1}>
                            {dataProduct?.message.store.ratingsCount}
                          </Box>
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <Typography>
                          <Box fontSize={12} marginBottom={1}>
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
                          onClick={gotoStore}
                        >
                          Xem shop
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6} className={classes.grid}>
                        <Button
                          variant="outlined"
                          color="default"
                          className={classes.button}
                          startIcon={
                            isFollow ? (
                              <CheckIcon style={{ color: "blue" }} />
                            ) : (
                              <AddIcon />
                            )
                          }
                          onClick={handleFollow}
                        >
                          {isFollow ? "Đã theo dõi" : "Theo dõi"}
                        </Button>
                        <LoginDialog
                          isOpen={openLoginDialog}
                          setOpenLoginDialog={setOpenLoginDialog}
                          value="THEO DÕI"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Col>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}></Grid>
            </Grid>
          </Grid>
          <Paper elevation={0} style={{ marginTop: 20, padding: 20 }}>
            <Typography>
              <Box fontSize={30} style={{ marginBottom: 20 }}>
                Thông tin chi tiết
              </Box>
            </Typography>{" "}
            {parse(dataProduct?.message.detail)}
          </Paper>
          <Paper elevation={0} style={{ marginTop: 20, padding: 20 }}>
            <Typography>
              <Box fontSize={30} style={{ marginBottom: 20 }}>
                Mô tả sản phẩm
              </Box>
            </Typography>
            {parse(dataProduct?.message.description)}
          </Paper>
          <Paper
            elevation={0}
            style={{ marginTop: 20, marginBottom: 20, paddingTop: 20 }}
          >
            <Col>
              <Typography>
                <Box fontSize={30} style={{ marginBottom: 20, marginLeft: 20 }}>
                  Đánh giá cùng nhận xét
                </Box>
              </Typography>
              {dataComment ? (
                dataComment.message.map((item: some, index: number) => {
                  return (
                    <Comment
                      item={item}
                      store={dataProduct?.message.store}
                      handleLike={handleLike}
                    />
                  );
                })
              ) : (
                <Col
                  style={{
                    minHeight: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      minWidth: 200,
                      maxWidth: 200,
                    }}
                    alt="Chưa có nhận xét của sản phẩm"
                    src="https://image.freepik.com/free-vector/illustration-customer-reviews-rating-different-people-give-review-rating-feedback-support-business-satisfaction-flat-style-modern-design-illustration-web-page-cards_126608-300.jpg"
                  />
                  <Typography>
                    <Box fontSize={15}>
                      Chưa có nhận xét, đánh giá của sản phẩm
                    </Box>
                  </Typography>
                </Col>
              )}
            </Col>
          </Paper>
        </Col>
      )}
    </div>
  );
};

export default withRouter(ProductDetail);

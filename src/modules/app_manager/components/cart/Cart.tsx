// import { FormattedMessage } from 'react-intl';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  ACCOUNTS_ID,
  CART_LOCAL_STORAGE,
  GET_CART_LOCAL_STORAGE,
  some,
  SUCCESS_CODE,
} from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import ProductCart from "./ProductCart";
import JSONbig from "json-bigint";
import { formatter } from "../../../../utils/helpers/helpers";
import EmptyCart from "./EmptyCart";
import {
  actionAddProductToCart,
  actionDeleteProductFromCart,
  actionGetAllProductInCart,
} from "../../../system/systemAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      maxWidth: 900,
      transition: theme.transitions.create("transform"),
    },
    grid: {
      backgroundColor: "white",
      paddingLeft: 10,
      paddingRight: 10,
    },
    rowMoney: {
      padding: 10,
      margin: 10,
    },
  })
);
const Cart = (props: some) => {
  const classes = useStyles();
  const [cart, setCart] = React.useState<some[]>(
    JSONbig.parse(localStorage.getItem(CART_LOCAL_STORAGE) || "[]")
  );
  const [bill, setBill] = React.useState(0);
  const [isGetAll, setIsGetAll] = React.useState(localStorage.getItem(GET_CART_LOCAL_STORAGE));
  const [countProduct, setCountProduct] = React.useState(0);
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );

  const handleBill = () => {
    var sum = 0;
    var count = 0;
    cart &&
      cart.map((item: some, index: number) => {
        sum =
          sum + (item.price + (item.price * item.discount) / 100) * item.count;
        count = count + item.count;
      });
    setBill(sum);
    setCountProduct(count);
  };

  const changeCount = (index: number, count: number) => {
    var temp: some = cart[index];
    temp.count = count;
    var listProductInCart: some[] = [
      ...cart.slice(0, index),
      { ...temp },
      ...cart.slice(index + 1),
    ];
    fetchAddProductToCart(temp);
    setCart(listProductInCart);
    localStorage.setItem(
      CART_LOCAL_STORAGE,
      JSONbig.stringify(listProductInCart)
    );
  };

  const handleDeleteProductByCart = (index: number) => {
    var list: some[] = cart;
    var temp: some = list[index];
    list.splice(index, 1);
    setCart([...list]);
    localStorage.setItem(CART_LOCAL_STORAGE, JSONbig.stringify(list));
    if (userID !== "") {
      fetchDeleteProductFromCart(temp);
    }
  };

  const fetchAllProductInCart = async () => {
    addAllProductToCart();
    try {
      const res: some = await actionGetAllProductInCart({
        buyerID: userID,
      });
      if (res?.code === SUCCESS_CODE) {
        if (isGetAll === "false") {
          var temp: some[] = [];
          res?.cart &&
            res?.cart.map((item: some, index: number) => {
              temp.push({ ...item?.product, count: item?.quantity });
            });
          setCart([...temp]);
          setIsGetAll("true");
          localStorage.setItem(GET_CART_LOCAL_STORAGE,"true");
          localStorage.setItem(
            CART_LOCAL_STORAGE,
            JSONbig.stringify(temp)
          );
          console.log("fetchAllProductInCart", isGetAll);
        }
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
        console.log("fetchAllProductInCart ok ");
      } else {
      }
    } catch (error) {}
  };

  const addAllProductToCart = () => {
    console.log("fetchAllProductInCart addall")
    cart && cart.map((item:some,index:number) => {
      fetchAddProductToCart(item);
    })
  }

  const fetchDeleteProductFromCart = async (data: some) => {
    try {
      const res: some = await actionDeleteProductFromCart({
        userID: userID,
        ProductID: data.id,
      });
      if (res?.code === SUCCESS_CODE) {
        console.log("actionAddProductToCart");
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    handleBill();
    // addAllProductToCart();
  }, [cart]);

  React.useEffect(() => {
    setUserID(localStorage.getItem(ACCOUNTS_ID) || "");
    fetchAllProductInCart();
  }, []);

  return (
    <>
      <Row
        style={{
          color: "#ff9800",
          paddingLeft: 70,
          paddingRight: 4,
          paddingTop: 20,
          paddingBottom: 10,
        }}
      >
        <Typography>
          <Box
            fontWeight="fontWeightBold"
            fontSize={19}
            style={{
              color: "#ff9800",
              paddingRight: 4,
            }}
          >
            GIỎ HÀNG
          </Box>
        </Typography>
        <Typography>
          <Box
            fontSize={15}
            style={{
              color: "black",
            }}
          >
            ({countProduct} sản phẩm)
          </Box>
        </Typography>
      </Row>
      {cart.length !== 0 ? (
        <Grid container>
          <Grid item xs={12} sm={8}>
            <Box style={{ paddingLeft: 24, paddingRight: 24, width: "100%" }}>
              <Row
                style={{
                  width: "100%",
                }}
              ></Row>
              <Row
                style={{
                  flexWrap: "wrap",
                  margin: "0 auto",
                  width: "100%",
                }}
              >
                {cart.map((item: some, index: number) => {
                  return (
                    <ProductCart
                      key={index}
                      index={index}
                      data={item}
                      changeCount={changeCount}
                      handleDeleteProductByCart={handleDeleteProductByCart}
                    />
                  );
                })}
              </Row>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} style={{ paddingRight: 24, width: "100%" }}>
            <Grid item xs={12} className={classes.grid}>
              <Grid item xs={12} className={classes.grid}>
                <Row>
                  <Box flexGrow={1}>
                    <Typography>
                      <Box
                        fontWeight="fontWeightBold"
                        fontSize={15}
                        marginRight={1}
                        paddingRight={1}
                        style={{
                          color: "#ff9800",
                        }}
                      >
                        Địa chỉ nhận hàng
                      </Box>
                    </Typography>
                  </Box>
                  <Box>
                    <Button color="secondary">Thay đổi</Button>
                  </Box>
                </Row>
              </Grid>

              <Grid item xs={12} className={classes.grid}>
                <Row>
                  <Typography>
                    <Box
                      fontWeight="fontWeightBold"
                      fontSize={15}
                      style={{
                        borderRight: "1px solid #ededed",
                        paddingRight: 20,
                      }}
                    >
                      Nguyễn Văn PƠhong
                    </Box>
                  </Typography>
                  <Typography>
                    <Box
                      fontWeight="fontWeightBold"
                      style={{
                        marginLeft: 20,
                      }}
                    >
                      0588898568
                    </Box>
                  </Typography>
                </Row>
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <Typography>
                  <Box
                    fontSize={14}
                    marginRight={1}
                    paddingRight={1}
                    style={{
                      color: "#9e9e9e",
                      paddingBottom: 10,
                    }}
                  >
                    Ngõ 26 Doãn Kế Thiện, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              className={classes.grid}
              style={{
                marginTop: 24,
              }}
            >
              <Grid item xs={12} className={classes.grid}>
                <Row
                  className={classes.rowMoney}
                  style={{
                    borderBottom: "1px solid #ededed",
                    paddingBottom: 20,
                  }}
                >
                  <Box flexGrow={1}>
                    <Typography>
                      <Box
                        fontSize={17}
                        marginRight={1}
                        paddingRight={1}
                        style={{
                          color: "#9e9e9e",
                        }}
                      >
                        Tạm tính
                      </Box>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      <Box
                        fontSize={17}
                        marginRight={1}
                        paddingRight={1}
                        style={{}}
                      >
                        {formatter(bill)}
                      </Box>
                    </Typography>
                  </Box>
                </Row>
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                <Row className={classes.rowMoney}>
                  <Box flexGrow={1}>
                    <Typography>
                      <Box
                        fontSize={17}
                        marginRight={1}
                        paddingRight={1}
                        style={{
                          color: "#9e9e9e",
                        }}
                      >
                        Thành tiền
                      </Box>
                    </Typography>
                  </Box>
                  <Box>
                    <Typography>
                      <Box
                        fontSize={25}
                        marginRight={1}
                        paddingRight={1}
                        alignItems="flex-end"
                        style={{
                          color: "#d50000",
                          textAlign: "end",
                        }}
                      >
                        {formatter(bill)}
                      </Box>
                      <Box
                        fontSize={10}
                        marginRight={1}
                        paddingRight={1}
                        style={{
                          color: "#9e9e9e",
                        }}
                      >
                        (Đã bao gồm thuế VAT nếu có)
                      </Box>
                    </Typography>
                  </Box>
                </Row>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginTop: 24,
              }}
            >
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  textAlign: "center",
                  padding: 10,
                  color: "#ffffff",
                  backgroundColor: "#eb4034",
                  borderRadius: 5,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Tiến hành đặt hàng
              </Button>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Cart));

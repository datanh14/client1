// import { FormattedMessage } from 'react-intl';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  ACCOUNTS,
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
  actionGetAddressByUser,
  actionConfirmPayment,
  actionDeleteAllCart,
} from "../../../system/systemAction";
import DialogChangeAddress from "./DialogChangeAddress";
import { routes } from "../../../../constants/routes";
import LoaddingPage from "../loading/LoaddingPage";
import LoginDialog from "../dialog/LoginDialog";

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
  const [profile, setProfile] = React.useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [bill, setBill] = React.useState(0);
  const [isGetAll, setIsGetAll] = React.useState(
    localStorage.getItem(GET_CART_LOCAL_STORAGE)
  );
  const [countProduct, setCountProduct] = React.useState(0);
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );
  const [address, setAddress] = React.useState<some>({});
  const [listAddress, setListAddress] = React.useState<some[]>([]);
  const [indexDefaut, setIndexDefaut] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [openLoginDialog, setOpenLoginDialog] = React.useState(false);

  const handleBill = () => {
    var sum = 0;
    var count = 0;
    cart &&
      cart.map((item: some, index: number) => {
        sum =
          sum + (item.price - (item.price * item.discount) / 100) * item.count;
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
          localStorage.setItem(GET_CART_LOCAL_STORAGE, "true");
          localStorage.setItem(CART_LOCAL_STORAGE, JSONbig.stringify(temp));
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
      } else {
      }
    } catch (error) {}
  };

  const fetchDeleteAllCart = async (id: string) => {
    try {
      const res: some = await actionDeleteAllCart(JSON.stringify(id));
      if (res?.code === SUCCESS_CODE) {
        setIsGetAll("true");
        localStorage.setItem(GET_CART_LOCAL_STORAGE, "true");
        addAllProductToCartFromLocal();
      } else {
      }
    } catch (error) {}
  };

  const addAllProductToCartFromLocal = () => {
    if (isGetAll === "false") {
      cart &&
        cart.map((item: some, index: number) => {
          fetchAddProductToCart(item);
        });
    }
  };

  const addAllProductToCart = () => {
    if (cart.length === 0) {
      fetchAllProductInCart();
    } else {
      if (isGetAll === "false") {
        fetchDeleteAllCart(userID);
      }
    }
  };

  const fetchDeleteProductFromCart = async (data: some) => {
    try {
      const res: some = await actionDeleteProductFromCart({
        userID: userID,
        ProductID: data.id,
      });
      if (res?.code === SUCCESS_CODE) {
      } else {
      }
    } catch (error) {}
  };

  const fetchGetAddressByUser = async () => {
    try {
      const res: some = await actionGetAddressByUser({
        UserID: userID,
      });
      if (res?.code === SUCCESS_CODE) {
        if (res?.message) {
          setListAddress(res?.message);
          res?.message.map((item: some, index: number) => {
            if (item?.isDefault === 1) {
              setAddress(item);
              setIndexDefaut(index);
              return;
            }
          });
        }
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };

  const handleClickChangeAddress = () => {
    fetchGetAddressByUser();
  };

  const handleLogin = () => {
    props?.history?.push(routes.LOGIN);
  };

  React.useEffect(() => {
    handleBill();
    // addAllProductToCart();
  }, [cart]);

  React.useEffect(() => {
    setUserID(localStorage.getItem(ACCOUNTS_ID) || "");
    addAllProductToCart();
    fetchGetAddressByUser();
  }, []);

  return (
    <>
      {!loading && <LoaddingPage isOpen={!loading} />}
      <Row
        style={{
          color: "#ff9800",
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
        address && (
          <Grid container>
            <Grid item xs={12} sm={8}>
              <Box style={{ paddingRight: 15, width: "100%" }}>
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
            <Grid item xs={12} sm={4} style={{ width: "100%" }}>
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
                      {indexDefaut !== -1 && userID !== "" && (
                        <DialogChangeAddress
                          indexDefaut={indexDefaut}
                          item={listAddress || []}
                          fetchData={handleClickChangeAddress}
                        />
                      )}
                      {userID === "" && (
                        <Button color="secondary" onClick={handleLogin}>
                          Đăng nhập
                        </Button>
                      )}
                    </Box>
                  </Row>
                </Grid>
                {userID !== "" ? (
                  <>
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
                            {profile?.firstName + " " + profile?.lastName}
                          </Box>
                        </Typography>
                        <Typography>
                          <Box
                            fontWeight="fontWeightBold"
                            style={{
                              marginLeft: 20,
                            }}
                          >
                            {address ? address?.phone : ""}
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
                          {address
                            ? address?.address +
                              ", " +
                              address?.district?.districtName +
                              ", " +
                              address?.city?.cityName
                            : ""}
                        </Box>
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12} className={classes.grid}>
                      <Row>
                        <Typography>
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize={15}
                            marginBottom={1}
                          >
                            Bạn chưa đăng nhập
                          </Box>
                        </Typography>
                      </Row>
                    </Grid>
                  </>
                )}
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
                  onClick={() => {
                    userID === ""
                      ? setOpenLoginDialog(true)
                      : props?.history?.push(routes.PAYMENT);
                    // fetchConfirmPayment
                  }}
                >
                  Tiến hành đặt hàng
                </Button>
                <LoginDialog
                  isOpen={openLoginDialog}
                  setOpenLoginDialog={setOpenLoginDialog}
                  value="ĐẶT HÀNG"/>
              </Grid>
            </Grid>
          </Grid>
        )
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

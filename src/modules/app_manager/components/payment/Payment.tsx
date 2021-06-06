// import { FormattedMessage } from 'react-intl';
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
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
import { Col, Row, snackbarSetting } from "../../../common/Elements";
import ProductPayment from "./ProductPayment";
import JSONbig from "json-bigint";
import { formatter } from "../../../../utils/helpers/helpers";
import {
  actionAddProductToCart,
  actionDeleteProductFromCart,
  actionGetAllProductInCart,
  actionGetAddressByUser,
  actionConfirmPayment,
  actionDeleteAllCart,
} from "../../../system/systemAction";
import DialogChangeAddress from "../cart/DialogChangeAddress";
import { routes } from "../../../../constants/routes";
import LoaddingPage from "../loading/LoaddingPage";
import EmptyCart from "../cart/EmptyCart";
import HelmetPayment from "./HelmetPayment";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      paddingLeft: 100,
      paddingRight: 100,
      transition: theme.transitions.create("transform"),
    },
    grid: {
      backgroundColor: "white",
      paddingLeft: 10,
      paddingRight: 10,
    },
    rowMoney: {
      // padding: 10,
      // margin: 10,
    },
  })
);
const Payment = (props: some) => {
  const classes = useStyles();
  const [cart, setCart] = React.useState<some[]>([]);
  const [profile, setProfile] = React.useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [bill, setBill] = React.useState(15000);
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );
  const [address, setAddress] = React.useState<some>({});
  const [listAddress, setListAddress] = React.useState<some[]>([]);
  const [indexDefaut, setIndexDefaut] = React.useState(-1);
  const [loading, setLoading] = React.useState(false);
  const [selectedShip, setSelectedShip] = React.useState("a");
  const [selectedPay, setSelectedPay] = React.useState("c");

  const gotoCart = (route: string) => props?.history?.push(route);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedShip(event.target.value);
  };

  const handleChangePay = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPay(event.target.value);
  };

  const handleBill = () => {
    var sum = 0;
    var count = 0;
    cart &&
      cart.map((item: some, index: number) => {
        sum =
          sum + (item.price - (item.price * item.discount) / 100) * item.count;
        count = count + item.count;
      });
    setBill(sum + bill);
  };

  const fetchAllProductInCart = async () => {
    try {
      const res: some = await actionGetAllProductInCart({
        buyerID: userID,
      });
      if (res?.code === SUCCESS_CODE) {
        var temp: some[] = [];
        res?.cart &&
          res?.cart.map((item: some, index: number) => {
            temp.push({ ...item?.product, count: item?.quantity });
          });
        setCart([...temp]);
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

  const fetchConfirmPayment = async () => {
    try {
      const res: some = await actionConfirmPayment({
        userID: userID,
        addressID: address?.id,
        PaymentID: '88888888-8888-8888-8888-888888888888',
      });
      if (res?.code === SUCCESS_CODE) {
        localStorage.removeItem(CART_LOCAL_STORAGE);
        setCart(JSONbig.parse("[]"));
        enqueueSnackbar(
          res?.message,
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      } else {
        enqueueSnackbar(
          "Đặt hàng không thành công",
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    } catch (error) {}
    finally {
      props?.history?.push(routes.PRODUCT_CART);
    }
  };

  const handleClickChangeAddress = () => {
    fetchGetAddressByUser();
  };

  const handleLogin = () => {
    props?.history?.push(routes.LOGIN);
  };

  React.useEffect(() => {
    selectedShip === "a"
      ? setBill(bill + 15000 - 30000)
      : setBill(bill + 30000 - 15000);
  }, [selectedShip, cart]);

  React.useEffect(() => {
    handleBill();
    // addAllProductToCart();
  }, [cart]);

  React.useEffect(() => {
    fetchAllProductInCart();
    setUserID(localStorage.getItem(ACCOUNTS_ID) || "");
    fetchGetAddressByUser();
  }, []);

  return (
    <>
      <HelmetPayment />
      <div className={classes.root}>
        {!loading && <LoaddingPage isOpen={!loading} />}
        <Col>
          {cart.length !== 0 && address && (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={8}>
                <Col>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    1. Chọn phương thức giao hàng
                  </Typography>
                  <Box
                    style={{
                      flexWrap: "wrap",
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderColor: "#d4d3d2",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderRadius: 5,
                    }}
                  >
                    <Row
                      style={{
                        padding: 10,
                        borderBottom: "1px solid #ededed",
                      }}
                    >
                      <Radio
                        checked={selectedShip === "a"}
                        onChange={handleChange}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <Row
                        style={{
                          flex: 4,
                          marginLeft: 10,
                        }}
                      >
                        <Box
                          style={{
                            flex: 3.5,
                          }}
                        >
                          <Typography style={{ fontSize: 18 }}>
                            Giao hàng tiết kiệm
                          </Typography>
                          <Typography style={{ fontSize: 13 }}>
                            Thời gian nhận{" "}
                            {new Date(
                              Date.now() + 7 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography style={{ fontSize: 18, flex: 0.5 }}>
                          {formatter(15000)}
                        </Typography>
                      </Row>
                    </Row>
                    <Row
                      style={{
                        padding: 10,
                      }}
                    >
                      <Radio
                        checked={selectedShip === "b"}
                        onChange={handleChange}
                        value="b"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "B" }}
                      />
                      <Row
                        style={{
                          flex: 4,
                          marginLeft: 10,
                        }}
                      >
                        <Box
                          style={{
                            flex: 3.5,
                          }}
                        >
                          <Typography style={{ fontSize: 18 }}>
                            Giao hàng nhanh
                          </Typography>
                          <Typography style={{ fontSize: 13 }}>
                            Thời gian nhận{" "}
                            {new Date(
                              Date.now() + 3 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography style={{ fontSize: 18, flex: 0.5 }}>
                          {formatter(30000)}
                        </Typography>
                      </Row>
                    </Row>
                  </Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    2. Đơn hàng
                  </Typography>
                  <Box
                    style={{
                      flexWrap: "wrap",
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderColor: "#d4d3d2",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderRadius: 5,
                    }}
                  >
                    {cart.map((item: some, index: number) => {
                      return (
                        <ProductPayment key={index} index={index} data={item} />
                      );
                    })}
                  </Box>
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginBottom: 10,
                      marginTop: 10,
                    }}
                  >
                    3. Chọn hình thức thanh toán
                  </Typography>
                  <Box
                    style={{
                      flexWrap: "wrap",
                      paddingLeft: 20,
                      paddingRight: 20,
                      borderColor: "#d4d3d2",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderRadius: 5,
                    }}
                  >
                    <Row
                      style={{
                        padding: 10,
                        borderBottom: "1px solid #ededed",
                      }}
                    >
                      <Radio
                        checked={selectedPay === "c"}
                        onChange={handleChangePay}
                        value="a"
                        name="radio-button-demo"
                        inputProps={{ "aria-label": "A" }}
                      />
                      <Row
                        style={{
                          flex: 4,
                          marginLeft: 10,
                        }}
                      >
                        <Typography style={{ fontSize: 18, flex: 0.5 }}>
                          Thanh toán tiền mặt khi nhận hàng
                        </Typography>
                      </Row>
                    </Row>
                  </Box>
                  <Col
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        width: "50%",
                        textAlign: "center",
                        padding: 10,
                        color: "#ffffff",
                        backgroundColor: "#eb4034",
                        borderRadius: 5,
                        fontSize: 20,
                        fontWeight: "bold",
                        marginTop: 10,
                      }}
                      onClick={fetchConfirmPayment}
                    >
                      ĐẶT MUA
                    </Button>
                    <Box
                      style={{
                        width: "50%",
                        textAlign: "center",
                      }}
                    >
                      <Typography style={{ fontSize: 12 }}>
                        (Xin vui lòng kiểm tra lại đơn hàng trước khi Đặt Mua)
                      </Typography>
                    </Box>
                  </Col>
                </Col>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid
                  item
                  xs={12}
                  className={classes.grid}
                  style={{
                    borderColor: "#d4d3d2",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                    marginTop: 53,
                  }}
                >
                  <Grid item xs={12} className={classes.grid}>
                    <Row>
                      <Box flexGrow={1}>
                        <Typography>
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize={16}
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
                    borderColor: "#d4d3d2",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderRadius: 5,
                  }}
                >
                  <Grid item xs={12} className={classes.grid}>
                    <Row>
                      <Box flexGrow={1}>
                        <Typography>
                          <Box
                            fontWeight="fontWeightBold"
                            fontSize={16}
                            marginRight={1}
                            paddingRight={1}
                            style={{
                              color: "#ff9800",
                            }}
                          >
                            Đơn hàng
                          </Box>
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          color="secondary"
                          onClick={() => {
                            gotoCart(routes.PRODUCT_CART);
                          }}
                        >
                          Sửa
                        </Button>
                      </Box>
                    </Row>
                  </Grid>
                  <Grid item xs={12} className={classes.grid}>
                    <Row
                      className={classes.rowMoney}
                      style={{
                        marginBottom: 5,
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
                            {selectedShip === "a"
                              ? formatter(bill - 15000)
                              : formatter(bill - 30000)}
                          </Box>
                        </Typography>
                      </Box>
                    </Row>
                    <Row
                      className={classes.rowMoney}
                      style={{
                        borderBottom: "1px solid #ededed",
                        marginBottom: 5,
                      }}
                    >
                      <Box flexGrow={1}>
                        <Typography>
                          <Box
                            fontSize={15}
                            marginRight={1}
                            paddingRight={1}
                            style={{
                              color: "#9e9e9e",
                            }}
                          >
                            Phí giao hàng
                          </Box>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          <Box
                            fontSize={15}
                            marginRight={1}
                            paddingRight={1}
                            style={{}}
                          >
                            {selectedShip === "a"
                              ? formatter(15000)
                              : formatter(30000)}
                          </Box>
                        </Typography>
                      </Box>
                    </Row>
                  </Grid>
                  <Grid item xs={12} className={classes.grid}>
                    <Row
                      className={classes.rowMoney}
                      style={{
                        marginTop: 10,
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
              </Grid>
            </Grid>
          )}
        </Col>
      </div>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Payment));
function enqueueSnackbar(message: any, arg1: any) {
  throw new Error("Function not implemented.");
}

function closeSnackbar(key: string): void {
  throw new Error("Function not implemented.");
}


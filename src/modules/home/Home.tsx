// import { FormattedMessage } from 'react-intl';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ACCOUNTS_ID, some, SUCCESS_CODE } from "../../constants/constants";
import CategoryProduct from "../app_manager/components/category/CategoryProduct";
import LoaddingPage from "../app_manager/components/loading/LoaddingPage";
import Product from "../app_manager/components/product/Product";
import CarouselProduct from "../app_manager/components/slider/CarouselProduct";
import { Row, Col } from "../common/Elements";
import {
  actionProductFollowing,
  actionProductInChild,
} from "../system/systemAction";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Home = (props: some) => {
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );
  const [loading, setLoading] = React.useState(false);
  const [dataListProduct, setDataListProduct] = React.useState<any>();
  const [dataListProductFollow, setDataListProductFollow] = React.useState<
    any
  >();
  const [data, setData] = React.useState<any[]>([]);
  const [dataFollow, setDataFollow] = React.useState<any[]>([]);
  const [pageProduct, setPageProduct] = React.useState<number>(0);
  const [pageProductFollow, setPageProductFollow] = React.useState<number>(0);
  const sizeProduct = 15;
  const sizeProductFollow = 15;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductInChild({
        CategoryID: null,
        page: pageProduct,
        size: sizeProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataListProduct(res);
        setData((data) => [...data, ...res.message.productsList]);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };

  const fetchListProductFollow = async () => {
    try {
      const res: some = await actionProductFollowing({
        CategoryID: null,
        page: pageProductFollow,
        size: sizeProductFollow,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataListProductFollow(res);
        setDataFollow((data) => [...data, ...res.message.productsList]);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(true);
    }
  };

  React.useEffect(() => {
    fetchListProduct();
  }, [pageProduct]);

  React.useEffect(() => {
    userID !== "" && fetchListProductFollow();
  }, [pageProductFollow]);

  const handleClickMore = () => {
    setPageProduct((pageProduct) => pageProduct + 1);
    setLoading(false);
  };

  const handleClickMoreFollow = () => {
    setPageProductFollow((pageProductFollow) => pageProductFollow + 1);
    setLoading(false);
  };

  return (
    <>
      {!loading && <LoaddingPage isOpen={!loading} />}
      <Box
        style={{
          paddingTop: 20,
          width: "100%",
        }}
      >
        <Row
          style={{
            width: "100%",
          }}
        ></Row>
        <Container maxWidth="xl">
          <CarouselProduct />
          <CategoryProduct />
          <Paper
            elevation={0}
            style={{
              marginBottom: 25,
              paddingBottom: 24,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
            >
              <Tab
                icon={
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="h6"
                    style={{
                      minWidth: 500,
                    }}
                  >
                    Tất cả sản phẩm
                  </Typography>
                }
                {...a11yProps(0)}
              />
              {userID !== "" && (
                <Tab
                  icon={
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="h6"
                      style={{
                        minWidth: 600,
                      }}
                    >
                      Sản phẩm cửa hàng theo dõi
                    </Typography>
                  }
                  {...a11yProps(1)}
                />
              )}
            </Tabs>
            <TabPanel value={value} index={0}>
              <div>
                <Row
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  {data !== undefined &&
                    data.map((item: some, index: number) => {
                      return <Product key={index} data={item} />;
                    })}
                </Row>
              </div>
              <Row
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 24,
                }}
              >
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleClickMore}
                >
                  Xem thêm
                </Button>
              </Row>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {dataFollow !== undefined && dataFollow.length > 0 ? (
                <div>
                  <Row
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      margin: "0 auto",
                      width: "100%",
                    }}
                  >
                    {dataFollow.map((item: some, index: number) => {
                      return <Product key={index} data={item} />;
                    })}
                  </Row>
                  <Row
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 24,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleClickMoreFollow}
                    >
                      Xem thêm
                    </Button>
                  </Row>
                </div>
              ) : (
                <Col
                  style={{
                    minHeight: 500,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    style={{
                      minWidth: 100,
                      maxWidth: 100,
                    }}
                    alt="Không có sản phẩm nào trong cửa hàng"
                    src="https://www.orientappliances.pk//images/no.svg"
                  />
                  <Typography>
                    <Box fontSize={15}>Bạn chưa theo dõi cửa hàng nào</Box>
                  </Typography>
                </Col>
              )}
            </TabPanel>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Home));

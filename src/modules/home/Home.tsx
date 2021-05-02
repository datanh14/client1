// import { FormattedMessage } from 'react-intl';
import { Box, Button, Container } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../constants/constants";
import Comment from "../app_manager/components/comments/Comment";
import Product from "../app_manager/components/product/Product";
import CarouselProduct from "../app_manager/components/slider/CarouselProduct";
import SliderAds from "../app_manager/components/slider/SliderAds";
import SliderProduct from "../app_manager/components/slider/SliderProduct";
import { Row } from "../common/Elements";
import { actionProductInChild } from "../system/systemAction";

const Home = (props: some) => {
  const [dataListProduct, setDataListProduct] = React.useState<any>();
  const [data, setData] = React.useState<any[]>([]);
  const [pageProduct, setPageProduct] = React.useState<number>(1);
  const sizeProduct = 5;

  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductInChild({
        CategoryID: null,
        page: pageProduct,
        size: sizeProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataListProduct(res);
        setData((data) => [...data,...res.message.productsList])
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListProduct();
  }, [pageProduct]);

  const handleClickMore = () => {
    setPageProduct((pageProduct) => pageProduct + 1);
  }

  return (
    <>
      <Box
        style={{
          padding: 20,
          width: "100%",
          paddingLeft: 70,
          paddingRight: 70,
        }}
      >
        <Row
          style={{
            width: "100%",
          }}
        ></Row>
        <Container maxWidth="xl">
          <CarouselProduct />
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
              data.map(
                (item: some, index: number) => {
                  return <Product key={index} data={item} />;
                }
              )}
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
            <Button variant="outlined" color="primary" onClick={handleClickMore}>
              Xem thêm
            </Button>
          </Row>

          <SliderProduct />
        </Container>
      </Box>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Home));

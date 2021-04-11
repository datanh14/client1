// import { FormattedMessage } from 'react-intl';
import { Box, Container } from "@material-ui/core";
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
  const [pageProduct, setPageProduct] = React.useState<number>(0);
  const sizeProduct = 20;

  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductInChild({
        CategoryID: null,
        page: pageProduct,
        size: sizeProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataListProduct(res);
        console.log("res", res);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchListProduct();
  }, []);

  console.log(dataListProduct);
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
        >
          <CarouselProduct />
        </Row>
        <Container maxWidth="xl">
          <Row
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent:"center",
              margin: "0 auto",
              width: "100%",

            }}
          >
            {dataListProduct !== undefined &&
              dataListProduct.message.productsList.map(
                (item: some, index: number) => {
                  return <Product key={index} data={item} />;
                }
              )}
          </Row>
        </Container>
      </Box>
      <Comment />
      <SliderProduct />
      <SliderAds />
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Home));

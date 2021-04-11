// import { FormattedMessage } from 'react-intl';
import { Box, Container } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../constants/constants";
import { Row } from "../common/Elements";
import { actionGetAllProduct } from "../system/systemAction";
import Product from "../app_manager/components/product/Product";
import Comment from "../app_manager/components/comments/Comment";
import SliderProduct from "../app_manager/components/slider/SliderProduct";
import SliderAds from "../app_manager/components/slider/SliderAds";
import CarouselProduct from "../app_manager/components/slider/CarouselProduct";

const dataItems = [
  {
    sale: true,
    id: 1,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 2,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: true,
    id: 3,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 4,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 5,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 6,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 7,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
  {
    sale: false,
    id: 8,
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  },
];
const Home = (props: some) => {
  return (
    <>
      <Box style={{ padding: 24, width: "100%" }}>
        <Row
          style={{
            width: "100%",
          }}
        >
          <CarouselProduct />
        </Row>
        <Row
          style={{
            flexWrap: "wrap",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {dataItems.map((item: some, index: number) => {
            return <Product key={index} data={item} />;
          })}
        </Row>
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

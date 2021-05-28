import {
    Avatar,
    Box,
    Button,
    CardActions,
    Container,
    Grid,
    IconButton,
    Paper,
    Typography,
  } from "@material-ui/core";
  import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
  import AddIcon from "@material-ui/icons/Add";
  import AddBoxIcon from "@material-ui/icons/AddBox";
  import FavoriteIcon from "@material-ui/icons/Favorite";
  import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
  import ShareIcon from "@material-ui/icons/Share";
  import StarIcon from "@material-ui/icons/Star";
  import StorefrontIcon from "@material-ui/icons/Storefront";
  import Rating from "@material-ui/lab/Rating";
  import parse from "html-react-parser";
  import JSONbig from "json-bigint";
  import React, { useState } from "react";
  import { useParams } from "react-router-dom";
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
    actionGetStoreFollowing,
    actionProductById,
    actionGetProductByStoreIDbyRange,
    actionUnFollow,
  } from "../../../system/systemAction";
  import PreviewDialog from "../dialog/PreviewDialog";
  import CheckIcon from "@material-ui/icons/Check";
  import { connect } from "react-redux";
  import { withRouter } from "react-router-dom";
  import Product from "../product/Product";
  
  interface Props {
    id: string;
  }
  
  const StoreInfor: React.FC<Props> = (props) => {
    const { id } = props;
    const [data, setData] = React.useState<any[]>([]);
    const [pageProduct, setPageProduct] = React.useState<number>(0);
    const sizeProduct = 5;
    const fetchListProduct = async () => {
      try {
        const res: some = await actionGetProductByStoreIDbyRange({
          StoreID: id,
          page: pageProduct,
          size: sizeProduct,
        });
        if (res?.code === SUCCESS_CODE) {
          setData((data) => [...data, ...res.message]);
        } else {
        }
      } catch (error) {}
    };
    React.useEffect(() => {
      fetchListProduct();
    }, [pageProduct]);
  
    const handleClickMore = () => {
      setPageProduct((pageProduct) => pageProduct + 1);
    };
   
    return (
      <>
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
          </Container>
        </Box>
      </>
    );
  };
  export default StoreInfor;
  
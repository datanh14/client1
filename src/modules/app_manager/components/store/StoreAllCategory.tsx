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
  actionGetAllProduct,
} from "../../../system/systemAction";
import PreviewDialog from "../dialog/PreviewDialog";
import CheckIcon from "@material-ui/icons/Check";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Product from "../product/Product";
import { useIntl } from "react-intl";

interface Props {
  id: string;
}

const StoreAllCategory: React.FC<Props> = (props) => {
  const { id } = props;
  const intl = useIntl();
  const [data, setData] = React.useState<any[]>([]);
  const [dataCategoryChild, setDataCategoryChild] = React.useState<any>();
  const [dataListProductChild, setDataListProductChild] = React.useState<any>();
  const [idProductChild, setIdProductChild] = React.useState<string>(id);
  const [pageProduct, setPageProduct] = React.useState<number>(1);
  const sizeProduct = 2;
  const [nameListProduct, setNameListProduct] = React.useState<string>();
  const [star, setStar] = React.useState<number>();
  const [fromPrice, setFromPrice] = React.useState<number>();
  const [toPrice, setToPrice] = React.useState<number>();
  const [searchKey, setSearchKey] = React.useState<string>("");

  const fetchListCategory = async () => {
    try {
      const res: some = await actionGetAllProduct({ parentId: id });
      if (res?.code === SUCCESS_CODE) {
        setDataCategoryChild(res);
        setNameListProduct(res?.message.name);
      } else {
      }
    } catch (error) {}
  };
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
    fetchListCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  React.useEffect(() => {
    fetchListProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, idProductChild]);
  return (
    <div style={{ marginTop: 30 }}>
      <Container style={{ display: "flex" }}>
        <Col style={{ maxWidth: 500, minWidth: 300, flex: 1, marginRight: 10 }}>
          <Paper style={{ padding: 12 }}>
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", marginBottom: 12 }}
            >
              {intl.formatMessage({ id: "IDS_APP_LIST_PRODUCT" })}
            </Typography>
            {dataCategoryChild !== undefined &&
              dataCategoryChild.message.childList.map(
                (data: some, i: number) => (
                  <Typography
                    onClick={() => {
                      setIdProductChild(data.id);
                      setNameListProduct(data.name);
                    }}
                    key={i}
                    variant="body2"
                    style={{ marginBottom: 8, cursor: "pointer" }}
                  >
                    {data.name}
                  </Typography>
                )
              )}
          </Paper>
        </Col>
        <Col style={{ flex: 3 }}>
          <Paper>
            <Typography variant="h6" style={{ padding: "10px 20px" }}>
              {nameListProduct}
            </Typography>
            <Row
              style={{
                flexWrap: "wrap",
                margin: "0 auto",
                width: "100%",
              }}
            >
              {dataListProductChild !== undefined &&
                data.map((item: some, index: number) => {
                  return <Product key={index} data={item} />;
                })}
            </Row>
          </Paper>
        </Col>
      </Container>
    </div>
  );
};
export default StoreAllCategory;

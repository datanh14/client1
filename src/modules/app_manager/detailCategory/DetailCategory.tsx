// import { FormattedMessage } from 'react-intl';
import {
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Rating } from "@material-ui/lab";
import React from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../../constants/constants";
import { Col, Row } from "../../common/Elements";
import {
  actionGetAllProduct,
  actionProductInChild,
} from "../../system/systemAction";
import Product from "../components/product/Product";
import SliderAds from "../components/slider/SliderAds";

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
    chip: {
      marginBottom: 2,
    },
  })
);
const handleClick = () => {
  alert("You clicked the Chip."); // eslint-disable-line no-alert
};
const DetailCategory = (props: some) => {
  const intl = useIntl();
  const id: some = useParams();
  const [dataCategoryChild, setDataCategoryChild] = React.useState<any>();
  const [dataListProductChild, setDataListProductChild] = React.useState<any>();
  const [idProductChild, setIdProductChild] = React.useState<string>(id.id);
  const [pageProduct, setPageProduct] = React.useState<number>(0);
  const sizeProduct = 2;
  const classes = useStyles();
  const fetchListCategory = async () => {
    try {
      const res: some = await actionGetAllProduct({ parentId: id.id });
      if (res?.code === SUCCESS_CODE) {
        setDataCategoryChild(res);
      } else {
      }
    } catch (error) {}
  };
  const fetchListProduct = async () => {
    try {
      const res: some = await actionProductInChild({
        CategoryID: idProductChild,
        page: pageProduct,
        size: sizeProduct,
      });
      if (res?.code === SUCCESS_CODE) {
        setDataListProductChild(res);
        console.log("res", res);
      } else {
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    fetchListCategory();
  }, [id]);
  React.useEffect(() => {
    fetchListProduct();
  }, [idProductChild]);
  console.log("datac", dataCategoryChild);
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
                    key={i}
                    variant="body2"
                    style={{ marginBottom: 8 }}
                  >
                    {data.name}
                  </Typography>
                )
              )}
            <Divider />
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", marginBottom: 12 }}
            >
              {intl.formatMessage({ id: "IDS_APP_DELIVERY_ADDRESS" })}
            </Typography>
            <Typography variant="body2">Tổ 7 Khu 6 Mông Dương</Typography>{" "}
            <Divider />
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", marginBottom: 12 }}
            >
              {intl.formatMessage({ id: "IDS_APP_VOTE" })}
            </Typography>
            <Typography variant="body2">
              {intl.formatMessage({ id: "IDS_APP_VOTE_FROM_5_STARTS" })}
            </Typography>
            <Rating value={5} size="small" />
            <Typography variant="body2">
              {intl.formatMessage({ id: "IDS_APP_VOTE_FROM_4_STARTS" })}
            </Typography>
            <Rating value={4} size="small" />
            <Typography variant="body2">
              {intl.formatMessage({ id: "IDS_APP_VOTE_FROM_3_STARTS" })}
            </Typography>
            <Rating value={3} size="small" />
            <Divider />
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", marginBottom: 12 }}
            >
              {intl.formatMessage({ id: "IDS_APP_PRICE" })}
            </Typography>
            <Chip
              size="small"
              label={"Dưới 500.000"}
              className={classes.chip}
              onClick={handleClick}
            />
            <Chip
              size="small"
              label={"Từ 500.000 đến 8.000.000"}
              className={classes.chip}
            />
            <Chip
              size="small"
              label={"Từ 8.000.000 đến 18.500.000"}
              className={classes.chip}
            />
            <Chip
              size="small"
              label={"Trên 18.500.000 "}
              className={classes.chip}
            />
            <Typography variant="body2" style={{ fontSize: 12, color: "grey" }}>
              {intl.formatMessage({ id: "IDS_APP_CHOSE_PRICE" })}
            </Typography>
            <Row>
              <TextField
                id="outlined-margin-none"
                variant="outlined"
                size="small"
                style={{ marginRight: 0 }}
              />
              -
              <TextField
                id="outlined-margin-none"
                variant="outlined"
                size="small"
              />
            </Row>
            <Button
              style={{ marginTop: 4 }}
              variant="outlined"
              color="primary"
              size="small"
            >
              <Typography
                variant="body2"
                style={{ fontSize: 12, padding: "0px 58px" }}
              >
                {intl.formatMessage({ id: "IDS_APP_APPLY" })}
              </Typography>
            </Button>
            <Divider style={{ marginBottom: 5, marginTop: 5 }} />
            <Typography
              variant="body2"
              style={{ fontWeight: "bold", marginBottom: 12 }}
            >
              {intl.formatMessage({ id: "IDS_APP_BRAND" })}
            </Typography>
          </Paper>
        </Col>
        <Col style={{ flex: 3 }}>
          <Paper>
            <Typography variant="h6" style={{ padding: 10 }}>
              {dataCategoryChild?.message.name}
            </Typography>
            <SliderAds />
            <Row
              style={{
                flexWrap: "wrap",
                margin: "0 auto",
                width: "100%",
              }}
            >
              {dataListProductChild !== undefined &&
                dataListProductChild.message.productsList.map(
                  (item: some, index: number) => {
                    return <Product key={index} data={item} />;
                  }
                )}
            </Row>
          </Paper>
        </Col>
      </Container>
    </div>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(DetailCategory));

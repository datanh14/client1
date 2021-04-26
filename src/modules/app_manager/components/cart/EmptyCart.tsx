// import { FormattedMessage } from 'react-intl';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  ACCOUNTS_ID,
  CART_LOCAL_STORAGE,
  some,
} from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import ProductCart from "./ProductCart";
import JSONbig from "json-bigint";
import { formatter } from "../../../../utils/helpers/helpers";
import { routes } from "../../../../constants/routes";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      transition: theme.transitions.create("transform"),
      backgroundColor: "white",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: 400,
      borderRadius: 10,
      marginLeft: 70,
      marginRight: 70,
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
const EmptyCart = (props: some) => {
  const classes = useStyles();
  const gotoHome = () => {
    props?.history?.push(routes.HOME);
  };
  return (
    <>
      <Grid container>
        <Col className={classes.root}>
          <img
            style={{
              width: "25%",
            }}
            src="https://i.pinimg.com/originals/bc/bd/99/bcbd99c43aea08b85d3c3a6b80a47b56.png"
            title="Không có sản phẩm nào trong giỏ hàng"
          />
          <Typography>
            <Box fontSize={15}>Không có sản phẩm nào trong giỏ hàng</Box>
          </Typography>
          <Typography>
            <Button
              style={{
                width: "100%",
                textAlign: "center",
                paddingLeft: 30,
                paddingRight: 30,
                color: "#ffffff",
                backgroundColor: "#eb4034",
                borderRadius: 5,
                marginTop: 10,
                fontSize: 15,
                fontWeight: "bold",
              }}
              onClick={gotoHome}
            >
              Tiếp tục mua sắm
            </Button>
          </Typography>
        </Col>
      </Grid>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(EmptyCart));

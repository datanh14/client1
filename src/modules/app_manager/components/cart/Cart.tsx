// import { FormattedMessage } from 'react-intl';
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { some } from "../../../../constants/constants";
import { Row } from "../../../common/Elements";
import ProductCart from "./ProductCart";

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
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={8}>
          <Box style={{ padding: 24, width: "100%" }}>
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
              {dataItems.map((item: some, index: number) => {
                return <ProductCart key={index} data={item} />;
              })}
            </Row>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ paddingTop: 24, paddingRight: 24, width: "100%" }}
        >
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
                  <Button color="secondary">Thay đổi</Button>
                </Box>
              </Row>
            </Grid>

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
                    Nguyễn Văn PƠhong
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontWeight="fontWeightBold"
                    style={{
                      marginLeft: 20,
                    }}
                  >
                    0588898568
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
                  Ngõ 26 Doãn Kế Thiện, Phường Mai Dịch, Quận Cầu Giấy, Hà Nội
                </Box>
              </Typography>
            </Grid>
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
                      800000d
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
                      100000d
                    </Box>
                    <Box
                      fontSize={10}
                      marginRight={1}
                      paddingRight={1}
                      style={{
                        color: "#9e9e9e",
                      }}
                    >
                      (Đã bao gồm thuế VAT nếu có )
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
            >
              Tiến hành đặt hàng
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(Cart));

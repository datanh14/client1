// import { FormattedMessage } from 'react-intl';
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { withRouter } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import { actionCategoryAll } from "../../../system/systemAction";

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
    hover: {
      "&:hover": {
        borderWidth: 1,
        borderColor: "orange",
        borderStyle: "solid",
      },
    },
  })
);
const CategoryProduct = (props: some) => {
  const classes = useStyles();
  const [category, setCategory] = React.useState<some[]>([]);

  const fetchCategoryAll = async () => {
    try {
      const res: some = await actionCategoryAll({
        page: 0,
        size: 20,
      });
      if (res?.code === SUCCESS_CODE) {
        setCategory(res?.category);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchCategoryAll();
  }, []);

  return (
    <>
      <Card
        elevation={0}
        style={{
          marginBottom: 25,
        }}
      >
        <CardContent>
          <Typography color="textSecondary" variant="h6" gutterBottom>
            Danh mục sản phẩm
          </Typography>
          <Row
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Grid
              container
              justify="center"
              spacing={0}
              alignContent="space-between"
            >
              {category &&
                category.map((item: some, idx: number) => {
                  return (
                    <Grid
                      item
                      xs
                      style={{
                        padding: 20,
                      }}
                    >
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          textAlign: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          // backgroundColor: idx % 2 === 0 ? "red" : "blue",
                        }}
                        onClick={() => {
                          props?.history?.push(`/detail-category/${item?.id}`);
                        }}
                      >
                        <img
                          src={
                            item?.image ||
                            "https://freshcorner.com.vn/wp-content/uploads/2021/01/empty.jpg"
                          }
                          alt={item?.name}
                          style={{
                            width: 70,
                            height: 70,
                            borderRadius: 5,
                            marginBottom: 10,
                          }}
                          className={classes.hover}
                        />
                        <Typography
                          style={{
                            fontSize: 15,
                          }}
                        >
                          {item?.name}
                        </Typography>
                      </Col>
                    </Grid>
                  );
                })}
            </Grid>
          </Row>
        </CardContent>
      </Card>
    </>
  );
};

export default withRouter(CategoryProduct);

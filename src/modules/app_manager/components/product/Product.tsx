import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import { routes } from "../../../../constants/routes";
import { RouteComponentProps, withRouter } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import {
  createStyles,
  fade,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: 230,
      minHeight: 326,
      maxWidth: 230,
      maxHeight: 326,
      padding: 10,
      zIndex: 1,
      backgroundColor: "white",
      transition: theme.transitions.create("transform"),
    },
    rootHover: {
      minWidth: 230,
      minHeight: 326,
      maxWidth: 230,
      maxHeight: 326,
      padding: 10,
      zIndex: 2,
      boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      elevation: 10,
      backgroundColor: "white",
      transition: theme.transitions.create("transform"),
      overflow: "hidden",
    },
  })
);

const Product = (props: any) => {
  const classes = useStyles();
  const { data } = props;
  const [isHover, setIsHover] = useState(false);
  const gotoAction = (route: string) =>
    props?.history?.push(`product-detail/${route}`);
  return (
    <>
      <div
        className={isHover ? classes.rootHover : classes.root}
        onClick={() => {
          gotoAction(data.dir);
        }}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          style={{
            width: "80%",
            marginRight: 18,
            marginLeft: 18,
          }}
          src={data.img}
          alt={data.title}
        />
        <p style={{ fontSize: 13 }}>{data.dir}</p>
        <Rating
          name="customized-10"
          defaultValue={data.sao}
          max={5}
          size="small"
        />
        <Box
          display="flex"
          alignItems="flex-start"
          style={{
            marginTop: 10,
          }}
        >
          <Box
            style={{
              maxHeight: 30,
              alignItems: "center",
              display: "flex",
            }}
          >
            <h2> {data.gia} </h2>
          </Box>
          {data.sale && (
            <Box
              style={{
                maxWidth: 40,
                maxHeight: 30,
                marginLeft: 20,
                textAlign: "center",
                borderRadius: 5,
                backgroundColor: "#ff424e",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <p>-13%</p>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
};

export default withRouter(Product);

import { Box, Typography } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { formatter } from "../../../../utils/helpers/helpers";

const Product = (props: any) => {
  const { data } = props;
  const [isHover, setIsHover] = useState(false);
  const productStyle = {
    minWidth: 234.5,
    minHeight: 326,
    maxWidth: 234.5,
    maxHeight: 326,
    padding: 10,
    zIndex: 1,
    backgroundColor: "white",
  };
  const productHoverStyle = {
    minWidth: 234.5,
    minHeight: 326,
    maxWidth: 234.5,
    maxHeight: 326,
    padding: 10,
    zIndex: 2,
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    elevation: 10,
    backgroundColor: "white",
    overflow: "hidden",
  };
  const gotoAction = (route: string) => {
    props?.history?.push(`/product-detail/${route}`);
  };
  console.log("datadata", data);
  return (
    <>
      <div
        onClick={() => {
          gotoAction(data.id);
        }}
        style={isHover ? productHoverStyle : productStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          style={{
            width: "80%",
            height: 187.6,
            marginRight: 18,
            marginLeft: 18,
          }}
          src={data.image ? data.images[0] : data.images}
          alt={data.name}
        />
        <Typography
          variant="body2"
          style={{
            fontSize: 20,
            marginBottom: 5,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Box>{data.name}</Box>
        </Typography>
        <Rating
          name="customized-10"
          defaultValue={data.ratingsCount}
          max={5}
          size="small"
          readOnly={true}
        />
        <Box
          display="flex"
          alignItems="flex-start"
          style={{
            marginTop: 5,
          }}
        >
          <Typography
            variant="body2"
            style={{
              alignItems: "center",
              display: "flex",
              fontSize: 17,
            }}
          >
            {formatter(data.price)}
          </Typography>

          {data?.discount && (
            <Box
              style={{
                maxWidth: 40,
                maxHeight: 30,
                marginLeft: 20,
                textAlign: "center",
                borderRadius: 2,
                backgroundColor: "#ff424e",
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
                padding: 2,
              }}
            >
              <p>{data.discount}%</p>
            </Box>
          )}
        </Box>
      </div>
    </>
  );
};

export default withRouter(Product);

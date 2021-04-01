import { Box } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import { some } from "../../constants/constants";

interface Props {
  data: some;
}
const ProductItem = (props: any) => {
  const { data } = props;
  return (
    <>
      <Paper
        style={{
          maxWidth: 256,
          maxHeight: 400,
          padding: 10,
        }}
      >
        <img
          style={{
            width: "100%",
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
      </Paper>
    </>
  );
};

export default ProductItem;

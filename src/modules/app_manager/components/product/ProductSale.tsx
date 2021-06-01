import { Box } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import React from "react";
import { some } from "../../../../constants/constants";

interface Props {
  item: some;
  open: boolean;
  loading: boolean;
  disabled?: boolean;
  setOpen: (val: boolean) => void;
  handleSubmit: () => void;
}
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    width: "100%",
    height: 20,
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
    backgroundColor: "#ff424e",
  },
}))(LinearProgress);

const ProductSale = (props: Props) => {
  const tile = {
    img: "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
  };
  return (
    <>
      <Paper
        style={{
          width: 256,
          height: 332,
          padding: 20,
          margin: 20,
          textAlign: "center",
        }}
        elevation={10}
      >
        <img
          style={{
            width: "100%",
          }}
          src={tile.img}
          alt={tile.title}
        />
        <h2> {tile.gia} </h2>
        <Box display="flex" alignItems="flex-start">
          <Box
            position="absolute"
            zIndex="tooltip"
            left="20%"
            style={{
              marginTop: -15,
            }}
          >
            <img
              alt=""
              style={{
                width: 30,
                height: 30,
              }}
              src="https://frontend.tikicdn.com/_desktop-next/static/img/fire_icon.svg"
            />
          </Box>
          <BorderLinearProgress variant="determinate" value={50} />
        </Box>
      </Paper>
    </>
  );
};

export default ProductSale;

import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { some } from "../../../../constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    grid: {
      display: "flex",
    },
  })
);
const Footer = (props: some) => {
  const classes = useStyles();
  const [count, setCount] = React.useState(1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const data = {
    img:
      "https://salt.tikicdn.com/cache/280x280/ts/product/62/47/4a/99d8fa9e8b09a9b63e1eabb1b515e8ed.jpg",
    title: "ok",
    gia: "100d",
    dir: "Gối Tựa Lưng Sofa Hình Học Thổ Cẩm PA9251",
    sao: 2,
    pt: "-26%",
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        style={{
          marginTop: 10,
          marginBottom: 0,
          backgroundColor: "white",
          padding: 20,
        }}
      >
        Footer
      </Grid>
    </div>
  );
};
export default Footer;

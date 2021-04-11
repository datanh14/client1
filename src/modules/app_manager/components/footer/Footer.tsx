import { Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { some } from "../../../../constants/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginBottom: 0,
      backgroundColor: "white",
    },
    grid: {
      display: "flex",
    },
  })
);
const Footer = (props: some) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className={classes.root}>
      <Grid container>Footer</Grid>
    </div>
  );
};
export default Footer;

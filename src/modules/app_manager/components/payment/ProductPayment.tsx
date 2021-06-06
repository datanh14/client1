import {
  Box,
  Button,
  ButtonGroup,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ReceiptIcon from "@material-ui/icons/Receipt";
import RemoveIcon from "@material-ui/icons/Remove";
import clsx from "clsx";
import React from "react";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { formatter } from "../../../../utils/helpers/helpers";
import { Col, Row } from "../../../common/Elements";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { actionGetStoreByID } from "../../../system/systemAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      width: "100%",
     
    },
    grid: {
      display: "flex",
    },
    button: {
      width: 20,
      height: 20,
      color: "#2979ff",
    },
    icon: {
      color: "#2979ff",
    },
    grey: {
      color: "#bdbdbd",
    },
    iconSmall: {
      width: 20,
      height: 20,
    },
    linkStore: {
      display: "flex",
      color: "green",
      "&:hover": {
        fontWeight: "bold",
        cursor: "pointer",
      },
    },
  })
);
interface Props {
  index: number;
  data: some;
}

const ProductPayment: React.FC<RouteComponentProps<some> & Props> = (props) => {
  const { index, data } = props;
  const classes = useStyles();
  const [count, setCount] = React.useState(data?.count);
  const [expanded, setExpanded] = React.useState(false);

  return ( 
    <div className={classes.root}>
      {data !== undefined && (
        <Grid
          container
          style={{
            backgroundColor: "white",
            padding: 10,
            borderBottom: "1px solid #ededed",
          }}
        >
          <Grid item xs={12} sm={1}>
            <img
              style={{
                width: "100%",
                borderRadius: 10,
                cursor: "pointer",
              }}
              src={data?.images ? data?.images[0] : ""}
              alt={data?.name}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Typography>
              <Box
                fontSize={15}
                padding={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  maxWidth: 300,
                }}
              >
                {data?.name}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Col>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Box paddingTop={1} fontSize={15}>
                  {formatter(
                    data?.price - (data?.price * data?.discount) / 100
                  )}
                </Box>
              </Typography>
             
              <Box
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                SL: {count}
              </Box>
            </Col>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default withRouter(ProductPayment);

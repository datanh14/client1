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
      transition: theme.transitions.create("transform"),
    },
    grid: {
      display: "flex",
    },
    expand: {
      transform: "rotate(0deg)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
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
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
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
  changeCount(index: number, count: number): void;
  handleDeleteProductByCart(index: number): void;
}

const ProductCart: React.FC<RouteComponentProps<some> & Props> = (props) => {
  const { index, data, changeCount, handleDeleteProductByCart } = props;
  const classes = useStyles();
  const [count, setCount] = React.useState(data?.count);
  const [loading, setLoading] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [isBuyInDay, setIsBuyInDay] = React.useState(false);
  const [isSale, setIsSale] = React.useState(false);
  const [storeData, setStoreData] = React.useState<some>({});

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const gotoAction = (route: string) => {
    // props?.history?.push(`/`);
    props?.history?.push(`product-detail/${route}`);
  };

  const fetchGetStoreByID = async () => {
    try {
      const res: some = await actionGetStoreByID({
        StoreID: data?.storeID,
      });
      if (res?.code === SUCCESS_CODE) {
        res?.store && setStoreData(res?.store);
      } else {
      }
    } catch (error) {}
    finally {
      setLoading(true);
    }
  };

  React.useEffect(() => {
    fetchGetStoreByID();
  }, []);

  return ( 
    <div className={classes.root} key={data?.id}>
      {data !== undefined && loading && (
        <Grid
          container
          style={{
            marginBottom: 20,
            backgroundColor: "white",
            padding: 20,
            width: "100%"
          }}
        >
          <Grid item xs={12}>
            <Typography>
              <Box
                fontWeight="fontWeightBold"
                fontSize={15}
                marginBottom={1}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  onClick={() => {
                    props?.history?.push(`/store/${storeData?.id}`);
                  }}
                  className={classes.linkStore}
                >
                  <Box fontSize={15}> {storeData?.name}</Box>
                </Typography>
                <NavigateNextIcon
                  className={classes.iconSmall}
                  style={{
                    marginLeft: 5,
                  }}
                />
              </Box>
            </Typography>
          </Grid>
          {isSale && (
            <Grid item xs={12}>
              <Row>
                <Typography>
                  <Box
                    fontWeight="fontWeightBold"
                    fontSize={15}
                    marginRight={1}
                    paddingRight={1}
                    style={{
                      color: "#ff9800",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <ReceiptIcon
                      className={classes.iconSmall}
                      style={{
                        color: "#ff9800",
                        marginRight: 5,
                      }}
                    />
                    Bạn được giảm giá 46k
                  </Box>
                </Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </Row>
            </Grid>
          )}

          <Grid item xs={12}>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron
                </Typography>
              </CardContent>
            </Collapse>
          </Grid>
          <Grid item xs={12} sm={2}>
            <img
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
                cursor: "pointer",
              }}
              src={data?.images ? data?.images[0] : ""}
              alt={data?.name}
              onClick={() => {
                gotoAction(data?.id);
              }}
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
                  maxWidth: 400,
                }}
                onClick={() => {
                  gotoAction(data?.id);
                }}
              >
                {data?.name}
              </Box>
            </Typography>
            {isBuyInDay && (
              <Typography>
                <Box
                  fontWeight="fontWeightBold"
                  fontSize={14}
                  padding={1}
                  style={{
                    color: "green",
                    display: "flex",
                  }}
                >
                  GIAO TRONG NGÀY
                </Box>
              </Typography>
            )}
            <Row>
              <Button
                color="secondary"
                onClick={() => {
                  handleDeleteProductByCart(index);
                }}
              >
                Xóa
              </Button>
              {/* <Button color="secondary">Để dành mua sau</Button> */}
            </Row>
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
                <Box paddingTop={1} fontWeight="bold" fontSize={15}>
                  {formatter(
                    data?.price - (data?.price * data?.discount) / 100
                  )}
                </Box>
              </Typography>
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <Typography>
                  <Box
                    fontSize={12}
                    style={{
                      textDecoration: "line-through",
                      borderRight: "1px solid #ededed",
                      paddingRight: 10,
                    }}
                  >
                    {formatter(data?.price)}
                  </Box>
                </Typography>
                <Typography>
                  <Box
                    fontSize={12}
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {data?.discount}%
                  </Box>
                </Typography>
              </Row>
              <Box
                paddingTop={2}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <ButtonGroup size="small">
                  <Button
                    aria-label="reduce"
                    onClick={() => {
                      setCount(Math.max(count - 1, 1));
                      changeCount(index, Math.max(count - 1, 1));
                    }}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button size="small">{count}</Button>
                  <Button
                    aria-label="increase"
                    size="small"
                    onClick={() => {
                      setCount(count + 1);
                      changeCount(index, count + 1);
                    }}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
              </Box>
            </Col>
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default withRouter(ProductCart);

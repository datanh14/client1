// import { FormattedMessage } from 'react-intl';
import { Avatar, Box, Button, Paper, Typography } from "@material-ui/core";
import {
  createStyles,
  makeStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import React from "react";
import { useParams, withRouter } from "react-router-dom";
import {
  ACCOUNTS_ID,
  some,
  SUCCESS_CODE,
} from "../../../../constants/constants";
import { Col, Row } from "../../../common/Elements";
import {
  actionAddFollow,
  actionGetStoreByID,
  actionGetStoreFollowing,
  actionUnFollow,
} from "../../../system/systemAction";
import StoreAllCategory from "./StoreAllCategory";
import StoreWithProduct from "./StoreWithProduct";
import StoreInfor from "./StoreInfor";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      color: "#fff",
      //fontWeight: theme.typography.fontWeightRegular,
      fontWeight: "bold",
      fontSize: theme.typography.pxToRem(13),
      marginRight: theme.spacing(1),
      "&:focus": {
        opacity: 1,
        fontWeight: "bold",
      },
    },
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      marginTop: 20,
      zIndex: -1,
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
    button: {
      backgroundColor: "#ffb459",
      fontSize: theme.typography.pxToRem(13),
      color: "white",
    },
  })
);
const StoreDetail = (props: some) => {
  const classes = useStyles();
  const id: some = useParams();
  const [value, setValue] = React.useState(0);
  const [storeData, setStoreData] = React.useState<some>({});
  const [userID, setUserID] = React.useState(
    localStorage.getItem(ACCOUNTS_ID) || ""
  );
  const [isFollow, setFollow] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const fetchGetStoreByID = async () => {
    try {
      const res: some = await actionGetStoreByID({
        StoreID: id.id,
      });
      if (res?.code === SUCCESS_CODE) {
        res?.store && setStoreData(res?.store);
        fetchGetStoreFollowing();
        // setDataListProduct(res);
      } else {
      }
    } catch (error) {}
  };

  const fetchAddFollow = async () => {
    try {
      const res: some = await actionAddFollow({
        userID: userID,
        storeID: id.id,
      });
      if (res?.code === SUCCESS_CODE) {
        setFollow(true);
      } else {
      }
    } catch (error) {}
  };

  const fetchUnFollow = async () => {
    try {
      const res: some = await actionUnFollow({
        userID: userID,
        storeID: id.id,
      });
      if (res?.code === SUCCESS_CODE) {
        setFollow(false);
      } else {
      }
    } catch (error) {}
  };

  const fetchGetStoreFollowing = async () => {
    try {
      const res: some = await actionGetStoreFollowing({
        userID: userID,
      });
      if (res?.code === SUCCESS_CODE) {
        let follow: boolean = false;
        res?.message &&
          res?.message.map((item: some, index: number) => {
            if (item?.id === id.id) {
              follow = true;
            }
          });
        setFollow(follow);
      } else {
      }
    } catch (error) {}
  };

  const handleFollow = () => {
    isFollow ? fetchUnFollow() : fetchAddFollow();
  };

  React.useEffect(() => {
    fetchGetStoreByID();
  }, [id]);

  React.useEffect(() => {
    setUserID(localStorage.getItem(ACCOUNTS_ID) || "");
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Paper
          elevation={0}
          style={{
            width: "100%",
            backgroundImage: `url("https://png.pngtree.com/thumb_back/fh260/background/20190827/pngtree-abstract-80s-trendy-geometric-background-neon-colors-image_304908.jpg")`,
          }}
        >
          <Row
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            <Row>
              <Avatar
                alt="Remy Sharp"
                src="https://img.icons8.com/color/48/000000/shop.png"
                style={{
                  backgroundColor: "white",
                  width: 60,
                  height: 60,
                  padding: 10,
                }}
              />
              <Col
                style={{
                  marginLeft: 10,
                  paddingRight: 10,
                }}
              >
                <Typography>
                  <Box
                    fontSize={20}
                    fontWeight="bold"
                    style={{ color: "white" }}
                  >
                    {storeData?.name}
                  </Box>
                </Typography>
                <Typography>
                  <Box fontSize={15} style={{ color: "#c9c9c9" }}>
                    {storeData?.followerCount} lượt theo dõi
                  </Box>
                </Typography>
              </Col>
            </Row>
            <Button
              variant="contained"
              className={classes.button}
              startIcon={
                isFollow ? <CheckIcon style={{ color: "blue" }} /> : <AddIcon />
              }
              onClick={handleFollow}
            >
              {isFollow ? "Đã theo dõi" : "Theo dõi"}
            </Button>
          </Row>

          <StyledTabs
            value={value}
            onChange={handleChange}
            aria-label="styled tabs example"
          >
            <StyledTab label="Cửa hàng" />
            <StyledTab label="Tất cả sản phẩm" />
          </StyledTabs>
        </Paper>
        <TabPanel value={value} index={0}>
          <StoreWithProduct id={id.id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <StoreAllCategory id={id.id} />
        </TabPanel>
      </div>
    </>
  );
};

export default withRouter(StoreDetail);

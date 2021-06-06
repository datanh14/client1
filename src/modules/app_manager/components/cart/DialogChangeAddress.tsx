// import { FormattedMessage } from 'react-intl';
import { Button, Typography, Box } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import Radio from "@material-ui/core/Radio";
import { Row } from "../../../common/Elements";
import { actionChangeDefaultAddress } from "../../../system/systemAction";
import ConfirmDialog from "../../../common/ConfirmDialog";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(5),
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
    addressHover: {
      backgroundColor: "#d1cfcf",
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "white",
      borderStyle: "solid",
      padding: 10,
      color: "white",
    },
    address: {
      margin: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#cccccc",
      borderStyle: "solid",
      padding: 10,
    },
  })
);

interface Props {
  indexDefaut: number;
  item: some;
  fetchData: () => void;
}

const DialogChangeAddress: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const { indexDefaut, item, fetchData } = props;
  const [open, setOpen] = React.useState(false);
  const [indexHover, setIndexHover] = React.useState(-1);
  const [indexChoose, setIndexChoose] = React.useState(indexDefaut);
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchChangeDefaultAddress = async (id: string) => {
    try {
      const res: some = await actionChangeDefaultAddress(JSON.stringify(id));
      if (res?.code === SUCCESS_CODE) {
        setOpen(false);
        fetchData();
      } else {
      }
    } catch (error) {}
  };

  return (
    <>
      <Button color="secondary" onClick={handleOpen}>
        Thay đổi
      </Button>
      <Dialog
        onClose={handleClose}
        open={open}
        fullWidth={true}
        maxWidth="sm"
        aria-labelledby="max-width-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="max-width-dialog-title">
          <Typography>
            <Box
              fontWeight="fontWeightBold"
              fontSize={20}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Chọn địa chỉ:
            </Box>
          </Typography>
        </DialogTitle>
        {item &&
          item.map((it: some, index: number) => {
            return (
              <Row
                className={
                  indexHover === index ? classes.addressHover : classes.address
                }
                onMouseEnter={() => setIndexHover(index)}
                onMouseLeave={() => setIndexHover(-1)}
                onClick={() => {
                  setIndexChoose(index);
                  fetchChangeDefaultAddress(it?.id);
                }}
              >
                <Radio
                  checked={index === indexChoose}
                  onChange={() => {
                    setIndexChoose(index);
                  }}
                  value="a"
                  name="radio-button-demo"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                />
                <Typography>
                  <Box
                    fontSize={20}
                    marginRight={1}
                    paddingRight={1}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 1,
                    }}
                  >
                    {it
                      ? it?.address +
                        ", " +
                        it?.district?.districtName +
                        ", " +
                        it?.city?.cityName
                      : ""}
                  </Box>
                </Typography>
              </Row>
            );
          })}
      </Dialog>
    </>
  );
};

export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(DialogChangeAddress));

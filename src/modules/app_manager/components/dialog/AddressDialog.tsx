import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routes } from "../../../../constants/routes";

interface Props {
  setOpenLoginDialog: (open: boolean) => void;
  isOpen: boolean;
  value: string;
}
const AddressDialog: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { isOpen, value, setOpenLoginDialog } = props;
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = () => {
    setOpenLoginDialog(false);
  };

  const handleLogin = () => {
    setOpenLoginDialog(false);
    props?.history?.push(`/customer/address`);
  };

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Yêu cầu đăng nhập"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Để tiến hành {value} bạn cần thêm địa chỉ nhận hàng
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleLogin} color="primary" autoFocus>
            Thay đổi
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withRouter(AddressDialog);

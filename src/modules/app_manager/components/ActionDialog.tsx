import { Button, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ReactComponent as IconEdit } from "../../../assets/icons/ic_edit.svg";
import { BLUE_NAVY } from "../../../assets/theme/colors";
import { some } from "../../../constants/constants";
import ConfirmDialog from "../../common/ConfirmDialog";

interface Props {
  item: some;
  open: boolean;
  loading: boolean;
  disabled?: boolean;
  setOpen: (val: boolean) => void;
  handleSubmit: () => void;
}

const ActionDialog: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const {
    item,
    open,
    loading,
    disabled,
    setOpen,
    handleSubmit,
    ...rest
  } = props;
  const { pathname } = props?.location;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {item ? (
        <IconButton title="Chỉnh sửa" onClick={handleOpen}>
          <IconEdit />
        </IconButton>
      ) : (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ minWidth: 132, marginLeft: 24, background: BLUE_NAVY }}
          disableElevation
          onClick={handleOpen}
        >
          <FormattedMessage
            id="IDS_CHAT_CREATE"
            values={{ value: pathname.split("/").pop() }}
          />
        </Button>
      )}

      <ConfirmDialog
        titleLabel={
          <Typography variant="subtitle1" style={{ margin: "12px 16px" }}>
            <FormattedMessage
              id={item ? "IDS_CHAT_EDIT" : "IDS_CHAT_CREATE"}
              values={{ value: pathname.split("/").pop() }}
            />
          </Typography>
        }
        open={open}
        onClose={handleClose}
        onReject={handleClose}
        onAccept={handleSubmit}
        loading={loading}
        disabled={disabled}
        {...rest}
      >
        <div style={{ padding: "24px 16px", minHeight: 120 }}>
          {props?.children}
        </div>
      </ConfirmDialog>
    </>
  );
};

export default withRouter(ActionDialog);

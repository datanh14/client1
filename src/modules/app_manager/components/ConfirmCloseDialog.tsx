import { Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import ConfirmDialog from '../../common/ConfirmDialog';

//GENERIC CONFIMATION DIALOG! BOOM
interface Props {
  dialogTitle: string;
  dialogContent: string;
  openDialog: boolean;
  handleCloseDialog: () => void;
  onAcceptDialog: () => void;
}

const ConfirmationDialog: React.FC<Props> = (props) => {
  const {
    handleCloseDialog,
    dialogTitle,
    dialogContent,
    openDialog,
    onAcceptDialog,
  } = props;

  return (
    <>
      <ConfirmDialog
        titleLabel={
          <Typography variant="subtitle1" style={{ margin: "12px 16px" }}>
            <FormattedMessage id={dialogTitle} />
          </Typography>
        }
        open={openDialog}
        onClose={() => handleCloseDialog()}
        onReject={() => handleCloseDialog()}
        onAccept={() => {
          onAcceptDialog();
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "24px 16px",
            minHeight: 120,
          }}
        >
          <Typography
            variant="body2"
            style={{ marginBottom: 0, padding: "0 16px", fontWeight: 500 }}
          >
            <FormattedMessage id={dialogContent} />
          </Typography>
        </div>
      </ConfirmDialog>
    </>
  );
};

export default ConfirmationDialog;

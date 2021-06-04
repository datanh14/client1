import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { ReactComponent as SuccessIcon } from "../../../../assets/icons/ic_successIcon.svg";
import { BLUE_NAVY } from "../../../../assets/theme/colors";
import { routes } from "../../../../constants/routes";
import { Col, PageContainer } from "../../../common/Elements";
import LoadingButton from "../../../common/LoadingButton";

const ResetPasswordSuccess = () => {
  return (
    <PageContainer>
      <Paper
        style={{
          border: "0.5px solid #BDBDBD",
          borderRadius: "12px",
          width: 570,
          height: 320,
          marginTop: 24,
          padding: "38px 40px",
          display: "flex",
        }}
      >
        <Col style={{ alignItems: "center", flex: 1 }}>
          <SuccessIcon style={{ marginBottom: 32 }} />
          <Typography
            variant="body2"
            style={{
              display: "",
              wordWrap: "break-word",
              maxWidth: 350,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            <FormattedMessage id="IDS_RESET_PASSWORD_SUCCESS_NOTE" />
          </Typography>
          <Link to={routes.LOGIN} style={{ textDecoration: "none" }}>
            <LoadingButton
              style={{ minWidth: 200, height: 36, backgroundColor: BLUE_NAVY }}
              type="submit"
              variant="contained"
              disableElevation
            >
              <Typography variant="body2" style={{ color: "white" }}>
                <FormattedMessage id="IDS_LOGIN" />
              </Typography>
            </LoadingButton>
          </Link>
        </Col>
      </Paper>
    </PageContainer>
  );
};

export default ResetPasswordSuccess;

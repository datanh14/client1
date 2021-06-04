import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { useParams, useLocation } from "react-router-dom";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { snackbarSetting } from "../../../common/Elements";
import { actionResetPasswordMail } from "../../../system/systemAction";
import ForgotPasswordDesktop from "../components/ForgotPasswordDesktop";
import ForgotPasswordSuccess from "../components/ForgotPasswordSuccess";
// eslint-disable-next-line react/require-default-props

interface Props  {
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

const ForgotPassword: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const intl = useIntl();
  let query = useQuery();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  
  const onForgotPassword = async (data: some) => {
    let isNotify: boolean = false;
    try {
      setLoading(true);
      const res: some = await actionResetPasswordMail({
        ...data,
      });
      if (res?.code === SUCCESS_CODE) {
        setSuccess(true);
        isNotify = true;
        enqueueSnackbar(
          res?.message,
          snackbarSetting((key) => closeSnackbar(key), { color: "success" })
        );
      } else {
        isNotify = true;
        enqueueSnackbar(
          res?.message,
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
      !isNotify && enqueueSnackbar(
        "Tài khoản của bạn không tồn tại",
        snackbarSetting((key) => closeSnackbar(key), { color: "error" })
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {intl.formatMessage({
            id: !success ? "IDS_REGISTER" : "IDS_AUTH_REGISTER_SUCCESS",
          })}
        </title>
      </Helmet>
      {!success ? (
        <ForgotPasswordDesktop loading={loading} onForgotPassword={onForgotPassword} />
      ) : (
        <ForgotPasswordSuccess />
      )}
    </>
  );
};

export default (withRouter(ForgotPassword));

import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { some, SUCCESS_CODE } from "../../../../constants/constants";
import { snackbarSetting } from "../../../common/Elements";
import { AppState } from "../../../rootReducer";
import { actionRegister } from "../../../system/systemAction";
import RegisterDesktop from "../components/RegisterDesktop";
import RegisterSuccess from "../components/RegisterSuccess";

// eslint-disable-next-line react/require-default-props
const mapStateToProps = (state: AppState) => ({});

interface Props extends ReturnType<typeof mapStateToProps> {
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: ThunkDispatch<AppState, null, Action<string>>;
}

const Register: React.FC<Props> = (props) => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const onRegister = async (data: some) => {
    try {
      setLoading(true);
      const res: some = await actionRegister({
        ...data,
        // dateofbirth: data.dateofbirth.format("YYYY-MM-DD"),
      });
      //C_DATE_FORMAT
      if (res?.code === SUCCESS_CODE) {
        setSuccess(true);
      } else {
        enqueueSnackbar(
          res?.message,
          snackbarSetting((key) => closeSnackbar(key), { color: "error" })
        );
      }
    } catch (error) {
    } finally {
      setLoading(false);
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
        <RegisterDesktop loading={loading} onRegister={onRegister} />
      ) : (
        <RegisterSuccess />
      )}
    </>
  );
};

export default connect(mapStateToProps)(Register);

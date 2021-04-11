import React from "react";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { Typography } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { withRouter, RouteComponentProps } from "react-router-dom";
// import * as yup from 'yup';
import { Col, Row, snackbarSetting } from "../../modules/common/Elements";
import FormControlTextField from "../../modules/common/FormControlTextField";
import { useSnackbar } from "notistack";
import { FormattedMessage, useIntl } from "react-intl";
import LoadingButton from "../../modules/common/LoadingButton";
// import { BLUE_500, BLUE_NAVY } from 'assets/theme/colors';
import { BLUE_NAVY } from "../../assets/theme/colors";
import { routes } from "../../constants/routes";
import {
  actionLogin,
  actionUpdateProfile,
} from "../../modules/system/systemAction";
import {
  ACCESS_TOKEN,
  ACCOUNTS,
  some,
  SUCCESS_CODE,
} from "../../constants/constants";
import { AppState } from "../../modules/rootReducer";
import { isEmpty } from "../../utils/helpers/helpers";
import JSONbig from "json-bigint";

interface Props {}
const LoginForm: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { handleSubmit, control } = useForm({
    defaultValues: { account: "", password: "" },
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const res: some = await actionLogin({ ...data });
      if (res?.code === SUCCESS_CODE) {
        localStorage.setItem(ACCESS_TOKEN, res?.token);
        localStorage.setItem(ACCOUNTS, JSONbig.stringify(res?.userInfo));
        if (!isEmpty(data)) {
          // dispatch(actionSetStatus(data?.status));
          dispatch(actionUpdateProfile(data));
          props?.history?.push(routes.HOME);
        } else {
          localStorage.removeItem(ACCESS_TOKEN);
          enqueueSnackbar(
            "Bạn không có quyền truy cập hệ thống!",
            snackbarSetting((key) => closeSnackbar(key), { color: "error" })
          );
        }
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: 500 }}
      autoComplete="none"
    >
      <Col style={{ padding: "36px 30px" }}>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          <FormattedMessage id="IDS_LOGIN_SYSTEM" />
        </Typography>
        <Controller
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%", marginTop: 16 }}
              label={<FormattedMessage id="IDS_USERNAME" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_USERNAME" })}
              inputProps={{ maxLength: 50, autoComplete: "none" }}
              optional
              inputRef={ref}
            />
          ))}
          name="account"
          control={control}
        />
        <Controller
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%", marginTop: 12 }}
              label={<FormattedMessage id="IDS_PASSWORD" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_PASSWORD" })}
              inputProps={{ maxLength: 20, autoComplete: "none" }}
              type="password"
              optional
              inputRef={ref}
            />
          ))}
          name="password"
          control={control}
        />

        {/* <Row style={{ marginTop: 14 }}>
          <Checkbox
            checked={true}
            onClick={() => {}}
            color="primary"
            style={{ padding: 0, marginRight: 6 }}
          />
          <Typography variant="body2">
            <FormattedMessage id="IDS_SAVE_INFO" />
          </Typography>
        </Row> */}
        <Row style={{ marginTop: "18px", justifyContent: "space-between" }}>
          <LoadingButton
            style={{
              minWidth: 120,
              width: "100%",
              height: 36,
              background: BLUE_NAVY,
            }}
            type="submit"
            variant="contained"
            color="secondary"
            disableElevation
            loading={loading}
          >
            <Typography variant="subtitle2">
              <FormattedMessage id="IDS_LOGIN" />
            </Typography>
          </LoadingButton>
          {/* <Typography variant="body2" style={{ color: BLUE_500 }}>
            <FormattedMessage id="IDS_FORGOT_PASSWORD" />
          </Typography> */}
        </Row>
        {/* <Divider style={{ margin: '16px 0px 12px 0px', width: '100%' }} />
        <Row>
          <Typography variant="body2">
            <FormattedMessage id="IDS_HAVE_NOT_ACCOUNT" />
          </Typography>
          &nbsp;
          <Typography variant="body2" style={{ color: BLUE_500 }}>
            <FormattedMessage id="IDS_SIGN_UP_NOW" />
          </Typography>
        </Row> */}
      </Col>
    </form>
  );
};

export default withRouter(LoginForm);

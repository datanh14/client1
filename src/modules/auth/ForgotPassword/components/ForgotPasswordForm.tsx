/* eslint-disable no-unused-vars */
import {
  Divider,
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { BLUE_500, BLUE_NAVY } from "../../../../assets/theme/colors";
import { routes } from "../../../../constants/routes";
import { Col, Row } from "../../../common/Elements";
import FormControlTextField from "../../../common/FormControlTextField";
import LoadingButton from "../../../common/LoadingButton";
import { IForgotPassword } from "../../redux/authThunks";
import moment, { Moment } from "moment";
import { DATE_FORMAT_BACK_END } from "../../../../models/moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface Props {
  loading: boolean;
  onForgotPassword(data: IForgotPassword): void;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
);
const ForgotPasswordForm: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { onForgotPassword, loading } = props;
  const intl = useIntl();
  const [endDate, setEndDate] = React.useState<Moment | undefined>(moment());
  const schema = yup.object().shape({
    userName: yup.string().required("Tài khoản không được để trống"),
    // email: yup
    //   .string()
    //   .required("Email không được để trống")
    //   .email("Email không hợp lệ"),
  });

  const { handleSubmit, getValues, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      userName: "",
    },
  });
  const { errors } = formState;
  
  return (
    <form
      onSubmit={handleSubmit(onForgotPassword)}
      style={{ width: 500 }}
      autoComplete="none"
    >
      <Col style={{ padding: "24px 30px" }}>
        <Typography variant="h6" style={{ fontWeight: "bold",paddingBottom: 20  }}>
          <FormattedMessage id="IDS_AUTH_FORGOT_PASSWORD" />
        </Typography>
        {/* <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_EMAIL" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_EMAIL" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              errorMessage={errors.email?.message}
              inputRef={ref}
            />
          )}
          name="email"
          control={control}
        /> */}
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_AUTH_ACCOUNT" />}
              placeholder={intl.formatMessage({ id: "IDS_AUTH_ENTER_ACCOUNT" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              errorMessage={errors.userName?.message}
              inputRef={ref}
            />
          )}
          name="userName"
          control={control}
        />
        <LoadingButton
          style={{ minWidth: 160, backgroundColor: BLUE_NAVY, marginTop: 10, }}
          type="submit"
          variant="contained"
          loading={loading}
          disableElevation
        >
          <Typography
            variant="body2"
            style={{ width: 140, whiteSpace: "nowrap", color: "white" }}
          >
            <FormattedMessage id="IDS_GET_PASSWORD" />
          </Typography>
        </LoadingButton>
        <Divider style={{ margin: "16px 0px 12px 0px", width: "280px" }} />
        <Row>
          <Typography variant="body2">
            <FormattedMessage id="IDS_AUTH_ALREADY_LOGIN" />
          </Typography>
          &nbsp;
          <Link to={routes.LOGIN}>
            <Typography variant="body2" style={{ color: BLUE_500 }}>
              <FormattedMessage id="IDS_AUTH_SIGNIN_NOW" />
            </Typography>
          </Link>
        </Row>
      </Col>
    </form>
  );
};

export default ForgotPasswordForm;

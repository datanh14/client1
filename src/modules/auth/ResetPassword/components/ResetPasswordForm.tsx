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
import { IResetPassword } from "../../redux/authThunks";
import moment, { Moment } from "moment";
import { DATE_FORMAT_BACK_END } from "../../../../models/moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface Props {
  loading: boolean;
  onResetPassword(data: IResetPassword): void;
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
const ResetPasswordForm: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { onResetPassword, loading } = props;
  const intl = useIntl();
  const [endDate, setEndDate] = React.useState<Moment | undefined>(moment());
  const schema = yup.object().shape({
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải có ít nhất 8 ký tự. Trong đó có it nhất 1 chữ hoa, 1 chữ số, 1 ký tự đặc biết"
      ),
    confirmPassword: yup.string()
     .oneOf([yup.ref('password'), null], 'Mật khẩu phải giống mật khẩu đã nhập'),
  });

  const { handleSubmit, getValues, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const { errors } = formState;
  
  return (
    <form
      onSubmit={handleSubmit(onResetPassword)}
      style={{ width: 500 }}
      autoComplete="none"
    >
      <Col style={{ padding: "24px 30px" }}>
        <Typography variant="h6" style={{ fontWeight: "bold",paddingBottom: 20  }}>
          <FormattedMessage id="IDS_TITLE_RESET_PASSWORD" />
        </Typography>
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_NEW_PASSWORD" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_PASSWORD" })}
              inputProps={{ maxLength: 20, autoComplete: "none" }}
              type="password"
              errorMessage={errors.password?.message}
              inputRef={ref}
            />
          )}
          name="password"
          control={control}
        />
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_CONFIRM_PASSWORD" />}
              placeholder={intl.formatMessage({ id: "IDS_CONFIRM_NEW_PASSWORD" })}
              inputProps={{ maxLength: 20, autoComplete: "none" }}
              type="password"
              errorMessage={errors.confirmPassword?.message}
              inputRef={ref}
            />
          )}
          name="confirmPassword"
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
            <FormattedMessage id="IDS_RESET_PASSWORD" />
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

export default ResetPasswordForm;

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
import { IRegisterData } from "../../redux/authThunks";
import moment, { Moment } from "moment";
import { DATE_FORMAT_BACK_END } from "../../../../models/moment";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
export interface Props {
  loading: boolean;
  onRegister(data: IRegisterData): void;
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
const RegisterForm: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const { onRegister, loading } = props;
  const intl = useIntl();
  const [endDate, setEndDate] = React.useState<Moment | undefined>(moment());
  const [gender, setGender] = React.useState("");
  const [valid, setValid] = React.useState<boolean>(false);
  const schema = yup.object().shape({
    account: yup.string().required("Tài khoản không được để trống"),
    password: yup
      .string()
      .required("Mật khẩu không được để trống")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải có ít nhất 8 ký tự. Trong đó có it nhất 1 chữ hoa, 1 chữ số, 1 ký tự đặc biết"
      ),
    email: yup
      .string()
      .required("Email không được để trống")
      .email("Email không hợp lệ"),
    phoneNumber: yup.string().required("Số điện thoại không được để trống"),
    firstName: yup.string().required("Họ không được để trống"),
    lastName: yup.string().required("Tên không được để trống"),
    dateOfBirth: yup.string().required("Ngày sinh không được để trống"),
  });

  const { handleSubmit, getValues, control, reset, formState } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: "",
      account: "",
      password: "",
      email: "",
      phoneNumber: "",
      gender: "",
      profilePhoto: "",
      firstName: "",
      lastName: "",
      name: "",
      dateOfBirth: "",
      followStores: null,
    },
  });
  const { errors } = formState;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGender((event.target as HTMLInputElement).value);
  };
  return (
    <form
      onSubmit={handleSubmit(onRegister)}
      style={{ width: 500 }}
      autoComplete="none"
    >
      <Col style={{ padding: "24px 30px" }}>
        <Typography variant="body1" style={{ fontWeight: "bold" }}>
          <FormattedMessage id="IDS_REGISTER_NEW" />
        </Typography>
        <Controller
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
        />
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_LAST_NAME" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_LAST_NAME" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              errorMessage={errors.firstName?.message}
              inputRef={ref}
            />
          )}
          name="firstName"
          control={control}
        />
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_FIRST_NAME" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_FIRST_NAME" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              errorMessage={errors.lastName?.message}
              inputRef={ref}
            />
          )}
          name="lastName"
          control={control}
        />
        <Controller
          as={
            <>
              <InputLabel>
                {<FormattedMessage id="IDS_RADIO_GROUP_GENGER" />}
              </InputLabel>
              <RadioGroup
                aria-label="gender"
                value={gender}
                onChange={handleChange}
              >
                <Row>
                  <FormControlLabel
                    value="F"
                    control={<Radio size="small" />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    value="M"
                    control={<Radio size="small" />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value="O"
                    control={<Radio size="small" />}
                    label="Khác"
                  />
                </Row>
              </RadioGroup>
              {valid && gender === "" && (
                <Typography
                  style={{ fontSize: 15, color: "#f5584d", fontWeight: 400 }}
                >
                  Giới tính không được để trống
                </Typography>
              )}
            </>
          }
          name="gender"
          control={control}
        />
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              label={<FormattedMessage id="Ngày sinh" />}
              formControlStyle={{ width: "100%", marginRight: 0 }}
              inputProps={{ maxLength: 50, autoComplete: "none" }}
              inputRef={ref}
              type="date"
              errorMessage={errors.dateOfBirth?.message}
            />
          )}
          name="dateOfBirth"
          control={control}
        />
         <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_CHAT_PHONE_NUMBER" />}
              placeholder={intl.formatMessage({
                id: "IDS_CHAT_ENTER_PHONE_NUMBER",
              })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              errorMessage={errors.phoneNumber?.message}
              inputRef={ref}
            />
          )}
          name="phoneNumber"
          control={control}
        />
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_AUTH_ACCOUNT" />}
              placeholder={intl.formatMessage({ id: "IDS_AUTH_ENTER_ACCOUNT" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              errorMessage={errors.account?.message}
              inputRef={ref}
            />
          )}
          name="account"
          control={control}
        />
        <Controller
          render={({ onChange, value, ref }) => (
            <FormControlTextField
              value={value}
              onChange={onChange}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_PASSWORD" />}
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
        <LoadingButton
          style={{ minWidth: 160, backgroundColor: BLUE_NAVY, marginTop: 10, }}
          type="submit"
          variant="contained"
          loading={loading}
          disableElevation
          onClick={() => setValid(true)}
        >
          <Typography
            variant="body2"
            style={{ width: 140, whiteSpace: "nowrap", color: "white" }}
          >
            <FormattedMessage id="IDS_REGISTER" />
          </Typography>
        </LoadingButton>
        <Divider style={{ margin: "16px 0px 12px 0px", width: "280px" }} />
        <Row>
          <Typography variant="body2">
            <FormattedMessage id="IDS_AUTH_ALREADY_HAD_ACCOUNT" />
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

export default RegisterForm;

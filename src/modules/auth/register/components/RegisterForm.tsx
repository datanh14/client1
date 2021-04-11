/* eslint-disable no-unused-vars */
import {
  Divider,
  FormControlLabel,
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
  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
      phonenumber: "",
      firstname: "",
      lastname: "",
      name: "",
      account: "",
      dateofbirth: "",
      gender: "",
    },
  });
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
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_EMAIL" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_EMAIL" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              optional
              inputRef={ref}
            />
          ))}
          name="email"
          control={control}
        />
        <Controller
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_FIRST_NAME" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_FIRST_NAME" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              optional
              inputRef={ref}
            />
          ))}
          name="firstname"
          control={control}
        />
        <Controller
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_LAST_NAME" />}
              placeholder={intl.formatMessage({ id: "IDS_ENTER_LAST_NAME" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              optional
              inputRef={ref}
            />
          ))}
          name="lastname"
          control={control}
        />
        <label>
          <Typography variant="body2">
            {intl.formatMessage({ id: "IDS_RADIO_GROUP_GENGER" })}
          </Typography>
        </label>
        <Controller
          as={
            <RadioGroup aria-label="gender">
              <Row>
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="M" control={<Radio />} label="Male" />
              </Row>
            </RadioGroup>
          }
          name="gender"
          control={control}
        />
        <Controller
          as={
            <TextField
              id="date"
              label="Birthday"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
          }
          name="dateofbirth"
          control={control}
        />
        <Controller
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_AUTH_ACCOUNT" />}
              placeholder={intl.formatMessage({ id: "IDS_AUTH_ENTER_ACCOUNT" })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
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
              formControlStyle={{ width: "100%" }}
              label={<FormattedMessage id="IDS_CHAT_PHONE_NUMBER" />}
              placeholder={intl.formatMessage({
                id: "IDS_CHAT_ENTER_PHONE_NUMBER",
              })}
              inputProps={{ maxLength: 50, autoComplete: "new" }}
              optional
              inputRef={ref}
            />
          ))}
          name="phonenumber"
          control={control}
        />
        <Controller
          as={React.forwardRef((itemProps: any, ref) => (
            <FormControlTextField
              {...itemProps}
              formControlStyle={{ width: "100%" }}
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
        <LoadingButton
          style={{ minWidth: 160, backgroundColor: BLUE_NAVY }}
          type="submit"
          variant="contained"
          loading={loading}
          disableElevation
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

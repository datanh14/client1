import { Paper, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { FormattedMessage, useIntl } from "react-intl";
import { v4 as uuidv4 } from "uuid";
import BgLogin from "../../assets/icons/bg_banner_login.svg";
import { BLUE_400, GREY_400 } from "../../assets/theme/colors";
import { UUID } from "../../constants/constants";
import { isEmpty } from "../../utils/helpers/helpers";
import { Col, PageContainer } from "../common/Elements";
import LoginForm from "./LoginForm";

interface Props {}
const Login: React.FC<Props> = (props) => {
  const intl = useIntl();

  const fetchDeviceId = async () => {
    if (isEmpty(localStorage.getItem(UUID))) {
      localStorage.setItem(UUID, uuidv4());
    }
  };
  useEffect(() => {
    fetchDeviceId(); // eslint-disable-next-line
  }, []);
  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "IDS_LOGIN" })}</title>
      </Helmet>
      <PageContainer>
        <Paper
          elevation={6}
          style={{
            display: "flex",
            borderRadius: "12px",
            flexDirection: "row",
            height: 440,
          }}
        >
          <Col
            style={{
              position: "relative",
              backgroundColor: BLUE_400,
              backgroundImage: `url(${BgLogin})`,
              backgroundSize: "cover",
              borderRadius: "12px 0px 0px 12px",
              width: 270,
              padding: 32,
            }}
          ></Col>
          <LoginForm />
        </Paper>
        <Typography
          variant="body2"
          style={{ marginTop: 32, textAlign: "center", color: GREY_400 }}
        >
          <FormattedMessage
            id="IDS_LICENSE"
            values={{ year: new Date().getFullYear() }}
          />
        </Typography>
      </PageContainer>
    </>
  );
};

export default Login;

import { Paper } from "@material-ui/core";
import * as React from "react";
import { PageContainer } from "../../../common/Elements";
import Banner from "../../common/Banner";
import Footer from "../../common/Footer";
import { IForgotPassword } from "../../redux/authThunks";
import ForgotPasswordForm from "./ForgotPasswordForm";

export interface Props {
  loading: boolean;
  onForgotPassword(data: IForgotPassword): void;
}

const ForgotPasswordDesktop = (props: Props) => {
  const { onForgotPassword } = props;
  const { loading } = props;

  return (
    <PageContainer>
      <Paper
        elevation={6}
        style={{
          display: "flex",
          borderRadius: "12px",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Banner isRegister />
        <ForgotPasswordForm loading={loading} onForgotPassword={onForgotPassword} />
      </Paper>
      <Footer />
    </PageContainer>
  );
};

export default ForgotPasswordDesktop;

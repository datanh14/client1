import { Paper } from "@material-ui/core";
import * as React from "react";
import { PageContainer } from "../../../common/Elements";
import Banner from "../../common/Banner";
import Footer from "../../common/Footer";
import { IResetPassword } from "../../redux/authThunks";
import ResetPasswordForm from "./ResetPasswordForm";

export interface Props {
  loading: boolean;
  onResetPassword(data: IResetPassword): void;
}

const ResetPasswordDesktop = (props: Props) => {
  const { onResetPassword } = props;
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
        <ResetPasswordForm loading={loading} onResetPassword={onResetPassword} />
      </Paper>
      <Footer />
    </PageContainer>
  );
};

export default ResetPasswordDesktop;

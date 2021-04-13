/* eslint-disable no-unused-vars */
import { Typography } from "@material-ui/core";
import * as React from "react";
import { FormattedMessage } from "react-intl";

interface Props {}

const AuthHeader = (props: Props) => {
  return (
    <>
      <Typography
        variant="h4"
        style={{ fontWeight: "normal" }}
        color="textSecondary"
      >
        <FormattedMessage id="webPortal" />
      </Typography>
    </>
  );
};

export default AuthHeader;

/* eslint-disable no-unused-vars */
import { Typography } from "@material-ui/core";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { GREY_400 } from "../../../assets/theme/colors";

interface Props {}

const Footer = (props: Props) => {
  return (
    <Typography
      variant="body2"
      style={{ marginTop: 32, textAlign: "center", color: GREY_400 }}
    >
      <FormattedMessage
        id="IDS_LICENSE"
        values={{ year: new Date().getFullYear() }}
      />
    </Typography>
  );
};

export default Footer;

import { Typography } from "@material-ui/core";
import React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routes } from "../../../constants/routes";
import { Row } from "../../common/Elements";

interface Props {
  // fetchData: () => void;
  // searchData: () => void;
}

const HeaderManagement: React.FC<RouteComponentProps<any> & Props> = (
  props
) => {
  const intl = useIntl();
  const { pathname } = props?.location;
  // const { fetchData, searchData } = props;

  const getTitle = () => {
    if (pathname === routes.ACCOUNT_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_ACCOUNT",
        placeholder: "IDS_CHAT_MANAGEMENT_ACCOUNT_NAME",
        // content: <ActionTagDialog fetchData={fetchData} />,
      };
    if (pathname === routes.TRANSACTION_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_TRANSACTION",
        placeholder: "IDS_CHAT_MANAGEMENT_TRANSACTION_NAME",
        // content: <ActionShortcutDialog fetchData={fetchData} />,
      };
    if (pathname === routes.WARE_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_WAREHOUSE",
        placeholder: "IDS_CHAT_MANAGEMENT_WAREHOUSE_NAME",
        // content: <ActionTeamDialog fetchData={fetchData} />,
      };
    if (pathname === routes.PRODUCT_MANAGEMENT)
      return {
        title: "IDS_CHAT_MANAGEMENT_PRODUCT",
        placeholder: "IDS_CHAT_MANAGEMENT_PRODUCT_NAME",
        // content: <ActionEmployeeDialog fetchData={fetchData} />,
      };
    return {
      title: "IDS_APP_MANAGEMENT",
      content: null,
    };
  };

  return (
    <>
      <Row className="header-management">
        <Typography variant="subtitle1" component="p">
          {intl.formatMessage({ id: getTitle().title })}
        </Typography>
      </Row>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {getTitle().content}
      </Row>
    </>
  );
};

export default withRouter(HeaderManagement);

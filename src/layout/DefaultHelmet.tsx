import React from "react";
import { useIntl } from "react-intl";
import Helmet from "react-helmet";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { routes } from "../../src/constants/routes";

interface Props {}

const DefaultHelmet: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const intl = useIntl();
  const { pathname } = props?.location;

  const getTitle = () => {
    if (pathname === routes.LOGIN) return "IDS_LOGIN";
    if (pathname === routes.HOME) return "IDS_CHAT_HOME";
    return "IDS_CHAT";
  };
  return (
    <Helmet>
      {getTitle() ? (
        <title>{intl.formatMessage({ id: getTitle() })}</title>
      ) : (
        <title>Manager Portal</title>
      )}
    </Helmet>
  );
};

export default withRouter(DefaultHelmet);

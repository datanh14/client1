import React from 'react';
import { Redirect, Route } from 'react-router';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants/constants';
import { routes } from '../../constants/routes';


interface Props {}

const ProtectedRoute: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { ...restProps } = props;
  if (
    localStorage.getItem(ACCESS_TOKEN) &&
    Object.values(routes).includes(props?.location?.pathname)
  ) {
    return <Route {...restProps} />;
  }
  return <Redirect to={{ pathname: routes.LOGIN }} />;
};

export default withRouter(ProtectedRoute);

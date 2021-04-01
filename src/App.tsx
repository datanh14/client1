import React, { useEffect } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect, useDispatch } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import { ACCESS_TOKEN, UUID } from "./constants/constants";
import { routes } from "./constants/routes";
import MainLayout from "./layout/MainLayout";
import LoadingIcon from "./modules/common/LoadingIcon";
import Login from "./modules/login/Login";
import { AppState } from "./modules/rootReducer";
import NotFound from "./modules/system/NotFound";
import { isEmpty } from "./utils/helpers/helpers";

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const App: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  return (
    <>
      <React.Suspense fallback={<LoadingIcon />}>
        <Switch>
          {/* <Route exact path={routes.LOGIN} component={Login} /> */}
          <Route exact path={routes.NOT_FOUND} component={NotFound} />
          {/* <ProtectedRoute path={"*"} component={MainLayout} /> */}
          <Route path={"*"} component={MainLayout} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default connect(mapStateToProps)(withRouter(App));

import { isEmpty } from "lodash";
import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { connect } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./App.scss";
import { ACCESS_TOKEN, UUID } from "./constants/constants";
import { routes } from "./constants/routes";
import MainLayout from "./layout/MainLayout";
import Payment from "./modules/app_manager/components/payment/Payment";
import ForgotPassword from "./modules/auth/ForgotPassword/pages/ForgotPassword";
import Register from "./modules/auth/register/pages/Register";
import ResetPassword from "./modules/auth/ResetPassword/pages/ResetPassword";
import LoadingIcon from "./modules/common/LoadingIcon";
import Login from "./modules/login/Login";
import { AppState } from "./modules/rootReducer";
import NotFound from "./modules/system/NotFound";

function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}
const App: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const fetchDeviceId = async () => {
    if (isEmpty(localStorage.getItem(UUID))) {
      localStorage.setItem(UUID, uuidv4());
    }
    if (localStorage.getItem(ACCESS_TOKEN)) {
      // fetchEmployeesInfo();
    }
    // else {
    //   goToLogin();
    // }
  };
  React.useEffect(() => {
    fetchDeviceId(); //eslint-disable-next-line
  }, []);
  return (
    <>
      <React.Suspense fallback={<LoadingIcon />}>
        <Switch>
          <Route exact path={routes.LOGIN} component={Login} />
          <Route exact path={routes.NOT_FOUND} component={NotFound} />
          {/* <Route
            path={`${routes.DETAIL_CATEGORY}/:id`}
            component={DetailCategory}
          /> */}
          <Route exact path={routes.REGISTER} component={Register} />
          <Route exact path={routes.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route exact path={routes.RESET_PASSWORD} component={ResetPassword} />
          <Route exact path={routes.PAYMENT} component={Payment} />
          <Route path={"*"} component={MainLayout} />
        </Switch>
      </React.Suspense>
    </>
  );
};

export default connect(mapStateToProps)(withRouter(App));

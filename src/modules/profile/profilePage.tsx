import React, { lazy, Suspense } from "react";
import { Skeleton } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { AppState } from "../rootReducer";


const ChangeAdressComponent = lazy(() => import("./ChangeAdressPage"));
const CouponComponent = lazy(() => import("./CouponPage"));
const NotificationComponent = lazy(() => import("./NotificationPage"));
const OrderManagementComponent = lazy(() => import("./OrderManagementPage"));
const ProfileComponent = lazy(() => import("./ProfilePage_1"));
const AdressComponent = lazy(() => import("./AdressPage"));
const AddAdressComponent = lazy(() => import("./AddArdessPage"));
const  PaymentCardPageComponent = lazy(() => import("./PaymentCardPage"));
const  ChatbotPageComponent = lazy(() => import("./ChatbotPage"));
function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}
const ProfilePage: React.FC<RouteComponentProps<any> & Props> = (props) => {
  return (
    <Router>
      <Suspense fallback={<Skeleton active />}>
        <Switch>
          <Route path="/customer/account/edit">
            <ProfileComponent />
          </Route>
          <Route path="/customer/address">
            <AdressComponent />
          </Route>
          <Route path="/customer/paymentcard">
            <PaymentCardPageComponent />
          </Route>
          <Route path="/customer/create">
            <ChangeAdressComponent />
          </Route>
          <Route path="/customer/coupons">
            <CouponComponent />
          </Route>
          <Route path="/customer/add">
            <AddAdressComponent />
          </Route>
          <Route path="/customer/notification">
            <NotificationComponent />
          </Route>
          <Route path="/sales/order/history">
            <OrderManagementComponent />
          </Route>
          <Route path="/customer">
            <ProfileComponent />
          </Route>
          <Route path="/chatbot">
            <ChatbotPageComponent />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
};
export default connect(
  (state: any) => ({ profile: state.system.profile }),
  {}
)(withRouter(ProfilePage));

import { CssBaseline } from "@material-ui/core";
import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import { connect } from "react-redux";
import {
  Route,
  RouteComponentProps,
  Switch,
  withRouter,
} from "react-router-dom";
import { GREY_100 } from "../assets/theme/colors";
import { some, WIDTH_PRODUCT } from "../constants/constants";
import { routes } from "../constants/routes";
import Cart from "../modules/app_manager/components/cart/Cart";
import Footer from "../modules/app_manager/components/footer/Footer";
import ProductDetail from "../modules/app_manager/components/product/ProductDetail";
import StoreDetail from "../modules/app_manager/components/store/StoreDetail";
import DetailCategory from "../modules/app_manager/detailCategory/DetailCategory";
import { PageWrapper } from "../modules/common/Elements";
import LoadingIcon from "../modules/common/LoadingIcon";
import Home from "../modules/home/Home";
import profilePage from "../modules/profile/profilePage";
import { AppState } from "../modules/rootReducer";
import DefaultHelmet from "./DefaultHelmet";
import { mainStyles } from "./styles";

const SIDE_BAR_MENU: some[] = [
  {
    icon: <DashboardIcon />,
    name: "Dashboard",
    route: routes.HOME,
    component: Home,
  },
  {
    icon: <DashboardIcon />,
    name: "ProductDetail",
    route: routes.PRODUCT_DETAIL,
    component: ProductDetail,
  },
  {
    icon: <DashboardIcon />,
    name: "Cart",
    route: routes.PRODUCT_CART,
    component: Cart,
  },
  {
    icon: <DashboardIcon />,
    name: "StoreDetail",
    route: routes.STORE,
    component: StoreDetail,
  },
  {
    icon: <DashboardIcon />,
    name: "DetailCategory",
    route: routes.DETAIL_CATEGORY,
    component: DetailCategory,
  },
  {
    icon: <DashboardIcon />,
    name: "Customer",
    route: routes.CUSTOMER,
    component: profilePage,
  },
];
function mapStateToProps(state: AppState) {
  return {
    profile: state.system.profile,
  };
}
interface Props extends ReturnType<typeof mapStateToProps> {}

const MainLayout: React.FC<RouteComponentProps<any> & Props> = (props) => {
  const { profile } = props;
  const homeRef = React.useRef<HTMLDivElement>(null);
  const classes = mainStyles();
  const size = useWindowSize();

  React.useEffect(() => {
    homeRef.current &&
      localStorage.setItem(
        WIDTH_PRODUCT,
        (homeRef?.current.offsetWidth / 5 - 1).toString()
      );
  }, [homeRef.current]);

  function useWindowSize() {
    const [windowSize, setWindowSize] = React.useState<any>({
      width: undefined,
      height: undefined,
    });
    React.useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
  }

  return (
    <PageWrapper style={{ background: GREY_100 }}>
      <DefaultHelmet profile={profile} />
      <CssBaseline />
      <main
        className={classes.content}
        style={{
          transition: "linear 225ms",
          paddingLeft:
            (size.width - 1178) / 2 - 25 > 0 ? (size.width - 1178) / 2 - 25 : 0,
          paddingRight:
            (size.width - 1178) / 2 - 25 > 0 ? (size.width - 1178) / 2 - 25 : 0,
        }}
      >
        <React.Suspense fallback={<LoadingIcon />}>
          <Switch>
            {[...SIDE_BAR_MENU].map((item: some, index: number) => (
              <div key={index}>
                <Route
                  exact
                  path={item.route}
                  component={item.component}
                  key={item.route}
                />
              </div>
            ))}
          </Switch>
        </React.Suspense>
      </main>
      <Footer />
    </PageWrapper>
  );
};

export default connect(mapStateToProps)(withRouter(MainLayout));

import { Container, CssBaseline } from "@material-ui/core";
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
import {
  CART_LOCAL_STORAGE,
  some,
  WIDTH_PRODUCT,
} from "../constants/constants";
import { routes } from "../constants/routes";
import { PageWrapper } from "../modules/common/Elements";
import LoadingIcon from "../modules/common/LoadingIcon";
import Home from "../modules/home/Home";
import { AppState } from "../modules/rootReducer";
import DefaultHelmet from "./DefaultHelmet";
import { mainStyles } from "./styles";
import ProductDetail from "../modules/app_manager/components/product/ProductDetail";
import Cart from "../modules/app_manager/components/cart/Cart";
import Footer from "../modules/app_manager/components/footer/Footer";
import DetailCategory from "../modules/app_manager/detailCategory/DetailCategory";
import profilePage from "../modules/profile/profilePage";
import StoreDetail from "../modules/app_manager/components/store/StoreDetail";
import { ProductCount } from "../models/object";
import JSONbig from "json-bigint";

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
  const [countProduct, setCountProduct] = React.useState(
    JSONbig.parse(localStorage.getItem(CART_LOCAL_STORAGE) || "[]").length
  );

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
    <ProductCount.Provider value={{ countProduct, setCountProduct }}>
      <PageWrapper style={{ background: GREY_100 }}>
        <DefaultHelmet profile={profile} />
        <CssBaseline />
        <main
          className={classes.content}
          style={{
            transition: "linear 225ms",
            paddingLeft: (size.width - 1178) / 2 - 25,
            paddingRight: (size.width - 1178) / 2 - 25,
          }}
        >
          <React.Suspense fallback={<LoadingIcon />}>
            <Switch>
              {[...SIDE_BAR_MENU].map((item: some) => (
                <Route
                  exact
                  path={item.route}
                  component={item.component}
                  key={item.route}
                />
              ))}
            </Switch>
          </React.Suspense>
        </main>
        <Footer />
      </PageWrapper>
    </ProductCount.Provider>
  );
};

export default connect(mapStateToProps)(withRouter(MainLayout));

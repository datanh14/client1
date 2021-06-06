import { some } from "./constants";
export const routes: some = {
  LOGIN: "/login",
  NOT_FOUND: "/not-found",
  HOME: "/",
  REGISTER: "/register",
  TRAFFIC: "/traffic",
  DETAIL_CATEGORY: "/detail-category/:id",
  ACCOUNT_MANAGEMENT: "/management/account",
  TRANSACTION_MANAGEMENT: "/management/transaction",
  WARE_MANAGEMENT: "/management/warehouse",
  PRODUCT_MANAGEMENT: "/management/product",
  PRODUCT_DETAIL: "/product-detail/:id",
  PRODUCT_CART: "/cart",
  PROFILEPAGE: "/profile-page",
  STORE: "/store/:id",
  RESET_PASSWORD: "/resest-password", // Cần sửa lại
  FORGOT_PASSWORD: "/forgot-password", 
  PAYMENT: "/payment",
};

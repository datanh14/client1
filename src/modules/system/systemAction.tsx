import * as actions from "../../constants/actions";
import { some } from "../../constants/constants";
import api from "../../utils/helpers/api";

export const actionChangeLanguage = (lang: string) => {
  return {
    type: actions.CHANGE_LANGUAGE,
    payload: lang,
  };
};
export const actionShowLoading = () => ({ type: actions.SHOW_LOADING });
export const actionHideLoading = () => ({ type: actions.HIDE_LOADING });
export const actionUpdateProfile = (data: some) => ({
  type: actions.UPDATE_PROFILE,
  payload: data,
});
export const actionLogin = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/login", data });
};
export const actionValidateToken = () => {
  return api({ method: "get", url: "/account/validateAccessToken" });
};
export const actionGetAllProduct = (params?: some) => {
  return api({
    method: "get",
    url: "/Category/CategoryChildList",
    params,
  });
};
export const actionProductInChild = (params?: some) => {
  return api({
    method: "get",
    url: "/Product/GetProductByCategoryIDbyRange",
    params,
  });
};

export const actionProductById = (params?: some) => {
  return api({
    method: "get",
    url: "/Product/GetProductByID",
    params,
  });
};

export const actionGetAllProductInCart = (params?: some) => {
  return api({
    method: "get",
    url: "/Cart/CartList/",
    params,
  });
};

export const actionGetAddressByUser = (params?: some) => {
  return api({
    method: "get",
    url: "/Address/GetAddressByUser",
    params,
  });
};

export const actionAddProductToCart = (data: some) => {
  return api({
    method: "post",
    url: "/Cart/AddProductToCart",
    data
  });
};

export const actionDeleteProductFromCart = (params?: some) => {
  return api({
    method: "delete",
    url: "/Cart/DeleteFromCart",
    params,
  });
};

export const actionChangeDefaultAddress = (data: string) => {
  return api({
    method: "post",
    url: "/Address/ChangeDefaultAddress",
    data
  });
};

export const actionConfirmPayment = (params?: some) => {
  return api({
    method: "get",
    url: "/Cart/ConfirmPayment",
    params,
  });
};

export const actionRegister = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/register", data });
};
export const actionChangeLocation = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/ChangeInfo", data });
};

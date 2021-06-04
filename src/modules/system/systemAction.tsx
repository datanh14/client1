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

export const actionAddFollow = (params?: some) => {
  return api({
    method: "post",
    url: "/Follow/AddFollow",
    params,
  });
};

export const actionUnFollow = (params?: some) => {
  return api({
    method: "delete",
    url: "/Follow/Unfollow",
    params,
  });
};

export const actionAddStoreByUser = (data: any) => {
  return api({
    method: "post",
    url: "/Store/AddStoreByUser",
    data
  });
};

export const actionDeleteAllCart = (data: any) => {
  return api({
    method: "delete",
    url: "/Cart/DeleteAllCart",
    data
  });
};

export const actionGetStoreFollowing = (params?: some) => {
  return api({
    method: "get",
    url: "/Follow/GetStoreFollowing",
    params,
  });
};

export const actionGetStoreByID = (params?: some) => {
  return api({
    method: "get",
    url: "/Store/GetStoreByID",
    params,
  });
};

export const actionGetProductByStoreIDbyRange = (params?: some) => {
  return api({
    method: "get",
    url: "Product/GetProductByStoreIDbyRange",
    params,
  });
};

export const actionGetProductByCategoryIDbyRange = (params?: some) => {
  return api({
    method: "get",
    url: "/Product/GetProductByCategoryIDbyRange",
    params,
  });
};

export const actionGetCategoryAllChildList = (params?: some) => {
  return api({
    method: "get",
    url: "/Category/CategoryAllChildList",
    params,
  });
};

export const actionGetRatingForProduct = (params?: some) => {
  return api({
    method: "get",
    url: "/Rating/GetRatingForProduct",
    params,
  });
};

export const actionRegister = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/register", data });
};
export const actionChangeLocation = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/ChangeInfo", data });
};

export const actionChangePasswordByToken = (data: some) => {
  return api({ method: "post", url: "/api/authenticate/ChangePasswordByToken", data });
};

export const actionResetPasswordMail = (params?: some) => {
  return api({
    method: "get",
    url: "/Mail/ResetPasswordMail",
    params,
  });
};

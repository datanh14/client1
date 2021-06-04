import "firebase/app";
import "firebase/messaging";
import moment from "moment";
import { DATE_FORMAT_BACK_END } from "../../../models/moment";

export interface ILoginData {
  email: string;
  password: string;
  isChecked?: boolean;
}

export interface IChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const defaultChangePass: IChangePasswordForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const defaultLoginData: ILoginData = {
  email: "",
  password: "",
  isChecked: true,
};
export interface IFirstLoginData {
  username: string;
  password: string;
  confirmPassword: string;
}

export const defaultFirstLoginData: IFirstLoginData = {
  username: "",
  password: "",
  confirmPassword: "",
};
export interface IChangePasswordData {
  password: string;
  confirmPassword: string;
}

export const defaultChangePasswordData: IChangePasswordData = {
  password: "",
  confirmPassword: "",
};
export interface IRegisterData {
  email: string;
  firstname: string;
  lastname: string;
  phonenumber: string;
  gender: string;
  account: string;
  password: string;
  dateofbirth: string;
}
const endDate = moment();

export const defaultRegisterData: IRegisterData = {
  account: "",
  email: "",
  firstname: "",
  lastname: "",
  gender: "",
  phonenumber: "",
  password: "",
  dateofbirth: endDate?.format(DATE_FORMAT_BACK_END),
};

export interface IForgotPassword {
  userName: string;
}

export interface IResetPassword {
  Account: string;
  Token: string;
  NewPassword: string;
}
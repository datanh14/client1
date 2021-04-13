import { some } from "../../../constants/constants";

export enum AuthDialog {
  login,
  loginAfterResetPass,
  forgotPassword,
  forgotPasswordOTP,
  forgotPasswordEMAIL,
  forgotPasswordREPASS,
  signUp,
  verifyAgency,
}
export interface AuthState {
  readonly auth: boolean;
  readonly authenticating: boolean;
  readonly validatingToken: boolean;
  readonly authDialog?: AuthDialog;
  readonly userData?: Readonly<some>;
  readonly roleUser?: Readonly<some[]>;
}

export const defaultSignUpState = {
  email: '',
  password: '',
  rePassword: '',
  telephone: '',
  username: '',
};

import { Action, Location, LocationState } from "history";
import { combineReducers } from "redux";
import { some } from "../constants/constants";
import system, { systemState } from "./system/systemReducer";
export interface AccountState {
  readonly userData?: some;
}
export interface AuthState {
  readonly auth: boolean;
  readonly authenticating: boolean;
  readonly validatingToken: boolean;
  readonly userData?: Readonly<some>;
  readonly roleUser?: Readonly<some[]>;
}
export type RouterActionType = Action;

export interface RouterState<S = LocationState> {
  location: Location<S>;
  action: RouterActionType;
}
export interface AppState {
  router: RouterState;
  system: systemState;
  account: AccountState;
}

const rootReducer = combineReducers({
  system,
});

export default rootReducer;

export type some = { [key: string]: any };
export const ACCESS_TOKEN = "ACCESS_TOKEN";
export const ACCOUNTS = "ACCOUNTS";
export const ACCOUNTS_ID = "ACCOUNTS_ID";
export const ANONYMOUS: string = "ANONYMOUS";
export const SHORTCUTS: string = "SHORTCUTS";
export const NORMAL_ACCOUNT: string = "NORMAL_ACCOUNT";
export const DEVICE_ID: string = "DEVICE_ID";
export const UUID: string = "UUID";
export const CART_LOCAL_STORAGE: string = "CART_LOCAL_STORAGE";
export const GET_CART_LOCAL_STORAGE: string = "GET_CART_LOCAL_STORAGE";
export const WIDTH_PRODUCT: string = "WIDTH_PRODUCT";

export const SUCCESS_CODE = 200;
export const STATUS_MESSAGE: some = {
  SENT: "SENT",
  DELIVERED: "DELIVERED",
  SEEN: "SEEN",
  TYPING: "TYPING",
  STOPPED_TYPING: "STOPPED_TYPING",
};
export const TYPE_MESSAGE: some = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  FILE: "FILE",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
  GIF: "GIF",
  STICKER: "STICKER",
  EVENT: "EVENT",
};
export const TYPE_EVENT: some = {
  REQUEST_VOTE: "REQUEST_VOTE",
  VOTED: "VOTED",
  ADD_MEMBER: "ADD_MEMBER",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  NEW_TICKET: "NEW_TICKET",
  UPDATE_LIST_TICKET: "UPDATE_LIST_TICKET",
};
export const SIDE_BAR_WIDTH: number = 240;
export const HOUR_MINUTE = "HH:mm";
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATE_FORMAT_ALL = `${DATE_FORMAT} ${HOUR_MINUTE}`;
export const STATUS_TICKET: some = {
  0: "CREATED",
  1: "RESOLVING",
  2: "FIRST_MESSAGE",
  3: "REOPEN",
  4: "COMPLETED",
  5: "FAILED",
};

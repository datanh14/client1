import axios from "axios";
import { sha256 } from "js-sha256";
import JSONbig from "json-bigint";
import { ACCESS_TOKEN, some, UUID } from "../../constants/constants";
import { configs } from "./config";
import { isEmpty } from "./helpers";

const currentTime = new Date().getTime();

// const AppHash = Buffer.from(
//   sha256(
//     `${currentTime / 1000 - ((currentTime / 1000) % 300)}:${configs().APP_KEY}`
//   ),
//   "hex"
// ).toString("base64");
const request = axios.create({
  baseURL: configs().BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "login-token": `${localStorage.getItem(ACCESS_TOKEN)}`,
    "device-id": `${localStorage.getItem(UUID)}`,
    version: configs().VERSION,
  },
});
request.interceptors.request.use(
  (config: some) => {
    const currentTime = new Date().getTime();
    const AppHash = Buffer.from(
      sha256(
        `${currentTime / 1000 - ((currentTime / 1000) % 300)}:${
          configs().APP_KEY
        }`
      ),
      "hex"
    ).toString("base64");
    let temp = {
      ...config,
      headers: {
        ...config?.headers,
        appHash: AppHash,
        "device-id": `${localStorage.getItem(UUID)}`,
        "login-token": `${localStorage.getItem(ACCESS_TOKEN)}`,
      },
    };
    if (
      isEmpty(localStorage.getItem(ACCESS_TOKEN)) ||
      config.url.includes("/login")
    ) {
      delete temp.headers[`login-token`];
    }
    return temp;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    const res = JSONbig.parse(response?.request?.response);
    if (res.code === 3003) {
      window.alert(
        "Hệ thống yêu cầu cài đặt thời gian chính xác để thực hiện tính năng chat hỗ trợ. Quý khách vui lòng mở phần Cài đặt của thiết bị này và chuyển Ngày Giờ sang chế độ Tự động"
      );
    }
    return res;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const api = (options: some) => {
  console.log(configs().BASE_URL);
  return request({
    baseURL: configs().BASE_URL,
    ...options,
  });
};

export default api;

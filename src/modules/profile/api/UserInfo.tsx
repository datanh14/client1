import axios from "axios";

export const getDataUser = async (id: string) => {
  const url = `http://vuanhlk14-001-site1.itempurl.com/user/GetUserByUserID?userid=${id}`;
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? response.data : [];
  return result;
};

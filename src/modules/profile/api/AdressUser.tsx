import axios from "axios";
import { ACCESS_TOKEN } from "../../../constants/constants";



export const getDataAdressUser = async (id :string ) => {
  const url = `https://tiki-test-1.herokuapp.com/Address/GetAddressByUser?UserID=${id}`;
  const response = await axios.get(url, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
    }
  }
);
  const result = (await response.status) === 200 ? response.data : [];
  return result;
};

export const getCity = async (id = 0) => {
  const url = 'https://tiki-test-1.herokuapp.com/Address/GetCity'
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? response.data : [];
  return result;
}

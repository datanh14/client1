import axios from "axios";



export const getDataAdressUser = async (id :string ) => {
  const url = `http://vuanhlk14-001-site1.itempurl.com/Address/GetAddressByUser?UserID=${id}`;
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? response.data : [];
  return result;
};

export const getCity = async (id = 0) => {
  const url = 'http://vuanhlk14-001-site1.itempurl.com/Address/GetCity'
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? response.data : [];
  return result;
}

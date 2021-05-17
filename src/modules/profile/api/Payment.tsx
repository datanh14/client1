import axios from "axios";

export const getDataPayment = async (id: string) => {
  const url = `https://tiki-test-1.herokuapp.com/Payment/GetMethods?userid=${id}`;
  const response = await axios.get(url);
  const result = (await response.status) === 200 ? response.data : [];
  return result;
};

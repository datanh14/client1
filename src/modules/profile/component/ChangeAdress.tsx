import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select, Modal } from "antd";
import JSONbig from "json-bigint";
import { ACCOUNTS, some, SUCCESS_CODE } from "../../../constants/constants";
import { actionGetCityList } from "../../system/systemAction";
// import Axios from "axios";
// import { actionChangeLocation } from "../../system/systemAction";
// import { useSnackbar } from "notistack";
// import { snackbarSetting } from "../../common/Elements";
// import { getCity } from "../api/AdressUser";
const ChangeAdress = () => {
  const [city, setCity] = React.useState<any>();
  const [district, setDistrict] = React.useState<any>();
  const fetchUserId = async () => {
    try {
      const res: some = await actionGetCityList();
      if (res?.code === SUCCESS_CODE) {
        setCity(res);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchUserId();
  }, []);

  const cityName = {
    value: "",
    label: "",
  };

  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [data, setData] = useState({
    UserID: "",
    Phone: "",
    Address: "",
  });

  function onSearch(val: any) {}
  function onChange(value: any) {
    // setDistrict(city[value])
  }
  const onChangeAdress = (e: any) => {
    const newdata = { ...data };
    newdata.Address = e.target.value;
    setData(newdata);
  };
  const onChangePhone = (e: any) => {
    const newdata = { ...data };
    newdata.Phone = e.target.value;
    setData(newdata);
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="horizontal"
      initialValues={{ size: "default" }}
      size="large"
    >
      <Form.Item label="Họ và tên">
        <Input
          placeholder="Nhập Họ và tên"
          type="text"
          defaultValue={dataUser?.firstName + " " + dataUser.lastName}
          allowClear
        />
      </Form.Item>
      <Form.Item label="Số điện thoại">
        <Input
          placeholder="Nhập Số điện thoại"
          allowClear
          onChange={onChangePhone}
        />
      </Form.Item>
      <Form.Item label="Tỉnh/Thành Phố">
        <Select
          placeholder="Chọn Tỉnh/Thành Phố"
          onSearch={onSearch}
          showSearch
          onChange={onChange}
          allowClear
        >
          {city &&
            city.map((item: any, idx: number) => {
              return (
                <Select.Option value={idx}>
                  {city?.city?.cityName}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item label="Quận">
        <Select
          placeholder="Chọn Quận/Huyện"
          onSearch={onSearch}
          showSearch
          onChange={onChange}
          allowClear
        >
          {district &&
            district.map((item: any, idx: number) => {
              return (
                <Select.Option value={idx}>
                  {district?.districtName}
                </Select.Option>
              );
            })}
        </Select>
      </Form.Item>
      <Form.Item label="Địa chỉ">
        <Input
          placeholder="Nhập Địa chỉ"
          allowClear
          onChange={onChangeAdress}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: 16, offset: 8 },
        }}
      >
        <Button type="primary" shape="round" size="large" htmlType="submit">
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ChangeAdress;

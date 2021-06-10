import React, { useState } from "react";
import "antd/dist/antd.css";
import JSONbig from "json-bigint";
import { Form, Input, Button, Select, Layout } from "antd";
import { ACCOUNTS, some, SUCCESS_CODE } from "../../../constants/constants";
import Axios from "axios";
import { NavLink } from "react-router-dom";
import { ACCESS_TOKEN } from "../../../constants/constants";
import { actionGetCityList } from "../../system/systemAction";
const { Content } = Layout;
// const options = [
//   {
//     value: "Hà Nội",
//     label: "Hà Nội",
//   },
//   {
//     value: "Quận 1",
//     label: "Quận 1",
//   },
// ];
const AddAdress = () => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );

  const [city, setCity] = React.useState<any[]>();
  const [cityID, setCityID] = React.useState<string>();
  const [district, setDistrict] = React.useState<any[]>();
  const fetchUserId = async () => {
    try {
      const res: some = await actionGetCityList();
      if (res?.code === SUCCESS_CODE) {
        res && setCity(res.message);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchUserId();
  }, []);

  const [data, setData] = useState({
    UserID: dataUser.id,
    Phone: "",
    Address: "",
    DistrictID: "",
  });
  function onSearch(val: any) {}
  function onChange(value: number) {
    if (value) {
      let temp = city ? city[value] : {};
      setDistrict(temp?.districts);
    }
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
  const onChangeDistrict = (value: any) => {
    const newdata = { ...data };
    newdata.DistrictID = value;
    setData(newdata);
  };
  const headers = {
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
  };
  const url = "https://tiki-test-1.herokuapp.com/Address/AddAddressForUser";
  const submit = (e: any) => {
    e.preventDefault();
    Axios.post(
      url,
      {
        UserID: data.UserID,
        Phone: data.Phone,
        Address: data.Address,
        DistrictID: data.DistrictID,
      },
      { headers }
    ).then((res) => {
      window.location.reload();
    });
  };

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "25px 25px",
        padding: "50px 50px",
        backgroundColor: "white",
      }}
    >
      <div style={{ margin: "25px 25px" }}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: "default" }}
          size="large"
        >
          <Form.Item label="Họ và tên">
            <Input
              placeholder="Nhập Họ và tên"
              defaultValue={dataUser?.firstName + " " + dataUser.lastName}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input placeholder="Nhập Số điện thoại" onChange={onChangePhone} />
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
                      {item?.city?.cityName}
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
              onChange={onChangeDistrict}
              allowClear
            >
              {district &&
                district.map((item: any, idx: number) => {
                  return (
                    <Select.Option value={item?.id}>
                      {item?.districtName}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input placeholder="Nhập Địa chỉ" onChange={onChangeAdress} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" shape="round" size="large" onClick={submit}>
              <NavLink to="/customer/address">Thêm</NavLink>
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Content>
  );
};
export default AddAdress;

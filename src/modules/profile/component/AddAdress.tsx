import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Cascader, Button, Select } from "antd";
import { Content } from "antd/lib/layout/layout";
import Axios from "axios";
import { ACCOUNTS, some } from "../../../constants/constants";
import JSONbig from "json-bigint";


const AddAdress = () => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const url = "https://tiki-test-1.herokuapp.com/Address/AddAddressForUser";
  const [data, setData] = useState({
    Address: "",
    Phone: "",
    UserID: dataUser.id,
    DistrictID: "",
  });
  
  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    Axios.post(url, {
      Address: data.Address,
      Phone: data.Phone,
      UserID: data.UserID,
      DistrictID: data.DistrictID,
    }).then((res) => {
      console.log(res.data);
    });
  };
  const onChangeAdress = (e: any) => {
    const newdata = { ...data };
    newdata.Address = e.target.value;
    setData(newdata);
  };
  const onChangeDistrict = (value: any) => {
    const newdata = { ...data };
    newdata.DistrictID = value;
    setData(newdata);
  }
  const onChangePhone = (e: any) => {
    const newdata = { ...data };
    newdata.Phone = e.target.value;
    setData(newdata);
  };
  console.log(data)

  return (
    <Content
      style={{
        margin: "25px 25px",
        padding: "50px 50px",
        backgroundColor: "white",
        height: "500px",
      }}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={{ size: "default" }}
        size="large"
      >
        <Form.Item label="Họ và tên">
          <Input placeholder="Nhập Họ và tên" defaultValue={dataUser?.firstName + " " + dataUser.lastName} />
        </Form.Item>
        <Form.Item label="Số điện thoại" >
          <Input placeholder="Nhập Số điện thoại"onChange={onChangePhone} />
        </Form.Item>
        <Form.Item label="Tỉnh/Thành Phố">
          <Select placeholder="Chọn Tỉnh/Thành Phố" showSearch allowClear>
            <Select.Option value="06cabf66-0a17-4309-8f48-9671aadb5d9c">
              Tỉnh Điện Biên
            </Select.Option>
            <Select.Option value="1aa38467-d970-403b-b084-3cabb273f166">
              Tỉnh Lai Châu
            </Select.Option>
            <Select.Option value="1c584863-69c3-440b-be15-be87dd08ccbc">
              Tỉnh Hà Giang
            </Select.Option>
            <Select.Option value="250b932c-4b12-41ce-bf8f-1f30c74359ee">
              Tỉnh Bắc Kạn
            </Select.Option>
            <Select.Option value="2c115596-d147-421f-ae7c-528aceb94375">
              Tỉnh Thái Nguyên
            </Select.Option>
            <Select.Option value="2ce9ef0f-6718-4922-bf2e-b025b6b9b4fc">
              Tỉnh Tuyên Quang
            </Select.Option>
            <Select.Option value="4c2a97de-2cf4-4b7d-b22a-e63b1894f73c">
              Tỉnh Hoà Bình
            </Select.Option>
            <Select.Option value="6d4fa66a-0218-479c-b7d8-b3c4970b21e1">
              Tỉnh Lào Cai
            </Select.Option>
            <Select.Option value="8c39dfdf-e8a4-4132-bb55-1aadaf8e531b">
              Tỉnh Yên Bái
            </Select.Option>
            <Select.Option value="930b3538-3e14-4690-8522-19080a57ebae">
              Thành phố Hà Nội
            </Select.Option>
            <Select.Option value="94ac63f5-e233-4357-953b-dd38180d5580">
              Tỉnh Sơn La
            </Select.Option>
            <Select.Option value="9ba47634-23a9-46c6-8172-d11e2727fea6">
              Tỉnh Cao Bằng
            </Select.Option>
            <Select.Option value="d7ab7895-6e56-4599-9ac2-16f59867f350">
              Tỉnh Lạng Sơn
            </Select.Option>
            {/* {city?.map((val: some, index: number) => (
            <Select.Option
              key={index}
              value={val.id}
              label={val.cityName}
            ></Select.Option>
          ))} */}
          </Select>
        </Form.Item>
        <Form.Item label="Quận">
          <Select
            placeholder="Chọn Quận/Huyện"
            showSearch
            allowClear
            onChange={onChangeDistrict}
          >
            <Select.Option value="f2953df8-4df7-467f-ae17-ec2a60c51ae0">
              Quận Cầu Giấy
            </Select.Option>
            <Select.Option value="28b6dbf2-f3a2-4e6c-8886-450701f092ba">
              Quận Hoàn Kiếm
            </Select.Option>
            <Select.Option value="35a2a016-4f2e-4e0e-bb47-d546b9504b59">
              Huyện Chương Mỹ
            </Select.Option>
            <Select.Option value="3abfc601-65b9-4302-844f-857491f5b6aa">
              Huyện Sóc Sơn
            </Select.Option>
            <Select.Option value="44d62dda-a0c2-437d-ad16-98087e0d5dd1">
              Huyện Đông Anh
            </Select.Option>
            <Select.Option value="5621bd4e-077a-44a1-a541-920e1228bb25">
              Huyện Phúc Thọ
            </Select.Option>
            <Select.Option value="5a448513-9ca4-4696-ab9a-9e729d15c4b5">
              Thị xã Sơn Tây
            </Select.Option>
            <Select.Option value="5f256ed9-ed3e-4428-8d1e-0d1a3a6dd3ee">
              Quận Hà Đông
            </Select.Option>
            <Select.Option value="619d6fa9-931b-4026-a6ab-a3c361c86066">
              Quận Hai Bà Trưng
            </Select.Option>
            <Select.Option value="6943fbe4-59bd-4365-9216-aacfc9e35f2e">
              Quận Hoàng Mai
            </Select.Option>
            <Select.Option value="6ba89604-0129-4e5a-b679-d1cf36e2974e">
              Quận Ba Đình
            </Select.Option>
            <Select.Option value="7e94666e-0154-4d98-8191-dc86476649f8">
              Huyện Quốc Oai
            </Select.Option>
            <Select.Option value="86af3cbc-a343-4de6-acb1-4a708c138f4b">
              Huyện Mê Linh
            </Select.Option>
            <Select.Option value="8a7127d1-4825-4e2b-b29f-69433e3a55dd">
              Quận Bắc Từ Liêm
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Địa chỉ">
          <Input placeholder="Nhập Địa chỉ" onChange={onChangeAdress}/>
        </Form.Item>
        {/* <Form.Item label="Email">
          <Input placeholder="Nhập Email" />
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}
        >
          <Button
            type="primary"
            shape="round"
            size="large"
            onClick={(e) => submit(e)}
          >
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};
export default AddAdress;

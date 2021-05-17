import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";
import JSONbig from "json-bigint";
import { ACCOUNTS, some } from "../../../constants/constants";
import Axios from "axios";
// import { getCity } from "../api/AdressUser";
// import { Key } from "rc-select/lib/interface/generator";
// import {StoreContext} from "./Adress"
// const { Option } = Select;

const ChangeAdress = () => {
  // const [city, setCity] = React.useState<any>();
  // React.useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const res: some = await getCity();
  //       if (res?.code === SUCCESS_CODE) {
  //         setCity(res);
  //       } else {
  //       }
  //     } catch (error) {}
  //   };
  //   fetchUserId();
  // }, []);
  // console.log("city", city?.message);

  //   const loadOptions = async (inputText:any, callback:any)=>{
  //   const response = await fetch(`https://tiki-test-1.herokuapp.com/Address/GetCity`)
  //   const json = await response.json();
  //   callback(json.map((i: { cityName: any; id: any; })=>({label: i.cityName, value: i.id})))
  // }
  // console.log(loadOptions);



  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  console.log(dataUser)
  const url = "https://tiki-test-1.herokuapp.com/Address/ChangeAddress";


  const [data, setData] = useState({
    ID: "3ac62180-79b1-41b4-a4b8-0cba6364e57e",
    Address: "",
    Phone: "",
    DistrictID: "",
  });

  
  const submit = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    Axios.post(url, {
      ID: data.ID,
      Phone: data.Phone,
      Address: data.Address,
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
  // function onChange(value: any) {
  //   console.log(`selected ${value}`);
  // }
  const onChangePhone = (e: any) => {
    const newdata = { ...data };
    newdata.Phone = e.target.value;
    setData(newdata);
  };
  console.log(data);

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
          onChange = {onChangePhone}
        />
      </Form.Item>
      <Form.Item label="Tỉnh/Thành Phố">
        <Select placeholder="Chọn Tỉnh/Thành Phố" showSearch allowClear>
          <Select.Option value="06cabf66-0a17-4309-8f48-9671aadb5d9c">Tỉnh Điện Biên</Select.Option>
          <Select.Option value="1aa38467-d970-403b-b084-3cabb273f166">Tỉnh Lai Châu</Select.Option>
          <Select.Option value="1c584863-69c3-440b-be15-be87dd08ccbc">Tỉnh Hà Giang</Select.Option>
          <Select.Option value="250b932c-4b12-41ce-bf8f-1f30c74359ee">Tỉnh Bắc Kạn</Select.Option>
          <Select.Option value="2c115596-d147-421f-ae7c-528aceb94375">Tỉnh Thái Nguyên</Select.Option>
          <Select.Option value="2ce9ef0f-6718-4922-bf2e-b025b6b9b4fc">Tỉnh Tuyên Quang</Select.Option>
          <Select.Option value="4c2a97de-2cf4-4b7d-b22a-e63b1894f73c">Tỉnh Hoà Bình</Select.Option>
          <Select.Option value="6d4fa66a-0218-479c-b7d8-b3c4970b21e1">Tỉnh Lào Cai</Select.Option>
          <Select.Option value="8c39dfdf-e8a4-4132-bb55-1aadaf8e531b">Tỉnh Yên Bái</Select.Option>
          <Select.Option value="930b3538-3e14-4690-8522-19080a57ebae">Thành phố Hà Nội</Select.Option>
          <Select.Option value="94ac63f5-e233-4357-953b-dd38180d5580">Tỉnh Sơn La</Select.Option>
          <Select.Option value="9ba47634-23a9-46c6-8172-d11e2727fea6">Tỉnh Cao Bằng</Select.Option>
          <Select.Option value="d7ab7895-6e56-4599-9ac2-16f59867f350">Tỉnh Lạng Sơn</Select.Option>
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
        <Select placeholder="Chọn Quận/Huyện" showSearch allowClear onChange = {onChangeDistrict}>
          <Select.Option value="f2953df8-4df7-467f-ae17-ec2a60c51ae0">Quận Cầu Giấy</Select.Option>
          <Select.Option value="28b6dbf2-f3a2-4e6c-8886-450701f092ba">Quận Hoàn Kiếm</Select.Option>
          <Select.Option value="35a2a016-4f2e-4e0e-bb47-d546b9504b59">Huyện Chương Mỹ</Select.Option>
          <Select.Option value="3abfc601-65b9-4302-844f-857491f5b6aa">Huyện Sóc Sơn</Select.Option>
          <Select.Option value="44d62dda-a0c2-437d-ad16-98087e0d5dd1">Huyện Đông Anh</Select.Option>
          <Select.Option value="5621bd4e-077a-44a1-a541-920e1228bb25">Huyện Phúc Thọ</Select.Option>
          <Select.Option value="5a448513-9ca4-4696-ab9a-9e729d15c4b5">Thị xã Sơn Tây</Select.Option>
          <Select.Option value="5f256ed9-ed3e-4428-8d1e-0d1a3a6dd3ee">Quận Hà Đông</Select.Option>
          <Select.Option value="619d6fa9-931b-4026-a6ab-a3c361c86066">Quận Hai Bà Trưng</Select.Option>
          <Select.Option value="6943fbe4-59bd-4365-9216-aacfc9e35f2e">Quận Hoàng Mai</Select.Option>
          <Select.Option value="6ba89604-0129-4e5a-b679-d1cf36e2974e">Quận Ba Đình</Select.Option>
          <Select.Option value="7e94666e-0154-4d98-8191-dc86476649f8">Huyện Quốc Oai</Select.Option>
          <Select.Option value="86af3cbc-a343-4de6-acb1-4a708c138f4b">Huyện Mê Linh</Select.Option>
          <Select.Option value="8a7127d1-4825-4e2b-b29f-69433e3a55dd">Quận Bắc Từ Liêm</Select.Option>

        </Select>
      </Form.Item>
      <Form.Item label="Địa chỉ">
        <Input placeholder="Nhập Địa chỉ" allowClear onChange = {onChangeAdress} />
      </Form.Item>
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
          htmlType="submit"
          onClick={(e) => submit(e)}
        >
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ChangeAdress;

import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select, Modal } from "antd";
import JSONbig from "json-bigint";
import { ACCOUNTS, some } from "../../../constants/constants";
// import Axios from "axios";
// import { actionChangeLocation } from "../../system/systemAction";
// import { useSnackbar } from "notistack";
// import { snackbarSetting } from "../../common/Elements";
// import { getCity } from "../api/AdressUser";
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
  // console.log("city", city?.message)
  // const cityName  = {
  //   value: "",
  //   label: "",
  // }

  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [data, setData] = useState({
    UserID: "",
    Phone: "",
    Address: "",
  });

  function onSearch(val: any) {}
  function onChange(value: any) {}
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
          <Select.Option value="0a16de60-299e-4a79-9180-3d253dc9bbb0">
            Huyện Ba Vì
          </Select.Option>
          <Select.Option value="15abf600-731e-4ae6-99ea-1478d0b8ce95">
            Huyện Phú Xuyên
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
          <Select.Option value="78dfb396-313f-4068-a5e1-faaa5aa4be65">
            Huyện Mỹ Đức
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
          <Select.Option value="8d74a79b-9a47-4dfd-b374-412063becdce">
            Quận Nam Từ Liêm
          </Select.Option>
          <Select.Option value="aa82fde1-9ee7-4e04-8b7f-2384e5310a86">
            Huyện Thanh Trì
          </Select.Option>
          <Select.Option value="ab244c62-d87f-423b-b1e6-b1983026ece5">
            Huyện Thanh Oai
          </Select.Option>
          <Select.Option value="ad7438b7-7593-46d4-9c7b-99f32734fba2">
            Huyện Đan Phượng
          </Select.Option>
          <Select.Option value="b14ccd35-5d7c-436b-ad59-b1f847c7c485">
            Quận Thanh Xuân
          </Select.Option>
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

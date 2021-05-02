import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, Select } from "antd";
import JSONbig from "json-bigint";
import { ACCOUNTS, some, SUCCESS_CODE } from "../../../constants/constants";
import axios from "axios";
import { actionChangeLocation } from "../../system/systemAction";
import { useSnackbar } from "notistack";
import { snackbarSetting } from "../../common/Elements";
import { getCity } from "../api/AdressUser";
const ChangeAdress = () => {
  const [city, setCity] = React.useState<any>();
  React.useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res: some = await getCity();
        if (res?.code === SUCCESS_CODE) {
          setCity(res);
        } else {
        }
      } catch (error) {}
    };
    fetchUserId();

  }, []);
  console.log("city", city?.message)
  const cityName  = {
    value: "",
    label: "",
  }
  // const ListCity = () =>{

  // }
  // console.log("options", options)

  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // const [loading, setLoading] = React.useState<boolean>(false);
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  console.log("dataUser",dataUser)
  const [data, setData] = useState({
    UserID: dataUser.id,
    Phone: "",
    Address: "",
  });

  // const onSubmit = async (data: any) => {
  //   try {
  //     setLoading(true);
  //     const res: some = await actionChangeLocation({ ...data });
  //     if (res?.code === SUCCESS_CODE) {
  //     } else {
  //       enqueueSnackbar(
  //         res?.message,
  //         snackbarSetting((key) => closeSnackbar(key), { color: "error" })
  //       );
  //     }
  //   } catch (error) {
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // React.useEffect(() => {
  //   onSubmit({
  //     name: data.name,
  //     phonenumber: data.phonenumber,
  //     Email: data.Email,
  //     Address: data.Address,
  //   }); //eslint-disable-next-line
  // }, []);
  function onSearch(val: any) {
    console.log("search:", val);
  }
  function onChange(value: any) {
    console.log(`selected ${value}`);
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
  console.log(data);
  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch("http://vuanhlk14-001-site1.itempurl.com/Address/AddAddressForUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    }).then((res) => {
      console.log("success");
    });
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
          defaultValue={dataUser.phone}
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
          <Select.Option value="Hà Nội">Cầu Giấy</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Phường/xã">
        <Select
          placeholder="Chọn Phường/Xã"
          onSearch={onSearch}
          showSearch
          onChange={onChange}
          allowClear
        >
          <Select.Option value="jack">Jack</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Địa chỉ">
        <Input
          placeholder="Nhập Địa chỉ"
          allowClear
          onChange={onChangeAdress}
          value={data.Address}
        />
      </Form.Item>
      <Form.Item label="Email">
        <Input
          placeholder="Nhập Email"
          defaultValue={dataUser.email}
          allowClear
        />
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
          onClick={submit}
        >
          Xác nhận
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ChangeAdress;

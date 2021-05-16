import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Input, Cascader, Button } from "antd";
import { Content } from "antd/lib/layout/layout";
const options = [
  {
    value: "Hà Nội",
    label: "Hà Nội",
  },
  {
    value: "Quận 1",
    label: "Quận 1",
  },
];

function onChange() {
  console.log("hh");
}

const AddAdress = () => {
  const [data, setData] = useState({
    Name: "",
    Phone: "",
    Address: "",
    Email: "",
  });
  const onChangeName = (e: any) => {
    const newdata = { ...data };
    newdata.Name = e.target.value;
    setData(newdata);
  };
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
  const onChangeEmail = (e: any) => {
    const newdata = { ...data };
    newdata.Email = e.target.value;
    setData(newdata);
  };
  const submit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    fetch("https://tiki-test-1.herokuapp.com/Address/AddAddressForUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    }).then((res) => {
      console.log("success");
    });
  };

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
            <Input placeholder="Nhập Họ và tên" onChange={onChangeName} />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input placeholder="Nhập Số điện thoại" onChange={onChangePhone} />
          </Form.Item>
          {/* <Form.Item label="Tỉnh/Thành Phố">
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="Chọn Thành phố/Tỉnh"
        />
      </Form.Item>
      <Form.Item label="Quận">
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="Chọn Quận/Huyện"
        />
      </Form.Item>
      <Form.Item label="Phường xã">
        <Cascader
          options={options}
          onChange={onChange}
          placeholder="chọn Phường/Xã"
        />
      </Form.Item> */}
          <Form.Item label="Địa chỉ">
            <Input placeholder="Nhập Địa chỉ" onChange={onChangeAdress} />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Nhập Email" onChange={onChangeEmail} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" shape="round" onClick = {submit}size="large">
              Thêm
            </Button>
          </Form.Item>
        </Form>
    </Content>
  );
};
export default AddAdress;

import { Button, Modal, DatePicker, Form, Input, Layout, Radio } from "antd";
import { getDataUser } from "../api/UserInfo";
import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import "antd/dist/antd.css";
// import { some, SUCCESS_CODE } from "../../../constants/constants";
import JSONbig from "json-bigint";
import { ACCOUNTS, some } from "../../../constants/constants";
import moment, { Moment } from "moment";
const { Content } = Layout;
const Profile = () => {
  // let id:{} = useParams();
  // const [dataUser, setDataUser] = React.useState<any>();
  // console.log("id", id)
  // React.useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const res: some = await getDataUser(id.toString());
  //       if (res?.code === SUCCESS_CODE) {
  //         setDataUser(res);
  //       } else {
  //       }
  //     } catch (error) {}
  //   };
  //   fetchUserId();
  // }, [id]);
  // console.log("dataUser", dataUser);
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const data: some = await getDataUser();
  //     console.log("data", data?.data);
  //     if (data !== undefined) {
  //       setDataUser(data);
  //     }
  //   };
  //   getData();
  // }, [id]);
  const [date, setDate] = useState(moment(new Date()));
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [value, setValue] = React.useState<any>(1);
  const onChangeGender = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  console.log("dt", dataUser);

  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblePass, setIsModalVisiblePass] = useState(false);
  // info
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  // pass
  const showModalPass = () => {
    setIsModalVisiblePass(true);
  };

  const handleOkPass = () => {
    setIsModalVisiblePass(false);
  };

  const handleCancelPass = () => {
    setIsModalVisiblePass(false);
  };
  return (
    <div>
      <Content
        className="site-layout-background"
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
          // size="default"
        >
          <Form.Item label="Họ và tên">
            {dataUser?.firstName && (
              <Input
                defaultValue={dataUser?.firstName + " " + dataUser.lastName}
              ></Input>
            )}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            {dataUser?.phone && <Input defaultValue={dataUser?.phone}></Input>}
          </Form.Item>
          <Form.Item label="Email">
            {dataUser?.email && <Input defaultValue={dataUser?.email}></Input>}
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group
              onChange={onChangeGender}
              defaultValue={dataUser.gender}
            >
              <Radio value="M">Nam</Radio>
              <Radio value="F">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker defaultValue={moment(dataUser.dateOfBirth)} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" size="large" onClick={showModal}>
              Sửa thông tin
            </Button>
            <Button
              type="primary"
              size="large"
              style={{ marginLeft: "5px" }}
              onClick={showModalPass}
            >
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Modal
        title="Sửa thông tin"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: "default" }}
        >
          <Form.Item
            name={["user", "name"]}
            label="Firstname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "name"]}
            label="Lastname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "Phone"]}
            label="Phone"
            rules={[{ required: true }, { type: "number" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group
              onChange={onChangeGender}
              defaultValue={dataUser.gender}
            >
              <Radio value="M">Nam</Radio>
              <Radio value="F">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker defaultValue={moment(dataUser.dateOfBirth)} />
          </Form.Item>
          <Form.Item
            name={["user", "email"]}
            label="Email"
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Đổi mật khẩu"
        visible={isModalVisiblePass}
        onOk={handleOkPass}
        onCancel={handleCancelPass}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: "default" }}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: "Điền mật khẩu cũ" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Diền mật khẩu cũ" }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Profile;

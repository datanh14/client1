import { Button, DatePicker, Form, Input, Layout, Modal, Radio } from 'antd';
import 'antd/dist/antd.css';
import Axios from 'axios';
import JSONbig from 'json-bigint';
import moment from 'moment';
import React, { useState } from 'react';
import { ACCESS_TOKEN, ACCOUNTS } from '../../../constants/constants';
import DialogSignUpToStore from './DialogSignUpToStore';
const { Content } = Layout;
const Profile = () => {
  const dataUser = JSONbig.parse(localStorage.getItem(ACCOUNTS) || '{}');
  const [value, setValue] = React.useState<any>(1);
  const onChange = (e: any) => {
    setValue(e.target.value);
  };
  const token = localStorage.getItem(ACCESS_TOKEN);
  const urlprofile =
    'https://hello-world-vuanhlk12.cloud.okteto.net/api/authenticate/ChangeInfo';
  const urlpass =
    'https://hello-world-vuanhlk12.cloud.okteto.net/api/authenticate/ChangePassword';
  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisiblePass, setIsModalVisiblePass] = useState(false);
  // info
  const [data, setData] = useState({
    Email: dataUser.email,
    firstname: dataUser.firstName,
    lastname: dataUser.lastName,
    dateofbirth: dataUser.dateOfBirth,
    gender: dataUser.gender,
    phonenumber: dataUser.phone,
  });
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    Axios.post(urlprofile, {
      Email: data.Email,
      firstname: data.firstname,
      lastname: data.lastname,
      dateofbirth: data.dateofbirth,
      gender: data.gender,
      phonenumber: data.phonenumber,
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) => {});
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onChangeFirstName = (e: any) => {
    const newdata = { ...data };
    newdata.firstname = e.target.value;
    setData(newdata);
  };
  const onChangeLastName = (e: any) => {
    const newdata = { ...data };
    newdata.lastname = e.target.value;
    setData(newdata);
  };
  const onChangePhone = (e: any) => {
    const newdata = { ...data };
    newdata.phonenumber = e.target.value;
    setData(newdata);
  };
  const onChangeEmail = (e: any) => {
    const newdata = { ...data };
    newdata.Email = e.target.value;
    setData(newdata);
  };
  const onChangeGender = (e: any) => {
    const newdata = { ...data };
    newdata.gender = e.target.value;
    setData(newdata);
  };
  const onChangeDate = (value: any) => {
    const newdata = { ...data };

    newdata.dateofbirth = value.format('YYYY-MM-DD');
    setData(newdata);
  };

  // pass
  const [pass, setPass] = useState({
    Password: '',
    NewPassword: '',
  });
  const showModalPass = () => {
    setIsModalVisiblePass(true);
  };

  const handleOkPass = () => {
    setIsModalVisiblePass(false);
    Axios.post(urlpass, {
      Password: pass.Password,
      NewPassword: pass.NewPassword,
    }, {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }).then((res) => {});
  };

  const handleCancelPass = () => {
    setIsModalVisiblePass(false);
  };
  const onChangePass = (e: any) => {
    const newdata = { ...pass };
    newdata.Password = e.target.value;
    setPass(newdata);
  };
  const onChangeNewPass = (e: any) => {
    const newdata = { ...pass };
    newdata.NewPassword = e.target.value;
    setPass(newdata);
  };
  return (
    <div>
      <Content
        className="site-layout-background"
        style={{
          margin: '25px 25px',
          padding: '50px 50px',
          backgroundColor: 'white',
        }}
      >
        <div style={{ margin: '25px 25px' }}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: 'default' }}
            // size="default"
          >
            <Form.Item label="Họ và tên">
              {dataUser?.firstName && (
                <Input
                  defaultValue={dataUser?.firstName + ' ' + dataUser.lastName}
                ></Input>
              )}
            </Form.Item>
            <Form.Item label="Số điện thoại">
              {dataUser?.phone && (
                <Input defaultValue={dataUser?.phone}></Input>
              )}
            </Form.Item>
            <Form.Item label="Email">
              {dataUser?.email && (
                <Input defaultValue={dataUser?.email}></Input>
              )}
            </Form.Item>
            <Form.Item label="Giới tính">
              <Radio.Group onChange={onChange} defaultValue={dataUser.gender}>
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
                onClick={showModalPass}
                style={{ margin: '5px 5px' }}
              >
                Đổi mật khẩu
              </Button>
              <DialogSignUpToStore item={dataUser} />
            </Form.Item>
          </Form>
        </div>
      </Content>
      <Modal
        title="Sửa thông tin"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: 'default' }}
        >
          <Form.Item
            name="First Name"
            label="Tên"
            rules={[{ required: true }]}
            style={{
              justifyContent: 'space-around',
            }}
          >
            <Input
              defaultValue={dataUser.firstName}
              onChange={onChangeFirstName}
            />
          </Form.Item>
          <Form.Item
            name="Last Name"
            label="Họ"
            rules={[{ required: true }]}
            style={{
              justifyContent: 'space-around',
            }}
          >
            <Input
              defaultValue={dataUser.lastName}
              onChange={onChangeLastName}
            />
          </Form.Item>
          <Form.Item
            name="Number Phone"
            label="Số điện thoại"
            rules={[{ required: true }, { type: 'number' }]}
            style={{
              justifyContent: 'space-around',
            }}
          >
            <Input defaultValue={dataUser.phone} onChange={onChangePhone} />
          </Form.Item>
          <Form.Item
            label="Giới tính"
            style={{
              justifyContent: 'space-around',
            }}
          >
            <Radio.Group
              onChange={onChangeGender}
              defaultValue={dataUser.gender}
            >
              <Radio value="M">Nam</Radio>
              <Radio value="F">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="Ngày sinh"
            style={{
              justifyContent: 'space-around',
            }}
          >
            <DatePicker
              defaultValue={moment(dataUser.dateOfBirth)}
              onChange={onChangeDate}
            />
          </Form.Item>
          <Form.Item
            name="Email"
            label="Email"
            rules={[{ required: true }, { type: 'email' }]}
            style={{
              justifyContent: 'space-around',
            }}
          >
            <Input defaultValue={dataUser.email} onChange={onChangeEmail} />
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
          initialValues={{ size: 'default' }}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: 'Điền mật khẩu cũ' }]}
          >
            <Input.Password onChange={onChangePass} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: 'Diền mật khẩu cũ' }]}
          >
            <Input.Password onChange={onChangeNewPass} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default Profile;

import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Layout,
  Radio,
} from "antd";
import "antd/dist/antd.css";
import React from "react";
const { Content } = Layout;
const Profile = () => {
    const [value, setValue] = React.useState<any>(1);
    const onChange = (e: any) => {
        console.log("radio checked", e.target.value);
        setValue(e.target.value);
      };
  return (
    <Layout style={{ padding: "0 12px 12px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
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
            <Input />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input />
          </Form.Item>
          <Form.Item label="Mã xác nhận">
            <Input></Input>
          </Form.Item>
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Nam</Radio>
              <Radio value={2}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker />
          </Form.Item>
          <Form.Item style={{ paddingLeft: 200 }}>
            <Checkbox>Thay đổi mật khẩu</Checkbox>
          </Form.Item>
          <Form.Item style={{ paddingLeft: 200 }}>
            <Button type="primary" shape="round" size="large">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
export default Profile;

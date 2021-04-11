import {
    CreditCardOutlined,
    DollarCircleOutlined,
    EnvironmentOutlined,
    EyeOutlined,
    FormOutlined,
    HeartOutlined,
    NotificationOutlined,
    QuestionCircleOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Layout,
    Menu,
    Radio,
  } from "antd";
  import "antd/dist/antd.css";
  import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { some } from "../../constants/constants";

  const { Content, Sider } = Layout;
  const ProfilePage = (props: some) => {
    const [value, setValue] = React.useState<any>(1);
    const onChange = (e:any) => {
      console.log("radio checked", e.target.value);
      setValue(e.target.value);
    };
    return (
      <>
        <Layout>
          <Layout>
            <Sider width={250} className="site-layout-background">
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
              >
                <Menu.Item key="1">
                  {" "}
                  <UserOutlined />
                  Thông tin tài khoản
                </Menu.Item>
                <Menu.Item key="2">
                  {" "}
                  <NotificationOutlined />
                  Thông báo của tôi
                </Menu.Item>
                <Menu.Item key="3">
                  {" "}
                  <FormOutlined />
                  Quản lý đơn hàng
                </Menu.Item>
                <Menu.Item key="4">
                  {" "}
                  <EnvironmentOutlined />
                  Sổ địa chỉ
                </Menu.Item>
                <Menu.Item key="5">
                  {" "}
                  <CreditCardOutlined />
                  Thông tin thanh toán
                </Menu.Item>
                <Menu.Item key="6">
                  {" "}
                  <StarOutlined />
                  Nhận xét của tôi
                </Menu.Item>
                <Menu.Item key="7">
                  {" "}
                  <EyeOutlined />
                  Sản phẩm đã xem
                </Menu.Item>
                <Menu.Item key="8">
                  {" "}
                  <HeartOutlined />
                  Sản phẩm ưu thích
                </Menu.Item>
                <Menu.Item key="9">
                  {" "}
                  <ShoppingCartOutlined />
                  Sản phẩm mua sau
                </Menu.Item>
                <Menu.Item key="10">
                  <QuestionCircleOutlined />
                  Hỏi đáp
                </Menu.Item>
                <Menu.Item key="11">
                  <DollarCircleOutlined />
                  Mã giảm giá
                </Menu.Item>
              </Menu>
            </Sider>
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
                    <Input />
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
          </Layout>
        </Layout>
      </>
    );
  };
  export default connect(
    (state: any) => ({ profile: state.system.profile }),
    {}
  )(withRouter(ProfilePage));
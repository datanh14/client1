import {
  EnvironmentOutlined,
  FormOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const SubMenu = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameDefault = [pathname];
  return (
    <>
      <Layout
        className="site-layout-background"
        style={{
          margin: '25px 25px',
          backgroundColor: 'white',
        }}
      >
        <Sider width={250} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={pathnameDefault}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key={`/customer/account/edit`}>
              {' '}
              <NavLink to={`/customer/account/edit`}>
                <UserOutlined />
                Thông tin tài khoản
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key={`/customer/notification`}>
              {" "}
              <NavLink to={`/customer/notification`}>
                <NotificationOutlined />
                Thông báo của tôi
              </NavLink>
            </Menu.Item> */}

            <Menu.Item key="/sales/order/history">
              {' '}
              <NavLink to="/sales/order/history">
                <FormOutlined />
                Quản lý đơn hàng
              </NavLink>
            </Menu.Item>
            <Menu.Item key={`/customer/address`}>
              {' '}
              <NavLink to={`/customer/address`}>
                <EnvironmentOutlined />
                Sổ địa chỉ
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key={`/customer/paymentcard`}>
              {' '}
              <NavLink to={`/customer/paymentcard`}>
                <CreditCardOutlined />
                Thông tin thanh toán
              </NavLink>
            </Menu.Item> */}
            {/* <Menu.Item key="9">
              {' '}
              <ShoppingCartOutlined />
              Sản phẩm mua sau
            </Menu.Item> */}
            <Menu.Item key="/chatbot">
              <NavLink to="/chatbot">
                <QuestionCircleOutlined />
                Hỏi đáp
              </NavLink>
            </Menu.Item>
            {/* <Menu.Item key="/customer/coupons">
              <NavLink to="/customer/coupons">
                <DollarCircleOutlined />
                Mã giảm giá
              </NavLink>
            </Menu.Item> */}
          </Menu>
        </Sider>
      </Layout>
    </>
  );
};
export default SubMenu;

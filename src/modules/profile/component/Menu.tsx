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
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import JSONbig from "json-bigint";
import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ACCOUNTS, some } from "../../../constants/constants";

const { Sider } = Layout;
const SubMenu = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const pathnameDefault = [pathname];
  return (
    <>
      <Layout>
        <Layout>
          <Sider width={250} className='site-layout-background'>
            <Menu
              mode='inline'
              defaultSelectedKeys={pathnameDefault}
              style={{ height: "100%", borderRight: 0 }}
            >
              <Menu.Item key={`/customer/account/edit`}>
                {" "}
                <NavLink to={`/customer/account/edit`}>
                  <UserOutlined />
                  Thông tin tài khoản
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/customer/notification`}>
                {" "}
                <NavLink to={`/customer/notification`}>
                  <NotificationOutlined />
                  Thông báo của tôi
                </NavLink>
              </Menu.Item>

              <Menu.Item key='/sales/order/history'>
                {" "}
                <NavLink to='/sales/order/history'>
                  <FormOutlined />
                  Quản lý đơn hàng
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/customer/address`}>
                {" "}
                <NavLink to={`/customer/address`}>
                  <EnvironmentOutlined />
                  Sổ địa chỉ
                </NavLink>
              </Menu.Item>
              <Menu.Item key={`/customer/paymentcard`}>
                {" "}
                <NavLink to={`/customer/paymentcard`}>
                  <CreditCardOutlined />
                  Thông tin thanh toán
                </NavLink>
              </Menu.Item>
              <Menu.Item key='6'>
                {" "}
                <StarOutlined />
                Nhận xét của tôi
              </Menu.Item>
              <Menu.Item key='7'>
                {" "}
                <EyeOutlined />
                Sản phẩm đã xem
              </Menu.Item>
              <Menu.Item key='8'>
                {" "}
                <HeartOutlined />
                Sản phẩm ưu thích
              </Menu.Item>
              <Menu.Item key='9'>
                {" "}
                <ShoppingCartOutlined />
                Sản phẩm mua sau
              </Menu.Item>
              <Menu.Item key='10'>
                <QuestionCircleOutlined />
                Hỏi đáp
              </Menu.Item>
              <Menu.Item key='/customer/coupons'>
                <NavLink to='/customer/coupons'>
                  <DollarCircleOutlined />
                  Mã giảm giá
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
};
export default SubMenu;

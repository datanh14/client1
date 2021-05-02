import React from "react";
import { Card, Popover, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Content } from "antd/lib/layout/layout";
const content = (
  <div>
    <p>áp dụng cho các sản phảm công nghệ</p>
    <p>Hạn sử dụng: 20/12/2021</p>
  </div>
);
const Coupon = () => {
  return (
    <Content
      style={{
        margin: "25px 25px",
        padding: "50px 50px",
        backgroundColor: "white",
        height: '500px'
      }}
    >
      <Space direction="horizontal">
        <Card
          title="Mã giảm giá"
          extra={
            <a href="gg">
              <Popover content={content} title="Mã giảm 30%">
                {" "}
                <ExclamationCircleOutlined />
              </Popover>
            </a>
          }
          style={{ width: 300 }}
        >
          <p>Hạn sử dụng: 20/12/2021</p>
        </Card>
        <Card
          title="Mã giảm giá"
          extra={
            <a href="gg">
              <Popover content={content} title="Mã giảm 30%">
                {" "}
                <ExclamationCircleOutlined />
              </Popover>
            </a>
          }
          style={{ width: 300 }}
        >
          <p>Hạn sử dụng: 20/12/2021</p>
        </Card>
        <Card
          title="Mã giảm giá"
          extra={
            <a href="gg">
              <Popover content={content} title="Mã giảm 30%">
                {" "}
                <ExclamationCircleOutlined />
              </Popover>
            </a>
          }
          style={{ width: 300 }}
        >
          <p>Hạn sử dụng: 20/12/2021</p>
        </Card>
      </Space>
    </Content>
  );
};
export default Coupon;

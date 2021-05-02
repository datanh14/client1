import React from "react";
import { Space, Card, Popover, Button } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Layout, Menu, Breadcrumb } from 'antd';
import { PlusOutlined } from "@ant-design/icons";
const { Header, Content, Footer } = Layout;
const content = (
  <div>
    <p>thanh toan bang Vi MOMO</p>
    <p>Hạn sử dụng: 20/12/2021</p>
  </div>
);

const PaymentCard = () => {
  return (
    <Content style={{ margin: '25px 25px', padding: '50px 50px', backgroundColor:'white' }}>
         <Space direction="horizontal">
        <Card
          title="Momo"
          style={{ width: 300 }}
          extra={
            <a href="gg">
              <Popover content={content} title="THanh toan bang vi MOMO">
                {" "}
                <ExclamationCircleOutlined />
              </Popover>
            </a>
          }
        >
          <p>Số điện thoại: 02121028</p>
          <p>Card content</p>
        </Card>
        <Card title="ZaloPay" style={{ width: 300 }}>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
            
      </Space>
      <Button type="dashed" size="large" style={{width: '100%', marginTop: '10px'}} >
                  <PlusOutlined />
                  Thêm phương thức thanh toán
                </Button>
    </Content>
    )
     
}
export default PaymentCard;

import React from "react";
import { Descriptions, Row, Col, Button } from "antd";
import "antd/dist/antd.css";

const Adress = () => {
  return (
    <Row>
      <Col span={16}>
        <Descriptions layout="horizontal" title="Vũ Ngọc Ánh">
            <Descriptions.Item label="Địa chỉ"span={12}>
              Số 18, Ngách 20/14, Ngõ 20, Hồ Tùng Mậu, Cầu Giấy, Hà Nội
            </Descriptions.Item>
            <Descriptions.Item label="Số điện thoại"span={12} >
              09732124423
            </Descriptions.Item>
        </Descriptions>
      </Col>
      <Col span={3}>
        <Button type="link">Chỉnh sửa</Button>
      </Col>
    </Row>
  );
};
export default Adress;

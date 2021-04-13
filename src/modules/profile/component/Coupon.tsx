import React from 'react'
import { Card, Popover } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import "antd/dist/antd.css"
const content = (
  <div>
    <p>áp dụng cho các sản phảm công nghệ</p>
    <p>Hạn sử dụng: 20/12/2021</p>
  </div>
);
const Coupon = () => {
  return (
    <Card
      title="Mã giảm giá"
      extra={<a href="gg">
        <Popover content={content} title="Mã giảm 30%"> <ExclamationCircleOutlined /></Popover>
      </a>}
      style={{ width: 300 }}>
      <p>Hạn sử dụng: 20/12/2021</p>
    </Card>
  )

}
export default Coupon;
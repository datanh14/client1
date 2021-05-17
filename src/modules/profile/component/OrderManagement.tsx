import React from 'react'
import "antd/dist/antd.css"
import { Table } from 'antd';

const columns = [
  {
    title: 'Mã đơn hàng',
    dataIndex: 'ma',
    key: 'ma',
  },
  {
    title: 'Ngày mua',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: 'Sản phảm mua',
    dataIndex: 'tesp',
    key: 'tesp',
  },
  {
    title: 'Trạng thái đơn hàng',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Tổng tiền',
    key: 'money',
    dataIndex: 'money'
  },
];

const data = [
  {
    key: '1',
    ma: '458074316',
    day: '04/12/2020',
    tesp: 'New York No. 1 Lake Park',
    tags: 'Đã giao hàng'
  },
  {
    key: '2',
    ma: '458074316',
    day: '04/12/2020',
    tesp: 'London No. 1 Lake Park',
    tags: 'Đã giao hàng'
  },
  {
    key: '3',
    ma: '458074316',
    day: '04/12/2020',
    tesp: 'Sidney No. 1 Lake Park',
    tags: 'Đã giao hàng'
  },
];
const OrderManagement = () => {
    return (
        <Table columns={columns} dataSource={data} />
    )

}
export default OrderManagement
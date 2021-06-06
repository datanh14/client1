import React, { useState } from "react";
import "antd/dist/antd.css";
import { Layout, Spin, Table } from "antd";
import { ACCOUNTS, some, SUCCESS_CODE } from "../../../constants/constants";
import JSONbig from "json-bigint";
import { getOrder } from "../api/Order";
const { Content } = Layout;

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Ngày mua",
    dataIndex: "orderTime",
    key: "orderTime",
  },
  {
    title: "Sản phảm mua",
    // dataIndex: "listItem",
    // key: "listItem",
  },
  {
    title: "Trạng thái đơn hàng",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Tổng tiền",
    key: "total",
    dataIndex: "total",
  },
];

const OrderManagement = () => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [dataOrder, setOrder] = React.useState<any>();
  React.useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res: some = await getOrder(dataUser.id);
        if (res?.code === SUCCESS_CODE) {
          setOrder(res);
        } else {
        }
      } catch (error) {}
    };
    fetchUserId();
  }, []);
  console.log(dataOrder?.detail[0]);

  console.log(dataOrder);
  if (dataOrder === undefined) {
    return (
      <Content
        className="site-layout-background"
        style={{
          margin: "25px 25px",
          padding: "50px 50px",
          backgroundColor: "white",
          height: "600px",
        }}
      >
        <Spin size="large" style ={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}/>
      </Content>
    );
  }
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "25px 25px",
        padding: "50px 50px",
        backgroundColor: "white",
      }}
    >
      <Table
        columns={columns}
        dataSource={dataOrder?.detail}
        pagination={{
          defaultPageSize: 5,
          position: ["bottomCenter"],
        }}
        style={{
          margin: "25px 25px",
        }}
      />
    </Content>
  );
};
export default OrderManagement;

import { IconButton } from "@material-ui/core";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import { Layout, Spin } from "antd";
import "antd/dist/antd.css";
import JSONbig from "json-bigint";
import React, { useEffect } from "react";
import { GREY_600 } from "../../../assets/theme/colors";
import { ACCOUNTS, some, SUCCESS_CODE } from "../../../constants/constants";
import { Row } from "../../common/Elements";
import TableCustom from "../../common/TableCustom";
import { actionGetOrder } from "../../system/systemAction";
import { getOrder } from "../api/Order";
import DialogDetailPayment from "./DialogDetailPayment";
const { Content } = Layout;
interface Props {}

const OrderManagement: React.FC<Props> = (props) => {
  const dataUser = JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}");
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [dataOrder, setDataOrder] = React.useState<any[]>([]);

  const [detailPayment, setDetailPayment] = React.useState<any>();
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
    {
      title: "Xem",
      dataIndex: "id",
      width: 100,
      styleHeader: { color: GREY_600, textAlign: "center" },
      render: (record: any) => {
        return (
          <Row key={record?.id}>
            <IconButton
              onClick={() => {
                setDetailPayment(record);
                handleClickOpen();
              }}
            >
              <FindInPageIcon />
            </IconButton>
          </Row>
        );
      },
    },
  ];
  const fetchUserId = async () => {
    try {
      const res: some = await actionGetOrder(dataUser?.id);
      if (res?.code === SUCCESS_CODE) {
        setDataOrder([...res?.detail]);
      } else {
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    fetchUserId();
  }, []);

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
      ></Content>
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
      {/* <TableCustom dataSource={dataOrder} columns={columns} noColumnIndex /> */}
      <DialogDetailPayment
        open={open}
        handleClose={handleClose}
        dataPayment={detailPayment}
      />
    </Content>
  );
};
export default OrderManagement;

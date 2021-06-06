import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Layout, Spin, Table } from 'antd';
import { ACCOUNTS, some, SUCCESS_CODE } from '../../../constants/constants';
import JSONbig from 'json-bigint';
import { getOrder } from '../api/Order';
import DialogDetailPayment from './DialogDetailPayment';
import { IconButton } from '@material-ui/core';
import { Row } from '../../common/Elements';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { GREY_600 } from '../../../assets/theme/colors';
const { Content } = Layout;

const OrderManagement = () => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || '{}')
  );
  const [dataOrder, setOrder] = React.useState<any>();
  const [open, setOpen] = React.useState(false);
  const [detailPayment, setDetailPayment] = React.useState<any>();
  const columns = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Ngày mua',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Sản phảm mua',
      // dataIndex: "listItem",
      // key: "listItem",
    },
    {
      title: 'Trạng thái đơn hàng',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Tổng tiền',
      key: 'total',
      dataIndex: 'total',
    },
    {
      title: 'Xem',
      dataIndex: 'id',
      render: (text: any, record: any) => {
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
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
        className='site-layout-background'
        style={{
          margin: '25px 25px',
          padding: '50px 50px',
          backgroundColor: 'white',
          height: '600px',
        }}
      >
        <Spin
          size='large'
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Content>
    );
  }
  return (
    <div>
      <Content
        className='site-layout-background'
        style={{
          margin: '25px 25px',
          padding: '50px 50px',
          backgroundColor: 'white',
        }}
      >
        <Table
          columns={columns}
          dataSource={dataOrder?.detail}
          pagination={{
            defaultPageSize: 5,
            position: ['bottomCenter'],
          }}
          style={{
            margin: '25px 25px',
          }}
        />
      </Content>
      <DialogDetailPayment
        open={open}
        handleClose={handleClose}
        dataPayment={detailPayment}
      />
    </div>
  );
};
export default OrderManagement;

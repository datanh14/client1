import { IconButton } from '@material-ui/core';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import { Layout, Spin } from 'antd';
import 'antd/dist/antd.css';
import JSONbig from 'json-bigint';
import React, { useState } from 'react';
import { GREY_600 } from '../../../assets/theme/colors';
import { ACCOUNTS, some, SUCCESS_CODE } from '../../../constants/constants';
import { Row } from '../../common/Elements';
import TableCustom from '../../common/TableCustom';
import { getOrder } from '../api/Order';
import DialogDetailPayment from './DialogDetailPayment';
const { Content } = Layout;

const OrderManagement = () => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || '{}')
  );
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [dataOrder, setOrder] = React.useState<any>();
  const [detailPayment, setDetailPayment] = React.useState<some>();
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
      width: 100,
      styleHeader: { color: GREY_600, textAlign: 'center' },
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
    <Content
      className='site-layout-background'
      style={{
        margin: '25px 25px',
        padding: '50px 50px',
        backgroundColor: 'white',
      }}
    >
      <TableCustom
        dataSource={dataOrder?.detail}
        columns={columns}
        noColumnIndex
      />
      <DialogDetailPayment
        open={open}
        handleClose={handleClose}
        dataPayment={detailPayment}
      />
    </Content>
  );
};
export default OrderManagement;

import { Avatar, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Table } from 'antd';
import JSONbig from 'json-bigint';
import React from 'react';
import { GREY_600 } from '../../../assets/theme/colors';
import { some } from '../../../constants/constants';
import { Row } from '../../common/Elements';
interface Props {
  open: boolean;
  handleClose(): void;
  dataPayment: some;
}
const DialogDetailPayment: React.FC<Props> = (props) => {
  const { open, handleClose, dataPayment } = props;
  const data = dataPayment?.listItem && JSONbig.parse(dataPayment?.listItem);
  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'id',
      width: 100,
      styleHeader: { color: GREY_600, textAlign: 'center' },
      render: (text: any, record: any) => {
        return (
          <Row key={record?.id}>
            <Avatar src={record?.Product?.Images[0]} />
          </Row>
        );
      },
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'id',
      width: 250,
      styleHeader: { color: GREY_600, textAlign: 'left' },
      render: (text: any, record: any) => {
        return (
          <Row key={record?.id}>
            <Typography>{record?.Product.Name}</Typography>
          </Row>
        );
      },
    },
    {
      title: 'Giá',
      dataIndex: 'id',
      width: 150,
      styleHeader: { color: GREY_600, textAlign: 'left' },
      render: (text: any, record: any) => {
        return (
          <Row key={record?.id}>
            <Typography>{record?.Product.Price}</Typography>
          </Row>
        );
      },
    },
    {
      title: 'Đánh giá',
      dataIndex: 'id',
      width: 100,
      styleHeader: { color: GREY_600, textAlign: 'left' },
      render: (text: any, record: any) => {
        return (
          <Row key={record?.id}>
            <Typography>{record?.Product.Star}</Typography>
          </Row>
        );
      },
    },
    {
      title: 'Lượt đánh giá',
      dataIndex: 'id',
      width: 100,
      styleHeader: { color: GREY_600, textAlign: 'left' },
      render: (text: any, record: any) => {
        return (
          <Row key={record?.id}>
            <Typography>{record?.Product.RatingsCount}</Typography>
          </Row>
        );
      },
    },
    {
      title: 'Size',
      dataIndex: 'id',
      width: 100,
      styleHeader: { color: GREY_600, textAlign: 'left' },
      render: (text: any, record: any) => {
        return (
          <Row key={record?.id}>
            <Typography style={{ textAlign: 'center' }}>
              {record?.Product.Size}
            </Typography>
          </Row>
        );
      },
    },
    {
      title: 'Số lượng mua',
      dataIndex: 'Quantity',
    },
  ];
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='xl'
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{' Chi Tiết đơn hàng'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          <Row>
            <Typography variant='body1' style={{ marginRight: '50px' }}>
              Ngày mua: {dataPayment?.orderTime}
            </Typography>
            <Typography variant='body1'>
              Ngày chuyển: {dataPayment?.shipTime}
            </Typography>
          </Row>
          <Row>
            <Typography variant='body1' style={{ marginRight: '50px' }}>
              Tổng tiền:{' '}
              {dataPayment?.total.toLocaleString('it-IT', {
                style: 'currency',
                currency: 'VND',
              })}
            </Typography>
          </Row>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 5,
              position: ['bottomCenter'],
            }}
            style={{
              margin: '25px 25px',
            }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary' autoFocus>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDetailPayment;

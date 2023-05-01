import React from 'react';
import {
  Descriptions,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Input,
  Select,
  Layout,
  Pagination,
  Spin,
} from 'antd';
import 'antd/dist/antd.css';
import { NavLink } from 'react-router-dom';
import { getDataAdressUser } from '../api/AdressUser';
import { ACCESS_TOKEN, some, SUCCESS_CODE } from '../../../constants/constants';
import JSONbig from 'json-bigint';
import { useState } from 'react';
import { ACCOUNTS } from '../../../constants/constants';
import { PlusOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { actionGetCityList } from '../../system/systemAction';
const { Content } = Layout;

const Adress = (props: any) => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || '{}')
  );

  const [totalItems, setTotaItem] = useState(0);
  const [page, setPage] = useState(1);
  const [dataAdressUser, setDataAdressUser] = React.useState<any>();

  const [city, setCity] = React.useState<any[]>();
  const [cityID, setCityID] = React.useState<string>();
  const [district, setDistrict] = React.useState<any[]>();
  const [defaultValueCity, setDefaultValueCity] = React.useState<number>(0);
  const [defaultValueDistrict, setDefaultValueDistrict] = React.useState<string>("");
  const fetchGetCityList = async () => {
    try {
      const res: some = await actionGetCityList();
      if (res?.code === SUCCESS_CODE) {
        res && setCity(res.message);
      } else {
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    fetchGetCityList();
  }, []);

  function onChange(value: number) {
    if (value) {
      let temp = city ? city[value] : {};
      setDistrict(temp?.districts);
    }
  }

  React.useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res: some = await getDataAdressUser(dataUser.id);
        if (res?.code === SUCCESS_CODE) {
          setDataAdressUser(res);
        } else {
        }
      } catch (error) {}
    };
    fetchUserId();
    setTotaItem(dataAdressUser?.message?.length);
  }, []);

  //Modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  //change
  const showModal = () => {
    setIsModalVisible(true);
  };
  const token = localStorage.getItem(ACCESS_TOKEN);
  const url = 'https://hello-world-vuanhlk12.cloud.okteto.net/Address/ChangeAddress';
  const handleOk = () => {
    setIsModalVisible(false);
    Axios.post(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      ID: data.ID,
      Phone: data.Phone,
      Address: data.Address,
      DistrictID: data.DistrictID,
    }).then((res) => {
      window.location.reload();
    });
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChangeAdress = (data : any) => {
    let temp: number = city?.findIndex((v: any) => v?.city?.id === data?.city?.id ) || 0;
    setDefaultValueCity(temp);
    setDefaultValueDistrict(data?.district?.id);
    let tempCity = city ? city[temp] : {};
      setDistrict(tempCity?.districts);
  }
  const [data, setData] = useState({
    ID: '',
    Phone: '',
    Address: '',
    DistrictID: '',
  });
  function onSearch(val: any) {}
  const onChangeAdress = (e: any) => {
    const newdata = { ...data };
    newdata.Address = e.target.value;
    setData(newdata);
  };
  const onChangePhone = (e: any) => {
    const newdata = { ...data };
    newdata.Phone = e.target.value;
    setData(newdata);
  };
  const onChangeDistrict = (value: any) => {
    const newdata = { ...data };
    newdata.DistrictID = value;
    setData(newdata);
  };
  if (dataAdressUser === undefined) {
    return (
      <Content
        className="site-layout-background"
        style={{
          margin: '25px 25px',
          padding: '50px 50px',
          backgroundColor: 'white',
          height: '500px',
        }}
      >
        <Spin
          size="large"
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
    <>
      <Content
        className="site-layout-background"
        style={{
          margin: '25px 25px',
          padding: '50px 50px',
          backgroundColor: 'white',
        }}
      >
        <div style={{ margin: '25px 25px' }}>
          {dataAdressUser?.message?.map((val: some, index: number) => (
            <div key={index}>
              <Row style={{ borderBottom: '1px solid' }}>
                <Col span={19}>
                  <Descriptions
                    layout="horizontal"
                    title={dataUser?.firstName + ' ' + dataUser.lastName}
                  >
                    <Descriptions.Item label="Địa chỉ" span={12}>
                      {val?.district?.districtName + '/' + val?.city?.cityName}
                    </Descriptions.Item>

                    <Descriptions.Item label="Số điện thoại" span={12}>
                      {val?.phone}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
                <Col span={4}>
                  {/* <NavLink to="/customer/create">
                <Button type="link">Chỉnh sửa</Button>
              </NavLink> */}
                  <Button
                    type="link"
                    onClick={() => {
                      const newdata = { ...data };
                      newdata.ID = val.id;
                      newdata.Address = val.address;
                      newdata.Phone = val.phone;
                      newdata.DistrictID = val.district.id;
                      setData(newdata);
                      handleChangeAdress(val);
                      showModal();
                    }}
                  >
                    Chỉnh sửa
                  </Button>
                  <Button
                    type="link"
                    onClick={() => {
                      Axios.delete(
                        `https://hello-world-vuanhlk12.cloud.okteto.net/Address/DeleteAddress/${val.id}`
                      ).then((res) => {
                        window.location.reload();
                      });
                    }}
                  >
                    Xóa
                  </Button>
                </Col>
              </Row>
            </div>
          ))}
        </div>

        <NavLink to="/customer/add">
          <Row style={{ paddingTop: '10px' }}>
            <Form>
              <Form.Item>
                <Button style={{ width: '30px' }}>
                  <PlusOutlined />
                  Thêm địa chỉ
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </NavLink>
      </Content>

      <Modal
        title="Sửa thông tin"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          layout="horizontal"
          initialValues={{ size: 'default' }}
          size="large"
        >
          <Form.Item label="Họ và tên">
            <Input
              placeholder="Nhập Họ và tên"
              type="text"
              defaultValue={dataUser?.firstName + ' ' + dataUser.lastName}
              allowClear
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              placeholder="Nhập Số điện thoại"
              defaultValue={data?.Phone}
              allowClear
              onChange={onChangePhone}
            />
          </Form.Item>
          <Form.Item label="Tỉnh/Thành Phố">
          <Select
              placeholder="Chọn Tỉnh/Thành Phố"
              onSearch={onSearch}
              showSearch
              onChange={onChange}
              defaultValue={defaultValueCity}
              allowClear
            >
              {city &&
                city.map((item: any, idx: number) => {
                  return (
                    <Select.Option value={idx}>
                      {item?.city?.cityName}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Quận">
          <Select
              placeholder="Chọn Quận/Huyện"
              onSearch={onSearch}
              showSearch
              onChange={onChangeDistrict}
              defaultValue={defaultValueDistrict}
              allowClear
            >
              {district &&
                district.map((item: any, idx: number) => {
                  return (
                    <Select.Option value={item?.id}>
                      {item?.districtName}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              placeholder="Nhập Địa chỉ"
              allowClear
              defaultValue={data?.Address}
              onChange={onChangeAdress}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Adress;

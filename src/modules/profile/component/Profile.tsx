import { Button, Checkbox, DatePicker, Form, Input, Layout, Radio } from "antd";
import { getDataUser } from "../api/UserInfo";
import React, { useState } from "react";
// import { useParams } from "react-router-dom";
import "antd/dist/antd.css";
// import { some, SUCCESS_CODE } from "../../../constants/constants";
import JSONbig from "json-bigint";
import { ACCOUNTS, some } from "../../../constants/constants";
import moment, { Moment } from "moment";

const { Content } = Layout;
const Profile = () => {
  // let id:{} = useParams();
  // const [dataUser, setDataUser] = React.useState<any>();
  // console.log("id", id)
  // React.useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const res: some = await getDataUser(id.toString());
  //       if (res?.code === SUCCESS_CODE) {
  //         setDataUser(res);
  //       } else {
  //       }
  //     } catch (error) {}
  //   };
  //   fetchUserId();
  // }, [id]);
  // console.log("dataUser", dataUser);
  // React.useEffect(() => {
  //   const getData = async () => {
  //     const data: some = await getDataUser();
  //     console.log("data", data?.data);
  //     if (data !== undefined) {
  //       setDataUser(data);
  //     }
  //   };
  //   getData();
  // }, [id]);
  const [date, setDate] = useState(moment(new Date()));
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  const [value, setValue] = React.useState<any>(1);
  const onChange = (e: any) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  console.log("dt", dataUser);
  return (
    <Layout style={{ padding: "12px 12px 12px" }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: "default" }}
          // size="default"
        >
          <Form.Item label="Họ và tên">
            {dataUser?.firstName && (
              <Input
                defaultValue={dataUser?.firstName + " " + dataUser.lastName}
              ></Input>
            )}
          </Form.Item>
          <Form.Item label="Số điện thoại">
            {dataUser?.phone && <Input defaultValue={dataUser?.phone}></Input>}
          </Form.Item>
          <Form.Item label="Email">
            {dataUser?.email && <Input defaultValue={dataUser?.email}></Input>}
          </Form.Item>
          <Form.Item label="Giới tính">
            <Radio.Group onChange={onChange} defaultValue={dataUser.gender}>
              <Radio value="M">Nam</Radio>
              <Radio value="F">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <DatePicker
              defaultValue = {moment(dataUser.dateOfBirth)}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="primary" shape="round" size="large">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};
export default Profile;

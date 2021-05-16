import React from "react";
import { Descriptions, Row, Col, Button, Form } from "antd";
import "antd/dist/antd.css";
import { NavLink } from "react-router-dom";
import { getDataAdressUser } from "../api/AdressUser";
import { some, SUCCESS_CODE } from "../../../constants/constants";
import JSONbig from "json-bigint";
import { useState } from "react";
import { ACCOUNTS } from "../../../constants/constants";
import { PlusOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";

const Adress = (props: any) => {
  const [dataUser, setDataUser] = useState<some>(
    JSONbig.parse(localStorage.getItem(ACCOUNTS) || "{}")
  );
  console.log("113", dataUser.firstName);
  console.log(setDataUser);

  const [dataAdressUser, setDataAdressUser] = React.useState<any>();
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
  }, []);
  console.log("aaa", dataAdressUser);
  return (
    <Content
      style={{
        margin: "25px 25px",
        padding: "50px 50px",
        backgroundColor: "white",
        height: "500px",
      }}
    >
      {dataAdressUser?.message?.map((val: some, index: number) => (
        <div key={index}>
          <Row style={{ borderBottom: "1px solid" }}>
            <Col span={19}>
              <Descriptions
                layout="horizontal"
                title={dataUser?.firstName + " " + dataUser.lastName}
              >
                <Descriptions.Item label="Địa chỉ" span={12}>
                  {val?.district?.districtName + "/" + val?.city?.cityName}
                </Descriptions.Item>

                <Descriptions.Item label="Số điện thoại" span={12}>
                  {val?.phone}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col span={3}>
              <NavLink to="/customer/create">
                <Button type="link">Chỉnh sửa</Button>
              </NavLink>
            </Col>
          </Row>
        </div>
      ))}
      <NavLink to="/customer/add">
        <Row style={{ paddingTop: "10px" }}>
          <Form>
            <Form.Item>
              <Button type="dashed" size="large" style={{ width: "100%" }}>
                <PlusOutlined />
                Thêm địa chỉ
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </NavLink>
    </Content>
  );
};
export default Adress;

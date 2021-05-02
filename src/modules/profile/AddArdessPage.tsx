import SubMenu from "./component/Menu";
import AddAdress from "./component/AddAdress";
import { Row, Col } from "antd";

const AddAdressPage = () => {
  return (
    <>
      <Row>
        <Col span={3}>
          <SubMenu />
        </Col>
        <Col span={18} offset={2}>
          <AddAdress />
        </Col>
      </Row>
    </>
  );
};
export default AddAdressPage;

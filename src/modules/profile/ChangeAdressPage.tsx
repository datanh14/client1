import SubMenu from "./component/Menu";
import ChangeAdress from "./component/ChangeAdress";
import { Row, Col } from "antd";

const ChangeAdressPage = () => {
  return (
    <>
      <Row>
        <Col span={3}>
          <SubMenu />
        </Col>
        <Col span={18} offset={2}>
          <ChangeAdress />
        </Col>
      </Row>
    </>
  );
};
export default ChangeAdressPage;

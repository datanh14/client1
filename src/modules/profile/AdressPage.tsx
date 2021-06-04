import SubMenu from "./component/Menu";
import Adress from "./component/Adress";
import { Row, Col } from "antd";


const AdressPage = () => {
  return (
    <>
      <Row>
        <Col span={3}>
          <SubMenu />
        </Col>
        <Col span={18} offset={2}>
          <Row>
            <Adress />
          </Row>
        </Col>
      </Row>
    </>
  );
};
export default AdressPage;

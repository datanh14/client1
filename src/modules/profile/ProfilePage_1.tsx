import SubMenu from "./component/Menu";
import Profile from "./component/Profile";
import { Row, Col } from "antd";

const ProfilePage = () => {
  return (
    <>
      <Row>
        <Col span={3}>
          <SubMenu />
        </Col>
        <Col span={18} offset={2}>
          <Profile />
        </Col>
      </Row>
    </>
  );
};
export default ProfilePage;

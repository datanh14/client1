import SubMenu from "./component/Menu"
import PaymentCard from "./component/PaymentCard"
import {Row, Col, Button} from 'antd'
import { PlusOutlined } from "@ant-design/icons"
const PaymentCardPage = () => {
return(
    <>
    <Row>
        <Col span = {3}>
            <SubMenu/>
        </Col>
        <Col span = {18} offset = {2}>
           <Row>
           <PaymentCard/>
            </Row>
        </Col>
    </Row>

</>
)
}
export default PaymentCardPage;

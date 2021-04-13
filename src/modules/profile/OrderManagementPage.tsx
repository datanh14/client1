import SubMenu from "./component/Menu"
import OrderManagement from "./component/OrderManagement"
import {Row, Col} from 'antd'

const OrderManagementPage = ()=>{
    return(
        <>
            <Row>
                <Col span = {3}>
                    <SubMenu/>
                </Col>
                <Col span = {18} offset = {2}>
                    <OrderManagement/>
                </Col>
            </Row>
        </>
    )
}
export default OrderManagementPage;
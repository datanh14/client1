import SubMenu from "./component/Menu"
import Coupon from "./component/Coupon"
import {Row, Col} from 'antd'

const CouponPage = () =>{
    return(
        <>
            <Row>
                <Col span = {3}>
                    <SubMenu/>
                </Col>
                <Col span = {18} offset = {2}>
                    <Coupon/>
                </Col>
            </Row>
        </>
    )
}
export default CouponPage;
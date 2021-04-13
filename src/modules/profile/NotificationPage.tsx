import NotifiForm from "./component/Notification"
import SubMenu from "./component/Menu"
import {Row, Col} from 'antd'
const NotificationPage = ()=>{
    return(
        <>
            <Row>
                <Col span = {3}>
                    <SubMenu/>
                </Col>
                <Col span = {18} offset = {2}>
                    <NotifiForm/>
                </Col>
            </Row>
        </>
    )
}
export default NotificationPage
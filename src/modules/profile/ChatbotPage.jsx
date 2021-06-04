import SubMenu from "./component/Menu";
import Chatbot from "./component/Chatbot";
import { Row, Col } from "antd";
const ChatbotPage = () =>{
    return(
        <>
            <Row>
                <Col span = {3}>
                    <SubMenu/>
                </Col>
                <Col span = {18} offset = {2}>
                    <Chatbot/>
                </Col>
            </Row>
        </>
    )
}
export default ChatbotPage;
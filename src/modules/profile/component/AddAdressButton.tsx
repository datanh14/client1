import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const AddAdressButton = () => {
  return (
    <>
      <NavLink to="/customer/add">
        <Form>
          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: { span: 16, offset: 8 },
            }}
          >
            <Button type="dashed" size="large">
              <PlusOutlined />
              Thêm địa chỉ
            </Button>
          </Form.Item>
        </Form>
      </NavLink>
    </>
  );
};
export default AddAdressButton;

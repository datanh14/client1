import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const AddAdressButton = () => {
  return (
    <>
      <Button type="dashed" block size="large" style={{ width: "1000px" }}>
          <PlusOutlined />
          Thêm địa chỉ
      </Button>
    </>
  );
};
export default AddAdressButton;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      gender: '',
      age: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { name, gender, age } = steps;

    this.setState({ name, gender, age });
  }
  render() {
    const { name, gender, age } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Đánh giá người dùng</h3>
        <table>
          <tbody>
            <tr>
              <td style={{ fontWeight: 'bold', borderRight: '1px solid'}}>Họ tên</td>
              <td>{name.value}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold', borderRight: '1px solid'}}>Trải nghiệm</td>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td style={{fontWeight: 'bold', borderRight: '1px solid'}}> Ý kiến</td>
              <td>{age.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

const Chatbot_simple = () => {
 
  return (
    <div
      style={{
        margin: "25px 25px",
        padding: "50px 50px",
        backgroundColor: "white",
      }}
    >
      <ChatBot
      steps={[
        {
          id: "1",
          message: ` Xin chào, Tôi có thể giúp được gì`,
          trigger: "2",
        },
        {
          id: "2",
          options: [
            { value: 1, label: "Giới thiệu về Tiko Dut", trigger: "4" },
            { value: 2, label: "Bắt đầu bán hàng", trigger: "8" },
            { value: 3, label: "Phản hồi", trigger: "namein" },
          ],
        },
        {
          id: "8",
          message:
            "Các bước để trở thành người bán hàng: Đến mục thông tin tài khoản, chọn đăng ký cửa hàng, sau khi đăng ký cửa hàng, đăng nhập trang quản lý cửa hàng tại địa chỉ www.Tikodut_manager.com",
          trigger: "continue",
        },
        {
          id: "4",
          message:
            "Website thương mại điện tử Tiko Dut do 100% người Việt phát triển và vận hành, nhằm đem lại một nền tảng thương mại điện tử an toàn và dễ sử dụng cho người Việt",
          trigger: "continue",
        },
        {
          id: 'namein',
          message: 'Nhận tên của bạn.',
          trigger: 'name',
        },
        {
          id: 'name',
          user: true,
          trigger: '3',
        },
        {
          id: '3',
          message: 'Chào {previousValue}! Trải nghiệm của bạn với website thế nào?',
          trigger: 'gender',
        },
        {
          id: 'gender',
          options: [
            { value: 'Rất hài lòng', label: 'Rất hài lòng', trigger: '5' },
            { value: 'Hài lòng', label: 'Hài lòng', trigger: '5' },
            { value: 'Bình thường', label: 'Bình thường', trigger: '5' },
            { value: 'Không hài lòng', label: 'Không hài lòng', trigger: '5' },
            { value: 'Tồi tệ', label: 'Tồi tệ', trigger: '5' },
          ],
        },
        {
          id: '5',
          message: 'Ý kiến đóng góp cụ thể',
          trigger: 'age',
        },
        {
          id: 'age',
          user: true,
          trigger: '7',
        },
        {
          id: '7',
          message: 'Cảm ơn! Vui lòng kiểm tra phản hồi của bạn',
          trigger: 'review',
        },
        {
          id: 'review',
          component: <Review />,
          asMessage: true,
          trigger: 'update',
        },
        {
          id: 'update',
          message: 'Bạn có muốn sửa phản hồi?',
          trigger: 'update-question',
        },
        {
          id: 'update-question',
          options: [
            { value: 'yes', label: 'Có', trigger: 'update-yes' },
            { value: 'no', label: 'Không và gửi phản hồi', trigger: 'end-message' },
          ],
        },
        {
          id: 'update-yes',
          message: 'Bạn muốn sửa mục nào?',
          trigger: 'update-fields',
        },
        {
          id: 'update-fields',
          options: [
            { value: 'name', label: 'Họ và Tên', trigger: 'update-name' },
            { value: 'gender', label: 'Trải nghiệm', trigger: 'update-gender' },
            { value: 'age', label: 'Ý kiến đóng góp', trigger: 'update-age' },
          ],
        },
        {
          id: 'update-name',
          update: 'name',
          trigger: '7',
        },
        {
          id: 'update-gender',
          update: 'gender',
          trigger: '7',
        },
        {
          id: 'update-age',
          update: 'age',
          trigger: '7',
        },
        {
          id: 'end-message',
          message: 'Cảm ơn bạn, phản hồi đã được gửi',
          trigger:'continue',
        },
        {
          id: "continue",
          message: `Tôi có thể giúp được gì`,
          trigger: "continue2",
        },
        {
          id: "continue2",
          options: [
            { value: 1, label: "Giới thiệu về Tiko Dut", trigger: "4" },
            { value: 2, label: "Bắt đầu bán hàng", trigger: "8" },
            { value: 3, label: "Phản hồi", trigger: "namein" },
            { value: 4, label: "Không cần hỗ trợ", trigger: "end" },

          ],
        },
        {
          id: "end",
          message: `Cảm ơn bạn đã sửa dụng dịch vụ của chúng tôi.`,
          end: true,
        },
      ]}
        style={{ margin: "10px 10px", minWidth: "700px" }}
      />
    </div>
  );
};
export default Chatbot_simple;
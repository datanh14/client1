import React from 'react'
import { List } from 'antd';
import "antd/dist/antd.css"
const data = [
    {
        title: 'Đơn hàng #458074316 đã sẵn sàng để giao đến quý khách. Chúng tôi vừa bàn giao đơn hàng của quý khách đến đối tác vận chuyển Tiki Team. Đơn hàng sẽ được giao trước 23:59 ngày 07/12/2020',
    },
    {
        title: 'Hãy thay đổi mật khẩu thường xuyên để nâng cao bảo mật. Ngoài ra: 1) Không nên sử dụng chung mật khẩu của email với mật khẩu của các tài khoản khác. 2) Luôn đăng xuất khỏi các tài khoản sau khi sử dụng trên thiết bị công cộng hoặc thiết bị không phải của bản thân.',
    },
    {
        title: 'Nhập mã TIKIANKER giảm thêm 20% cho phụ kiện Anker. Thời gian áp dụng từ 06 - 13/9',
    },
    {
        title: 'Nhập mã SIEUHOTT8 - Giảm 50K cho ĐH từ 500K cho SP thuộc ngành Điện Gia Dụng, Nhà Cửa Đời Sống, Thể Thao Dã Ngoại, Xe Máy (Tiki Trading).',
    },
];
const NotifiForm = () => {
    return (
        <List
            size = "default"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={item => (
                <List.Item actions={[<a href="google.com" key="list-loadmore-edit">Đánh giấu đã đọc</a>, <a href="google.com" key="list-loadmore-more">Xóa</a>]}>
                    <List.Item.Meta
                        title={<a href="google.com">{item?.title}</a>}
                        description="Thông báo từ tiki tranding"
                    />
                </List.Item>
            )}
            
        />
    )
}
export default NotifiForm;
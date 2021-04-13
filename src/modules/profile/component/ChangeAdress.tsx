import React from 'react'
import "antd/dist/antd.css"
import {
    Form,
    Input,
    Cascader,
    Button
} from 'antd';
const options = [
    {
        value: 'Hà Nội',
        label: 'Hà Nội',
        children: [
            {
                value: 'Cầu Giấy',
                label: 'Cầu Giấy',
                children: [
                    {
                        value: 'Mai Dịch',
                        label: 'Mai Dịch',
                    },
                ],
            },
        ],
    },
    {
        value: 'TP Hồ Chí Minh',
        label: 'TP Hồ Chí Minh',
        children: [
            {
                value: 'Quận 1',
                label: 'Quận 1',
                children: [
                    {
                        value: 'Liên Hà',
                        label: 'Liên Hà',
                    },
                ],
            },
        ],
    },
];

function onChange() {
    console.log("hh");
}
const ChangeAdress = () => {
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: "default" }}
            size="large"

        >
            <Form.Item label="Họ và tên">
                <Input placeholder="Nhập Họ và tên" />
            </Form.Item>
            <Form.Item label="Số điện thoại">
                <Input placeholder="Nhập Số điện thoại"/>
            </Form.Item>
            <Form.Item label="Công ty">
                <Input placeholder="Nhập Công ty"/>
            </Form.Item>
            <Form.Item label="Tỉnh/Thành Phố">
                <Cascader options={options} onChange={onChange} placeholder="Chọn Thành phố/Tỉnh" />
            </Form.Item>
            <Form.Item label="Quận">
                <Cascader options={options} onChange={onChange} placeholder="Chọn Quận/Huyện" />
            </Form.Item>
            <Form.Item label="Phường xã">
                <Cascader options={options} onChange={onChange} placeholder="chọn Phường/Xã" />
            </Form.Item>
            <Form.Item label="Địa chỉ">
                <Input placeholder="Nhập Địa chỉ"/>
            </Form.Item>
            <Form.Item label="Email">
                <Input placeholder="Nhập Email"/>
            </Form.Item>
            <Form.Item style={{ paddingLeft: 200 }}>
                <Button type="primary" shape="round" size='large'>
                    Xác nhận
                </Button>
            </Form.Item>
        </Form>
    )
}
export default ChangeAdress;
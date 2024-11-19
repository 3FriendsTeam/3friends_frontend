import { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

// Hàm lấy thông tin nhân viên từ localStorage
const getLoggedInEmployee = () => {
    const employeeData = localStorage.getItem('employee');
    if (employeeData) {
        const employee = JSON.parse(employeeData);
        return employee?.data || null;
    }
    return null;
};

// Hàm lấy tên chức vụ từ PositionID
const getPositionName = async (PositionID) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/positions`
        );
        const position = response.data.find(
            (p) => p.id === parseInt(PositionID, 10)
        );
        return position ? position.PositionName : 'Chưa xác định';
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu chức vụ:', error);
        return 'Chưa xác định';
    }
};

const AccountInfo = () => {
    const [employee, setEmployee] = useState(null);
    const [positionName, setPositionName] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [passwordForm] = Form.useForm();

    // Lấy thông tin nhân viên và tên chức vụ
    useEffect(() => {
        const loggedInEmployee = getLoggedInEmployee();
        if (loggedInEmployee) {
            setEmployee(loggedInEmployee);
            if (loggedInEmployee.PositionID) {
                getPositionName(loggedInEmployee.PositionID).then((name) =>
                    setPositionName(name)
                );
            }
        }
    }, []);

    // Hiển thị modal đổi mật khẩu
    const showModal = () => setIsModalVisible(true);
    const handleCancel = () => setIsModalVisible(false);

    // Xử lý đổi mật khẩu
    const handlePasswordChange = async (values) => {
        if (!employee || !employee.id) {
            message.error('Không thể xác định người dùng đang đăng nhập.');
            return;
        }

        try {
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-password`,
                {
                    id: employee.id,
                    oldPassword: values.oldPassword,
                    password: values.newPassword,
                }
            );
            if (response.status === 200) {
                message.success('Đổi mật khẩu thành công!');
                setIsModalVisible(false);
                passwordForm.resetFields();
            }
        } catch (error) {
            if (error.response?.status === 401) {
                message.error('Mật khẩu cũ không đúng!');
            } else if (error.response?.status === 404) {
                message.error('Người dùng không tồn tại!');
            } else {
                message.error('Không thể đổi mật khẩu. Vui lòng thử lại!');
            }
            console.error(error);
        }
    };

    if (!employee) {
        return <p className="text-center text-gray-500">Đang tải thông tin tài khoản...</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-5">Thông Tin Tài Khoản</h2>
            <div className="grid grid-cols-2 gap-4 text-gray-700">
                <p>
                    <span className="font-semibold">Họ và tên:</span> {employee.FullName}
                </p>
                <p>
                    <span className="font-semibold">Tên đăng nhập:</span> {employee.Username}
                </p>
                <p>
                    <span className="font-semibold">Chức vụ:</span> {positionName}
                </p>
                <p>
                    <span className="font-semibold">Ngày sinh:</span>{' '}
                    {employee.DateOfBirth
                        ? new Date(employee.DateOfBirth).toLocaleDateString()
                        : 'Chưa cập nhật'}
                </p>
                <p>
                    <span className="font-semibold">Giới tính:</span> {employee.Gender || 'Chưa cập nhật'}
                </p>
                <p>
                    <span className="font-semibold">Địa chỉ:</span> {employee.Address || 'Chưa cập nhật'}
                </p>
                <p>
                    <span className="font-semibold">Email:</span> {employee.Email || 'Chưa cập nhật'}
                </p>
                <p>
                    <span className="font-semibold">Số điện thoại:</span> {employee.PhoneNumber || 'Chưa cập nhật'}
                </p>
                <p>
                    <span className="font-semibold">Trạng thái:</span>{' '}
                    {employee.IsActive ? 'Hoạt động' : 'Ngưng hoạt động'}
                </p>
            </div>
            <div className="mt-6 text-right">
                <button
                    onClick={showModal}
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                >
                    Đổi mật khẩu
                </button>
            </div>

            {/* Modal đổi mật khẩu */}
            <Modal
                title={<span className="text-lg font-semibold">Đổi mật khẩu</span>}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                className="rounded-lg"
            >
                <Form
                    form={passwordForm}
                    layout="vertical"
                    onFinish={handlePasswordChange}
                    className="space-y-4"
                >
                    <Form.Item
                        label={<span className="font-medium">Mật khẩu cũ</span>}
                        name="oldPassword"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu cũ!' }]}
                    >
                        <Input.Password className="rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Mật khẩu mới</span>}
                        name="newPassword"
                        rules={[
                            { required: true, message: 'Vui lòng nhập mật khẩu mới!' },
                            { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự!' },
                        ]}
                    >
                        <Input.Password className="rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Xác nhận mật khẩu mới</span>}
                        name="confirmPassword"
                        dependencies={['newPassword']}
                        rules={[
                            { required: true, message: 'Vui lòng xác nhận mật khẩu mới!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('newPassword') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Mật khẩu không khớp!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password className="rounded-lg" />
                    </Form.Item>
                    <Form.Item>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                        >
                            Cập nhật mật khẩu
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AccountInfo;

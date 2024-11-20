import { useState, useEffect } from 'react';
import { Modal, Form, Input, message, Select } from 'antd';
import axios from 'axios';
import 'tailwindcss/tailwind.css';
import { getEmployeeLogin, getPositionName } from '../../../../helper/Admin/getInfoAdmin';

const AccountInfo = () => {
    const [employee, setEmployee] = useState(null);
    const [positionName, setPositionName] = useState('');
    const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [passwordForm] = Form.useForm();
    const [editForm] = Form.useForm();

    // Lấy dữ liệu nhân viên
    useEffect(() => {
        try {
            const loggedInEmployee = getEmployeeLogin();
            if (loggedInEmployee) {
                setEmployee(loggedInEmployee.data);
                const position = getPositionName() || "Vị trí không xác định";
                setPositionName(position);
            } else {
                console.warn("Không tìm thấy dữ liệu nhân viên");
            }
        } catch {
            message.error("Không tìm thấy dữ liệu nhân viên.");
        }
    }, []);

    // Cập nhật giá trị form khi employee hoặc editForm thay đổi
    useEffect(() => {
        if (employee) {
            editForm.setFieldsValue(employee);
        }
    }, [employee, editForm]);

    const showPasswordModal = () => setIsPasswordModalVisible(true);
    const handlePasswordCancel = () => setIsPasswordModalVisible(false);

    const showEditModal = () => setIsEditModalVisible(true);
    const handleEditCancel = () => setIsEditModalVisible(false);

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
                setIsPasswordModalVisible(false);
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

    const handleEditSubmit = async () => {
        if (!employee || !employee.id) {
            message.error('Không thể xác định người dùng đang đăng nhập.');
            return;
        }
        try {
            const values = editForm.getFieldsValue();
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-employee`,
                { id: employee.id, values }
            );
            if (response.status === 200) {
                message.success('Cập nhật thông tin thành công!');
                setIsEditModalVisible(false);
                const newEmployee = { ...employee, ...values };
                setEmployee(newEmployee);
                localStorage.setItem('employee', JSON.stringify(newEmployee));
            }
        } catch (error) {
            message.error('Không thể cập nhật thông tin. Vui lòng thử lại!');
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
            <div className="mt-6 flex justify-end space-x-4">
                <button
                    onClick={showEditModal}
                    className="px-6 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                >
                    Chỉnh sửa thông tin
                </button>
                <button
                    onClick={showPasswordModal}
                    className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                >
                    Đổi mật khẩu
                </button>
            </div>

            {/* Modal Đổi Mật Khẩu */}
            <Modal
                title={<span className="text-lg font-semibold">Đổi mật khẩu</span>}
                open={isPasswordModalVisible}
                onCancel={handlePasswordCancel}
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

            {/* Modal Chỉnh Sửa Thông Tin */}
            <Modal
                title={<span className="text-lg font-semibold">Chỉnh sửa thông tin</span>}
                open={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={null}
                className="rounded-lg"
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleEditSubmit}
                    className="space-y-4"
                >
                    <Form.Item
                        label={<span className="font-medium">Họ và tên</span>}
                        name="FullName"
                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                        <Input className="rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Ngày sinh</span>}
                        name="DateOfBirth"
                    >
                        <Input type="date" className="rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Giới tính</span>}
                        name="Gender"
                    >
                        <Select className="rounded-lg">
                            <Select.Option value="Nam">Nam</Select.Option>
                            <Select.Option value="Nữ">Nữ</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Địa chỉ</span>}
                        name="Address"
                    >
                        <Input className="rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Email</span>}
                        name="Email"
                        rules={[
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input className="rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        label={<span className="font-medium">Số điện thoại</span>}
                        name="PhoneNumber"
                        rules={[
                            { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' },
                        ]}
                    >
                        <Input className="rounded-lg" />
                    </Form.Item>
                    <Form.Item>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                        >
                            Cập nhật thông tin
                        </button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AccountInfo;

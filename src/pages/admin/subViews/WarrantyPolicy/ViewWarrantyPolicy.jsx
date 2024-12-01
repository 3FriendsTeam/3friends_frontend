import { useState, useEffect } from "react";
import {
    Table,
    Input,
    Button,
    message,
    Spin,
    Modal,
    Form,
    Space,
} from "antd";
import axios from "axios";


const ViewWarrantyPolicy = () => {
    const [warranties, setWarranties] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // Dùng cho Modal thêm chính sách
    const [isEditModalVisible, setIsEditModalVisible] = useState(false); // Dùng cho Modal sửa
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false); // Dùng cho Modal chi tiết
    const [form] = Form.useForm();
    const [editingWarranty, setEditingWarranty] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [policyContent, setPolicyContent] = useState("");

    // Lọc danh sách nhà cung cấp theo từ khóa tìm kiếm
    const filteredSuppliers = warranties.filter((warranties) =>
        warranties.WarrantyConditions.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Fetch danh sách nhà cung cấp
    const fetchWarranties = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/warranty-policies`);
            setWarranties(
                response.data.map((warranty) => ({
                    key: warranty.WarrantyPolicyID,
                    ...warranty,
                }))
            );
        } catch (error) {
            console.error("Lỗi khi tải danh sách nhà cung cấp:", error);
            message.error("Không thể tải danh sách nhà cung cấp. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWarranties();
    }, []);


    const reloadWarranties = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/warranty-policies`)
            setWarranties(response.data.map((warranties, index) => ({ key: index, ...warranties })))
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error)
            message.error("Không thể tải danh sách nhân viên. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    };


    const showAddModal = () => {
        form.resetFields();
        setIsModalVisible(true);
    };


    const handleAddCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleAddWarranty = async () => {
        try {
            setLoading(true);
            const newWarranty = form.getFieldsValue();
            const warrantyData = {
                ...newWarranty,
            };

            console.log("Dữ liệu gửi lên API:", warrantyData);

            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create-warranty-policies`, warrantyData);
            message.success("Thêm chính sách thành công!");
            handleAddCancel();
            reloadWarranties();
        } catch (error) {
            console.error("Lỗi khi thêm chính sách:", error.response?.data || error);
            message.error(error.response?.data?.message || "Không thể chính sách. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };



    // Hàm mở modal chỉnh sửa
    const showEditModal = (warranty) => {
        setEditingWarranty(warranty);

        // Đặt giá trị form chỉnh sửa
        form.setFieldsValue({
            WarrantyProvider: warranty.WarrantyProvider,
            WarrantyConditions: warranty.WarrantyConditions,
            PolicyContent: warranty.PolicyContent,
        });

        setIsEditModalVisible(true);
    };

    // Hàm đóng modal chỉnh sửa
    const handleEditCancel = () => {
        setEditingWarranty(null);
        setIsEditModalVisible(false);
        form.resetFields();
    };

    const handleEditSupplier = async () => {
        try {
            setLoading(true);
            const updatedWarranty = form.getFieldsValue();
            const warrantyData = {
                ...updatedWarranty,
            };
            console.log("Payload gửi lên API:", warrantyData);
            console.log("ID:", editingWarranty.id);

            await axios.patch(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-warranty-policies?id=${editingWarranty.id}`,
                warrantyData
            );

            message.success("Cập nhật thông tin chính sách thành công!");
            handleEditCancel();
            reloadWarranties();
        } catch (error) {
            console.error("Lỗi khi cập nhật chính sách:", error);
            message.error("Không thể cập nhật chính sách. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    };

    // Hàm hiển thị Modal
    const showDetailModal = (warranty) => {
        setPolicyContent(warranty.PolicyContent); // Lấy nội dung chính sách
        setIsDetailModalVisible(true); // Hiển thị Modal
    };

    // Hàm đóng Modal
    const handleCloseModal = () => {
        setIsDetailModalVisible(false); // Ẩn Modal
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Nhà cung cấp bảo hành",
            dataIndex: "WarrantyProvider",
            key: "WarrantyProvider",
        },
        {
            title: "Điều kiện bảo hành",
            dataIndex: "WarrantyConditions",
            key: "WarrantyConditions",
        },
        {
            title: "Nội dung chính sách",
            dataIndex: "PolicyContent",
            key: "PolicyContent",
            render: (text) => {
                const maxLength = 50; // Số ký tự tối đa hiển thị
                return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (_, warranty) => (
                <Space>
                    <Button
                        type="link"
                        onClick={() => showDetailModal(warranty)}
                        className="text-green-700 font-bold"
                    >
                        Chi tiết nội dung
                    </Button>
                    <Button
                        type="link"
                        onClick={() => showEditModal(warranty)}
                        className="text-blue-600 font-bold"
                    >
                        Sửa
                    </Button>
                </Space>
            ),
        }

    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách chính sách</h1>
            <Input
                placeholder="Tìm kiếm nhà cung cấp..."
                className="mb-4"
                style={{ width: "300px", height: "40px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="primary" onClick={showAddModal} className="ml-4">
                + Thêm chính sách
            </Button>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredSuppliers}
                    pagination={{ pageSize: 5, showSizeChanger: false }}
                />
            )}

            <Modal
                title="Thêm nhà cung cấp"
                visible={isModalVisible}
                onCancel={handleAddCancel}
                width={570}
                footer={[
                    <Button key="cancel" onClick={handleAddCancel}>
                        Hủy
                    </Button>,
                    <Button key="add" type="primary" onClick={handleAddWarranty}>
                        Thêm
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="WarrantyProvider"
                        label="Nhà cung cấp bảo hành"
                        rules={[{ required: true, message: "Vui lòng nhập nhà cung cấp bảo hành!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="WarrantyConditions"
                        label="Điều kiện bảo hành"
                        rules={[{ required: true, message: "Vui lòng nhập điều kiện bảo hành!" }]}                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="PolicyContent"
                        label="Nội dung chính sách"
                        rules={[{ required: true, message: "Vui lòng nội dung chính sách!" }]}
                    >
                        <Input.TextArea rows={10} placeholder="Nhập nội dung chính sách" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal sửa nhà cung cấp */}
            <Modal
                title="Sửa thông tin nhà cung cấp"
                open={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="cancel" onClick={handleEditCancel}>
                        Hủy
                    </Button>,
                    <Button key="save" type="primary" onClick={handleEditSupplier}>
                        Lưu
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="WarrantyProvider"
                        label="Nhà cung cấp bảo hành"
                        rules={[{ required: true, message: "Vui lòng nhập nhà cung cấp bảo hành!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="WarrantyConditions"
                        label="Điều kiện bảo hành"
                        rules={[{ required: true, message: "Vui lòng nhập điều kiện bảo hành!" }]}                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="PolicyContent"
                        label="Nội dung chính sách"
                        rules={[{ required: true, message: "Vui lòng nội dung chính sách!" }]}
                    >
                        <Input.TextArea rows={6} placeholder="Nhập nội dung chính sách" />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal hiển thị nội dung chính sách */}
            <Modal
                title="Chi tiết nội dung chính sách"
                visible={isDetailModalVisible} // Sử dụng state riêng biệt
                onCancel={handleCloseModal}
                width={600}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
                <p>{policyContent}</p>
            </Modal>

        </div>
    );
};

export default ViewWarrantyPolicy;

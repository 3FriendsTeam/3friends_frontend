import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Modal, Form, Upload, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const ViewPromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [editingPromotion, setEditingPromotion] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch danh sách khuyến mãi
    useEffect(() => {
        const fetchPromotions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/promotions-by-id`);
                setPromotions(response.data.map((promotion, index) => ({ key: index, ...promotion })));
            } catch (error) {
                console.error("Lỗi khi tải danh sách khuyến mãi:", error);
                message.error("Không thể tải danh sách khuyến mãi. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    // Lọc khuyến mãi theo từ khóa tìm kiếm
    const filteredPromotions = promotions.filter((promotion) =>
        promotion.PromotionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Xử lý xóa khuyến mãi
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/delete-promotion/${id}`);
            setPromotions((prev) => prev.filter((promotion) => promotion.id !== id));
            message.success("Xóa khuyến mãi thành công.");
        } catch (error) {
            console.error("Lỗi khi xóa khuyến mãi:", error);
            message.error("Không thể xóa khuyến mãi. Vui lòng thử lại.");
        }
    };

    // Mở modal chỉnh sửa
    const showEditModal = (promotion) => {
        setEditingPromotion(promotion);
        setIsEditModalVisible(true);
        form.setFieldsValue(promotion);
    };

    // Đóng modal chỉnh sửa
    const handleEditCancel = () => {
        setEditingPromotion(null);
        setIsEditModalVisible(false);
        form.resetFields();
    };

    // Lưu chỉnh sửa
    const handleEditSave = async () => {
        try {
            const updatedPromotion = form.getFieldsValue();
            await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/update-promotion/${editingPromotion.id}`, updatedPromotion);
            setPromotions((prev) =>
                prev.map((promotion) =>
                    promotion.id === editingPromotion.id ? { ...promotion, ...updatedPromotion } : promotion
                )
            );
            message.success("Cập nhật khuyến mãi thành công.");
            handleEditCancel();
        } catch (error) {
            console.error("Lỗi khi cập nhật khuyến mãi:", error);
            message.error("Không thể cập nhật khuyến mãi. Vui lòng thử lại.");
        }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Hình ảnh",
            dataIndex: "ImgProfile",
            key: "ImgProfile",
            render: (ImgProfile) =>
                ImgProfile ? <img src={ImgProfile} alt="Hình ảnh" style={{ width: 50, height: 50 }} /> : "Chưa có",
        },
        {
            title: "Tên khuyến mãi",
            dataIndex: "PromotionName",
            key: "PromotionName",
            render: (name) => name || "Chưa cập nhật",
        },
        {
            title: "Giá trị giảm",
            dataIndex: "DiscountValue",
            key: "DiscountValue",
            render: (value) => (value ? `${value}%` : "Chưa cập nhật"),
        },
        {
            title: "Số lượng",
            dataIndex: "Quantity",
            key: "Quantity",
            render: (quantity) => quantity || "Chưa cập nhật",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "StartDate",
            key: "StartDate",
            render: (date) => date || "Chưa cập nhật",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "EndDate",
            key: "EndDate",
            render: (date) => date || "Chưa cập nhật",
        },
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => showEditModal(record)}
                        className="text-blue-600 font-bold mx-1 bg-blue-100"
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa khuyến mãi này không?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Có"
                        cancelText="Không"
                    >
                        <Button type="link" className="text-red-600 font-bold mx-1">
                            Xóa
                        </Button>
                    </Popconfirm>
                </>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Danh sách khuyến mãi</h1>
            <Input
                placeholder="Tìm kiếm khuyến mãi..."
                className="mb-4"
                style={{ width: "300px", height: "40px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin size="large" />
                </div>
            ) : (
                <Table
                    columns={columns}
                    dataSource={filteredPromotions}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                    }}
                />
            )}

            {/* Modal chỉnh sửa khuyến mãi */}
            <Modal
                title="Sửa khuyến mãi"
                centered
                visible={isEditModalVisible}
                onOk={handleEditSave}
                onCancel={handleEditCancel}
                width={500}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="PromotionName"
                        label="Tên khuyến mãi"
                        rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi!" }]}
                    >
                        <Input placeholder="Nhập tên khuyến mãi" />
                    </Form.Item>
                    <Form.Item name="ImgProfile" label="Hình ảnh">
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={true}
                            action={`${import.meta.env.VITE_BACKEND_URL}/api/upload-promotion-image`}
                            maxCount={1}
                            onChange={(info) => {
                                if (info.file.status === "done") {
                                    form.setFieldsValue({ ImgProfile: info.file.response.url });
                                    message.success("Tải ảnh lên thành công!");
                                } else if (info.file.status === "error") {
                                    message.error("Tải ảnh lên thất bại. Vui lòng thử lại.");
                                }
                            }}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên</div>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name="DiscountValue"
                        label="Giá trị giảm (%)"
                        rules={[{ required: true, message: "Vui lòng nhập giá trị giảm!" }]}
                    >
                        <Input type="number" placeholder="Nhập giá trị giảm" />
                    </Form.Item>
                    <Form.Item
                        name="Quantity"
                        label="Số lượng"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
                    >
                        <Input type="number" placeholder="Nhập số lượng" />
                    </Form.Item>
                    <Form.Item
                        name="StartDate"
                        label="Ngày bắt đầu"
                        rules={[{ required: true, message: "Vui lòng nhập ngày bắt đầu!" }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item
                        name="EndDate"
                        label="Ngày kết thúc"
                        rules={[{ required: true, message: "Vui lòng nhập ngày kết thúc!" }]}
                    >
                        <Input type="date" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ViewPromotion;

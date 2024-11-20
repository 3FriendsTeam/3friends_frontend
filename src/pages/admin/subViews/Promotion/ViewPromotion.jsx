import { useState, useEffect } from "react";
import { Table, Input, Button, Popconfirm, message, Modal, Form, Spin, Descriptions, DatePicker } from "antd";
import axios from "axios";
import { getEmployeeName } from "../../../../helper/Admin/getInfoAdmin";

const ViewPromotion = () => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [setIsEditModalVisible] = useState(false);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [addForm] = Form.useForm();
    const [setEditingPromotion] = useState(null);
    const [viewingPromotion, setViewingPromotion] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const nameAdmin = getEmployeeName();

    // Fetch danh sách khuyến mãi
    useEffect(() => {
        const fetchPromotions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-promotion`);
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

    const reloadPromotions = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-all-promotion`)
            setPromotions(response.data.map((promotions, index) => ({ key: index, ...promotions })))
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error)
            message.error("Không thể tải danh sách khuyến mãi. Vui lòng thử lại sau.")
        } finally {
            setLoading(false)
        }
    };

    // Lọc khuyến mãi theo từ khóa tìm kiếm
    const filteredPromotions = promotions.filter((promotion) =>
        promotion.PromotionName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mở modal xem chi tiết
    const showDetailModal = (promotion) => {
        setViewingPromotion(promotion);
        setIsDetailModalVisible(true);
    };

    // Đóng modal xem chi tiết
    const handleDetailCancel = () => {
        setViewingPromotion(null);
        setIsDetailModalVisible(false);
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

    // Mở modal thêm khuyến mãi
    const showAddModal = () => {
        setIsAddModalVisible(true);
    };

    // Đóng modal thêm khuyến mãi
    const handleAddCancel = () => {
        setIsAddModalVisible(false);
        addForm.resetFields();
    };

    // Lưu khuyến mãi mới
    const handleAddPromotion = async () => {
        try {
            const values = await addForm.validateFields();
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create-promotion`, {
                ...values,
                StartDate: values.StartDate.format("YYYY-MM-DD"),
                EndDate: values.EndDate.format("YYYY-MM-DD"),
                nameAdmin,
            });

            message.success("Thêm khuyến mãi thành công!");
            setIsAddModalVisible(false);
            addForm.resetFields();

            // Cập nhật danh sách khuyến mãi
            reloadPromotions();
        } catch (error) {
            console.error("Lỗi khi thêm khuyến mãi:", error);
            message.error("Không thể thêm khuyến mãi. Vui lòng thử lại.");
        }
    };

    //Hàm xóa khuyến mãi
    const handleDelete = async (id) => {
        console.log("Deleting promotion with id:", id); // Log để kiểm tra id
        try {
            await axios.delete(
                `${import.meta.env.VITE_BACKEND_URL}/api/delete-promotion`, 
                { params: { id } }
            );
            console.log("đã thực hiện xóa");
            setPromotions((prev) => prev.filter((promotion) => promotion.id !== id));
            message.success("Xóa khuyến mãi thành công.");
        } catch (error) {
            console.error("Lỗi khi xóa khuyến mãi:", error);
            message.error(error.response?.data?.error || "Không thể xóa khuyến mãi. Vui lòng thử lại.");
        }
    };



    // Cột trong bảng
    const columns = [
        {
            title: "STT",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => index + 1,
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
            render: (quantity) => quantity === 0 ? "Đã hết" : quantity || "Chưa cập nhật",
        },
        {
            title: "Ngày bắt đầu",
            dataIndex: "StartDate",
            key: "StartDate",
            render: (StartDate) =>
                StartDate ? new Date(StartDate).toLocaleDateString() : "Chưa cập nhật",
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "EndDate",
            key: "EndDate",
            render: (EndDate) => {
                const endDate = new Date(EndDate);
                const now = new Date();
                return endDate < now
                    ? "Đã kết thúc"
                    : endDate ? endDate.toLocaleDateString() : "Chưa cập nhật";
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <>
                    <Button
                        type="primary"
                        onClick={() => showDetailModal(record)}
                        className="text-blue-600 font-bold mx-1 bg-blue-100"
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => showEditModal(record)}
                        onCancel={handleEditCancel}
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
            <Button type="primary" onClick={showAddModal} className="ml-10">
                Thêm khuyến mãi
            </Button>
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

            {/* Modal xem chi tiết khuyến mãi */}
            <Modal
                title="Chi tiết khuyến mãi"
                centered
                visible={isDetailModalVisible}
                onCancel={handleDetailCancel}
                footer={null}
                width={700}
            >
                {viewingPromotion && (
                    <Descriptions
                        bordered
                        column={2}
                        className="custom-descriptions"
                    >
                        <Descriptions.Item label={<strong>Tên khuyến mãi</strong>}>
                            {viewingPromotion.PromotionName || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Giá trị giảm</strong>}>
                            {viewingPromotion.DiscountValue ? `${viewingPromotion.DiscountValue}%` : "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Mã khuyến mãi</strong>}>
                            {viewingPromotion.Code || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Giảm giá tối đa</strong>}>
                            {viewingPromotion.MaxDiscount || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Số lượng</strong>}>
                            {viewingPromotion.Quantity || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Giá trị tối thiểu</strong>}>
                            {viewingPromotion.MinValue || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Ngày bắt đầu</strong>}>
                            {viewingPromotion.StartDate
                                ? new Date(viewingPromotion.StartDate).toLocaleDateString()
                                : "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Tạo bởi</strong>}>
                            {viewingPromotion.CreatedBy || "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Ngày kết thúc</strong>}>
                            {viewingPromotion.EndDate
                                ? new Date(viewingPromotion.EndDate).toLocaleDateString()
                                : "Chưa cập nhật"}
                        </Descriptions.Item>
                        <Descriptions.Item label={<strong>Xóa bởi</strong>}>
                            {viewingPromotion.DeletedBy || "Chưa cập nhật"}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            {/* Modal thêm khuyến mãi */}
            <Modal
                title="Thêm Khuyến Mãi"
                centered
                visible={isAddModalVisible}
                onCancel={handleAddCancel}
                footer={null}
                width={700}
            >
                <Form form={addForm} layout="vertical">
                    <Form.Item
                        name="PromotionName"
                        label="Tên khuyến mãi"
                        rules={[{ required: true, message: "Vui lòng nhập tên khuyến mãi!" }]}
                    >
                        <Input placeholder="Nhập tên khuyến mãi" />
                    </Form.Item>
                    <Form.Item
                        name="DiscountValue"
                        label="Giá trị giảm (%)"
                        rules={[{ required: true, message: "Vui lòng nhập giá trị giảm!" }]}
                    >
                        <Input type="number" placeholder="Nhập giá trị giảm" />
                    </Form.Item>
                    <Form.Item
                        name="Code"
                        label="Mã khuyến mãi"
                        rules={[{ required: true, message: "Vui lòng nhập mã khuyến mãi!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Quantity"
                        label="Số lượng"
                        rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
                    >
                        <Input type="number" placeholder="Nhập số lượng" />
                    </Form.Item>
                    <Form.Item
                        name="MinValue"
                        label="Giá trị tối thiểu (VND)"
                        rules={[{ required: true, message: "Vui lòng nhập giá trị tối thiểu!" }]}
                    >
                        <Input type="number" placeholder="Nhập giá trị tối thiểu" />
                    </Form.Item>
                    <Form.Item
                        name="MaxDiscount"
                        label="Giảm giá tối đa (VND)"
                        rules={[{ required: true, message: "Vui lòng nhập giá trị giảm giá tối đa!" }]}
                    >
                        <Input type="number" placeholder="Nhập giá trị giảm giá tối đa" />
                    </Form.Item>
                    <Form.Item
                        name="StartDate"
                        label="Ngày bắt đầu"
                        rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
                    >
                        <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày bắt đầu" />
                    </Form.Item>
                    <Form.Item
                        name="EndDate"
                        label="Ngày kết thúc"
                        rules={[{ required: true, message: "Vui lòng chọn ngày kết thúc!" }]}
                    >
                        <DatePicker style={{ width: "100%" }} placeholder="Chọn ngày kết thúc" />
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={handleAddCancel} style={{ marginRight: 8 }}>
                            Hủy
                        </Button>
                        <Button type="primary" onClick={handleAddPromotion}>
                            Thêm
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ViewPromotion;

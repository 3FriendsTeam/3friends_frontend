import { useState, useEffect } from "react";
import { Table, Input, Button, message, Modal } from "antd";
import axios from "axios";

const ViewCompleteOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    // Hàm lấy danh sách đơn hàng đã hoàn thành
    const fetchOrderData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/get-complete-orders`
            );
            setOrders(
                response.data.map((order, index) => ({
                    key: index,
                    ...order,
                    CustomerName: order.Customer?.CustomerName || "Chưa cập nhật",
                }))
            );
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            message.error(
                "Không thể tải danh sách đơn hàng. Vui lòng thử lại sau."
            );
        }
    };

    useEffect(() => {
        fetchOrderData();
    }, []);

    // Lọc danh sách đơn hàng theo từ khóa tìm kiếm
    const filteredOrders = orders.filter((order) =>
        order.id?.toString().includes(searchTerm) ||
        order.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Hàm xem chi tiết đơn hàng
    const viewOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/get-order-by-id`,
                { params: { id: orderId } }
            );

            const data = response.data;
            const transformedData = {
                ...data,
                OrderProductDetails: Array.isArray(data.OrderProductDetails)
                    ? data.OrderProductDetails
                    : Object.values(data.OrderProductDetails || []),
                CustomerName: data.Customer?.CustomerName || "Chưa cập nhật",
            };

            setOrderDetails(transformedData);
            setIsModalVisible(true);
        } catch (error) {
            console.error("Lỗi khi tải chi tiết đơn hàng:", error);
            message.error("Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau.");
        }
    };

    const closeModal = () => {
        setIsModalVisible(false);
        setOrderDetails(null);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            render: (text, record, index) => index + 1,
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "id",
            key: "id",
            render: (id, record) => (
                <Button type="link" onClick={() => viewOrderDetails(record.id)}>
                    #{id}
                </Button>
            ),
        },
        {
            title: "Ngày đặt hàng",
            dataIndex: "OrderDate",
            key: "OrderDate",
            render: (OrderDate) =>
                OrderDate ? new Date(OrderDate).toLocaleDateString() : "Chưa cập nhật",
        },
        {
            title: "Khách hàng",
            dataIndex: "CustomerName",
            key: "CustomerName",
            render: (CustomerName) => CustomerName || "Chưa cập nhật",
        },
        {
            title: "Trạng thái thanh toán",
            dataIndex: "PaymentStatus",
            key: "PaymentStatus",
            render: (PaymentStatus) =>
                PaymentStatus ? "Đã thanh toán" : "Chưa thanh toán",
        },
        {
            title: "Trạng thái đơn hàng",
            dataIndex: "OrderStatus",
            key: "OrderStatus",
            render: (OrderStatus) => OrderStatus || "Chưa cập nhật",
        },
        {
            title: "Tổng tiền",
            dataIndex: "TotalAmount",
            key: "TotalAmount",
            render: (TotalAmount) =>
                TotalAmount ? `${TotalAmount.toLocaleString()} VND` : "Chưa cập nhật",
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Đơn hàng đã hoàn thành</h1>
            <Input
                placeholder="Tìm kiếm đơn hàng theo mã đơn hoặc tên khách hàng..."
                className="mb-4"
                style={{ width: "300px", height: "40px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table
                columns={columns}
                dataSource={filteredOrders}
                pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                }}
            />
            <div className="text-sm mt-2">{filteredOrders.length} đơn hàng</div>

            <Modal
                title="Chi tiết đơn hàng"
                open={isModalVisible}
                onCancel={closeModal}
                footer={[
                    <Button key="close" onClick={closeModal}>
                        Đóng
                    </Button>,
                ]}
                width={800}
            >
                {orderDetails ? (
                    <div>
                        <h3>Thông tin đơn hàng</h3>
                        <p>
                            <strong>Mã đơn hàng:</strong> #{orderDetails.id}
                        </p>
                        <p>
                            <strong>Khách hàng:</strong> {orderDetails.CustomerName}
                        </p>
                        <p>
                            <strong>Ngày đặt hàng:</strong>{" "}
                            {new Date(orderDetails.OrderDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Trạng thái đơn hàng:</strong> {orderDetails.OrderStatus}
                        </p>
                        <p>
                            <strong>Phương thức thanh toán:</strong>{" "}
                            {orderDetails.PaymentMethodID === 1 ? "Chuyển khoản" : "Tiền mặt"}
                        </p>
                        <p>
                            <strong>Trạng thái thanh toán:</strong>{" "}
                            {orderDetails.PaymentStatus ? "Đã thanh toán" : "Chưa thanh toán"}
                        </p>
                        {orderDetails.PaymentDate && (
                            <p>
                                <strong>Ngày thanh toán:</strong>{" "}
                                {new Date(orderDetails.PaymentDate).toLocaleDateString()}
                            </p>
                        )}
                        <p>
                            <strong>Tổng tiền:</strong>{" "}
                            {orderDetails.TotalAmount?.toLocaleString()} VND
                        </p>
                        {/* <h3 style={{ marginTop: "16px" }}>Chi tiết sản phẩm</h3>
                        {orderDetails.OrderProductDetails.map((product, index) => (
                            <div key={index} style={{ marginBottom: "12px" }}>
                                <p>
                                    <strong>Tên sản phẩm:</strong> {product.Product?.ProductName || "Không có tên"}
                                </p>
                                <p>
                                    <strong>Giá:</strong>{" "}
                                    {product.Product?.PromotionalPrice?.toLocaleString() || "N/A"} VND
                                </p>
                                <p>
                                    <strong>Số lượng:</strong> {product.Quantity || 0}
                                </p>
                                <hr style={{ margin: "12px 0" }} />
                            </div>
                        ))} */}
                    </div>
                ) : (
                    <p>Không có dữ liệu để hiển thị.</p>
                )}
            </Modal>
        </div>
    );
};

export default ViewCompleteOrder;

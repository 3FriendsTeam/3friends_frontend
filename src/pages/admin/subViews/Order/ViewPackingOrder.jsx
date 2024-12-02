import { useState, useEffect } from "react";
import { Table, Input, Button, message, Modal } from "antd";
import axios from "axios";

const ViewPackingOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [customers, setCustomers] = useState([]);


    // Hàm lấy danh sách đơn hàng cần xử lý
    const fetchOrderData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/packing-orders`
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

    const fetchCustomerData = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/get-all-customer`
            );
            console.log("Danh sách khách hàng:", response.data);
            setCustomers(response.data);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            message.error(
                "Không thể tải danh sách chính sách bảo hành. Vui lòng thử lại sau."
            );
        }
    };

    useEffect(() => {
        fetchOrderData();
        fetchCustomerData();
    }, []);
    // Lọc danh sách đơn hàng theo từ khóa tìm kiếm (mã đơn hàng hoặc tên khách hàng)
    const filteredOrders = orders.filter((order) =>
        order.id?.toString().includes(searchTerm) ||
        order.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getCustomerName = (CustomerID) => {
        if (!customers || customers.length === 0) {
            return "Chưa xác định";
        }
        const customer = customers.find((p) => p.id === CustomerID);
        return customer ? customer.CustomerName : "Chưa xác định";
    };

    const viewOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/api/get-order-by-id`,
                {
                    params: { id: orderId },
                }
            );

            const data = response.data;
            const transformedData = {
                ...data,
                OrderProductDetails: Array.isArray(data.OrderProductDetails)
                    ? data.OrderProductDetails
                    : Object.values(data.OrderProductDetails || {}),
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

    const handleConfirmPacking = async (id) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-order-status?id=${id}`,
                { OrderStatus: "Đang đóng hàng" }
            );
            message.success("Đơn hàng đã được xác nhận thành công.");
            setIsModalVisible(false);
            fetchOrderData();
        } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
            message.error("Không thể xác nhận đơn hàng. Vui lòng thử lại sau.");
        }
    };

    const handleCompletePacking = async (id) => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-order-status?id=${id}`,
                { OrderStatus: "Chờ giao hàng" }
            );
            message.success("Đơn hàng đã được đóng thành công.");
            setIsModalVisible(false);
            fetchOrderData();
        } catch (error) {
            console.error("Lỗi khi xác nhận đơn hàng:", error);
            message.error("Không thể xác nhận đơn hàng. Vui lòng thử lại sau.");
        }
    };

    const handleCancelOrder = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/update-order-status?id=${orderDetails.id}`,
                { OrderStatus: "Hủy đơn hàng" }
            );

            message.success("Đơn hàng đã được hủy thành công.");
            setOrderDetails({
                ...orderDetails,
                OrderStatus: 'Đã hủy',
            });
            setIsModalVisible(false);
            fetchOrderData();
        } catch (error) {
            console.error("Lỗi khi hủy đơn hàng:", error);
            message.error("Không thể hủy đơn hàng. Vui lòng thử lại sau.");
        }
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
            dataIndex: "CustomerID",
            key: "CustomerID",
            render: (CustomerID) => getCustomerName(CustomerID) || "Chưa cập nhật",
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
            <h1 className="text-3xl font-bold mb-5">Đơn hàng đang đóng gói</h1>
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
                    orderDetails?.OrderStatus !== "Đã hủy" && (
                        <Button key="cancel" danger onClick={() => handleCancelOrder(orderDetails.id)}>
                            Hủy đơn hàng
                        </Button>
                    ),
                    orderDetails?.OrderStatus === "Đã xác nhận" && (
                        <Button
                            key="confirm-packing"
                            type="primary"
                            onClick={() => handleConfirmPacking(orderDetails.id)}
                        >
                            Xác nhận đóng hàng
                        </Button>
                    ),
                    orderDetails?.OrderStatus === "Đang đóng hàng" && (
                        <Button
                            key="complete-packing"
                            type="primary"
                            onClick={() => handleCompletePacking(orderDetails.id)}
                        >
                            Hoàn tất đóng hàng
                        </Button>
                    ),
                    <Button key="close" onClick={closeModal}>
                        Đóng
                    </Button>,
                ]}
                width={1000}
            >
                {orderDetails ? (
                    <div>

                        {/* Thông tin sản phẩm */}
                        <h3>Chi tiết sản phẩm</h3>
                        <div
                            style={{ borderBottom: "1px solid #ccc", marginBottom: "16px" }}
                        >
                            {orderDetails.OrderProductDetails.map((productDetail, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "12px",
                                    }}
                                >
                                    <div style={{ flex: 2 }}>
                                        <p>
                                            <strong>Tên sản phẩm:</strong>{" "}
                                            {productDetail.Product.ProductName}
                                        </p>
                                        <p>
                                            <strong>Giá niêm yết:</strong>{" "}
                                            {productDetail.Product.ListedPrice.toLocaleString()} VND
                                        </p>
                                        <p>
                                            <strong>Giá khuyến mãi:</strong>{" "}
                                            {productDetail.Product.PromotionalPrice.toLocaleString()}{" "}
                                            VND
                                        </p>
                                        <p>
                                            <strong>Số lượng:</strong> {productDetail.Quantity}
                                        </p>
                                    </div>
                                    <img
                                        src={productDetail.Product.RepresentativeImage}
                                        alt={productDetail.Product.ProductName}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "4px",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Tổng cộng */}
                        <div style={{ marginTop: "16px", fontWeight: "bold" }}>
                            <p>
                                Tổng tiền đơn hàng:{" "}
                                {orderDetails.TotalAmount?.toLocaleString() || "0"} VND
                            </p>
                        </div>

                        {/* Thông tin đơn hàng */}
                        <h3 style={{ marginTop: "16px" }}>Thông tin đơn hàng</h3>
                        <div>
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
                        </div>
                    </div>
                ) : (
                    <p>Không có dữ liệu để hiển thị.</p>
                )}
            </Modal>


        </div>
    );
};

export default ViewPackingOrder;

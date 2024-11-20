import { useState, useEffect } from "react";
import { Table, Input, Button, message, Modal, Popconfirm } from "antd";
import axios from "axios";

const ViewPackingOrder = () => {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    // Hàm lấy danh sách đơn hàng cần xử lí
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

    useEffect(() => {
        fetchOrderData();
    }, []);

    // Lọc danh sách đơn hàng theo từ khóa tìm kiếm (mã đơn hàng hoặc tên khách hàng)
    const filteredOrders = orders.filter((order) =>
        order.id?.toString().includes(searchTerm) ||
        order.CustomerName?.toLowerCase().includes(searchTerm.toLowerCase())
    );


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
                products: data.OrderProductDetails || [],
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

    // Xử lý xác nhận đơn hàng
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
          console.error("Lỗi khi xác nhận đơn hàng:",  error);
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
          console.error("Lỗi khi xác nhận đơn hàng:",  error);
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
        {
            title: "Thao tác",
            key: "action",
            render: (text, record) => (
                <>
                    {record.OrderStatus === "Đã xác nhận" ? (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xác nhận đóng hàng không?"
                            onConfirm={() => handleConfirmPacking(record.id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="link" className="text-red-600 font-bold mx-1">
                                Xác nhận đóng hàng
                            </Button>
                        </Popconfirm>
                    ) : (
                        <Popconfirm
                            title="Bạn có chắc chắn muốn xác nhận đóng hàng xong không?"
                            onConfirm={() => handleCompletePacking(record.id)}
                            okText="Có"
                            cancelText="Không"
                        >
                            <Button type="link" className="text-red-600 font-bold mx-1">
                                Xác nhận đóng hàng xong
                            </Button>
                        </Popconfirm>
                    )}
                </>
            ),
        },
    ];

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-5">Đơn hàng mới</h1>
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
                    orderDetails?.OrderStatus !== 'Đã hủy' && (
                        <Button key="cancel" danger onClick={handleCancelOrder}>
                            Hủy đơn hàng
                        </Button>
                    ),
                    <Button key="close" onClick={closeModal}>
                        Đóng
                    </Button>,
                ]}
                width={800}
            >
                {orderDetails?.OrderProductDetails && orderDetails.OrderProductDetails.length > 0 ? (
                    orderDetails.OrderProductDetails.map((productDetail, index) => (
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
                                    {productDetail.Product?.ProductName || "Không có tên"}
                                </p>
                                <p>
                                    <strong>Giá niêm yết:</strong>{" "}
                                    {productDetail.Product?.ListedPrice?.toLocaleString() || "N/A"} VND
                                </p>
                                <p>
                                    <strong>Số lượng:</strong> {productDetail.Quantity || 0}
                                </p>
                            </div>
                            <img
                                src={productDetail.Product?.RepresentativeImage || ""}
                                alt={productDetail.Product?.ProductName || "Không có hình ảnh"}
                                style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "4px",
                                }}
                            />
                        </div>
                    ))
                ) : (
                    <p>Không có thông tin sản phẩm trong đơn hàng.</p>
                )}
            </Modal>
        </div>
    );
};

export default ViewPackingOrder;

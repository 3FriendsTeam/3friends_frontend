import { useState, useEffect } from "react";
import { Table, Input, Button, message, Modal } from "antd";
import axios from "axios";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  // Lọc danh sách đơn hàng theo từ khóa tìm kiếm
  const filteredOrders = orders.filter((order) =>
    order.id?.toString().includes(searchTerm)
  );

  // Fetch danh sách đơn hàng
  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/orders`
        );
        setOrders(
          response.data.map((order, index) => ({ key: index, ...order }))
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách đơn hàng. Vui lòng thử lại sau."
        );
      }
    };

    fetchOrderData();
  }, []);

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
      };

      console.log("Transformed Data:", transformedData);

      setOrderDetails(transformedData);
      setIsModalVisible(true);
    } catch (error) {
      console.error("Lỗi khi tải chi tiết đơn hàng:", error);
      message.error("Không thể tải chi tiết đơn hàng. Vui lòng thử lại sau.");
    }
  };

  // Theo dõi sự thay đổi của orderDetails
  useEffect(() => {
    console.log("Updated orderDetails:", orderDetails);
  }, [orderDetails]);

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
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "OrderDate",
      key: "OrderDate",
      render: (OrderDate) =>
        OrderDate ? new Date(OrderDate).toLocaleDateString() : "Chưa cập nhật",
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
        <Button type="link" onClick={() => viewOrderDetails(record.id)}>
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-5">Danh sách đơn hàng</h1>
      <Input
        placeholder="Tìm kiếm đơn hàng..."
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
        width={800} // Đặt chiều rộng modal
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
            <div style={{ marginBottom: "16px" }}>
              <p>
                <strong>Tổng cộng:</strong>{" "}
                {orderDetails.TotalAmount.toLocaleString()} VND
              </p>
            </div>

            {/* Thông tin đơn hàng */}
            <h3>Thông tin đơn hàng</h3>
            <div style={{ marginBottom: "16px" }}>
              <p>
                <strong>Mã đơn hàng: #</strong>
                {orderDetails.id}
              </p>
              <p>
                <strong>Ngày đặt hàng:</strong>{" "}
                {new Date(orderDetails.OrderDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Trạng thái:</strong> {orderDetails.OrderStatus}
              </p>
              <p>
                <strong>Phương thức thanh toán:</strong>{" "}
                {orderDetails.PaymentMethodID === 1
                  ? "Chuyển khoản"
                  : "Tiền mặt"}
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong>{" "}
                {orderDetails.PaymentStatus
                  ? "Đã thanh toán"
                  : "Chưa thanh toán"}
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

export default ViewOrder;

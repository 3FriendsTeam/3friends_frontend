import { useState, useEffect } from "react";
import { Table, Input, Button, message, Spin } from "antd";
import axios from "axios";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Lọc danh sách đơn hàng theo từ khóa tìm kiếm
  const filteredOrders = orders.filter((order) =>
    order.OrderID?.toString().includes(searchTerm)
  );

  // Fetch danh sách đơn hàng
  useEffect(() => {
    const fetchOrderData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-all-orders`
        );
        setOrders(
          response.data.map((order, index) => ({ key: index, ...order }))
        );
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
        message.error(
          "Không thể tải danh sách đơn hàng. Vui lòng thử lại sau."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchOrderData();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "OrderID",
      key: "OrderID",
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
        TotalAmount ? `${TotalAmount} VND` : "Chưa cập nhật",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "PaymentMethodID",
      key: "PaymentMethodID",
      render: (PaymentMethodID) => PaymentMethodID || "Chưa cập nhật",
    },
    {
      title: "Mã khách hàng",
      dataIndex: "CustomerID",
      key: "CustomerID",
      render: (CustomerID) => CustomerID || "Chưa cập nhật",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "PaymentStatus",
      key: "PaymentStatus",
      render: (PaymentStatus) =>
        PaymentStatus ? "Đã thanh toán" : "Chưa thanh toán",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "PaymentDate",
      key: "PaymentDate",
      render: (PaymentDate) =>
        PaymentDate ? new Date(PaymentDate).toLocaleDateString() : "Chưa cập nhật",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => viewOrderDetails(record.OrderID)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  const viewOrderDetails = (orderId) => {
    // Implement the logic to view order details
    console.log("Xem chi tiết đơn hàng:", orderId);
  };

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
      {loading ? (
        <div className="flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={filteredOrders}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      )}
      <div className="text-sm mt-2">{filteredOrders.length} đơn hàng</div>
    </div>
  );
};

export default ViewOrder;

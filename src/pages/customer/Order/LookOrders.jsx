import { useState } from 'react';
import { Modal, Row, Col, Button, Image } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import axios
import Header from '../../../components/Client/Header';
import Footer from '../../../components/Client/Footer';

const LookOrders = () => {
  const [orderCode, setOrderCode] = useState(''); // Trạng thái mã đơn hàng
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [orderData, setOrderData] = useState(null); // Dữ liệu trả về từ API

  // Hàm gọi API để tra cứu đơn hàng
  const fetchOrderData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/get-order-customer-detail`, {
        params: { id },
      });
      const data = response.data;
      setOrderData(data);
    } catch (error) {
      console.error('Error fetching order data:', error);
    }
  };
  

  // Hàm xử lý sự kiện khi nhấn "TRA CỨU"
  const handleSearchOrder = () => {
    if (!orderCode) {
      alert("Vui lòng nhập mã đơn hàng");
    } else {
      fetchOrderData(orderCode);
      setIsModalOpen(true);
    }
  };

  // Hàm đóng modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Các trạng thái đơn hàng
  const orderStatuses = [
    "Chờ xác nhận",
    "Đã xác nhận",
    "Đang đóng hàng",
    "Chờ giao hàng",
    "Đang giao hàng",
    "Hoàn thành"
  ];

  return (
    <div>
      <Header />
      <div className="flex p-5 bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 mr-5 ml-[183px] mt-8">
          <ul className="space-y-2">
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Những câu hỏi thường gặp</a></li>
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Phương thức thanh toán</a></li>
            <li><a href="/" className="text-blue-500 font-bold">Tra cứu đơn hàng trực tuyến</a></li>
            <li><a href="/" className="text-gray-700 hover:text-blue-500">Tìm trung tâm bảo hành</a></li>
          </ul>
        </div>

        {/* Lookup Form */}
        <div className="flex flex-col w-80 space-y-4 mt-8 ml-[300px]">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng để tra cứu"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={orderCode}
            onChange={(e) => setOrderCode(e.target.value)} // Cập nhật mã đơn hàng
          />
          <button
            className="py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
            onClick={handleSearchOrder} // Mở modal khi nhấn TRA CỨU
          >
            TRA CỨU
          </button>
          {!orderCode && <p className="text-red-600">Vui lòng nhập mã đơn hàng</p>}
        </div>
      </div>

      {/* Modal để hiển thị thông tin đơn hàng */}
      <Modal
        title="Thông tin đơn hàng"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800} // Cài đặt chiều rộng modal tùy chỉnh
      >
        {orderData ? (
          <>
            {/* Dòng 1: Trạng thái đơn hàng */}
            <Row className="mb-4">
              <Col span={24}>
                <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
                  <p><strong>Trạng thái đơn hàng:</strong></p>
                  <div className="flex space-x-4">
                    {orderStatuses.map((status, index) => (
                      <div key={index} className="flex items-center">
                        {/* Hiển thị dấu tick cho các trạng thái đã hoàn thành */}
                        {orderStatuses.indexOf(orderData.OrderStatus) >= index ? (
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                        ) : (
                          <CloseCircleOutlined className="text-gray-400 mr-2" />
                        )}
                        <span>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            {/* Dòng 2: Chia thành 2 cột */}
            <Row gutter={16}>
              {/* Cột trái: Thông tin sản phẩm */}
              <Col span={24}>
                <div>
                  <h4>Thông tin sản phẩm</h4>
                  <ul className="list-disc pl-5">
                    {orderData.OrderProductDetails.map((productDetail, index) => (
                      <li key={index} className="mb-4">
                        <div className="flex items-center">
                          <Image
                            width={80}
                            src={`http://localhost:3001/images/${productDetail.Product.RepresentativeImage}`}
                            alt={productDetail.Product.ProductName}
                            className="mr-4"
                          />
                          <div>
                            <p><strong>{productDetail.Product.ProductName}</strong></p>
                            <p><strong>Giá:</strong> {productDetail.UnitPrice} VND</p>
                            <p><strong>Số lượng:</strong> {productDetail.Quantity}</p>
                            <p><strong>Tổng giá:</strong> {parseFloat(productDetail.UnitPrice) * productDetail.Quantity} VND</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            </Row>

            {/* Dòng 3: Chia thành 2 ô */}
            <Row gutter={16}>
              {/* Cột trái: Thông tin khách hàng và địa chỉ nhận hàng */}
              <Col span={12}>
                <div>
                  <h4>Thông tin khách hàng và địa chỉ nhận hàng</h4>
                  <p><strong>Họ và tên:</strong> {orderData.ShippingAddress.RecipientName}</p>
                  <p><strong>Số điện thoại:</strong> {orderData.ShippingAddress.PhoneNumber}</p>
                  <p><strong>Địa chỉ:</strong> {orderData.ShippingAddress.SpecificAddress}, {orderData.ShippingAddress.Ward}, {orderData.ShippingAddress.District}, {orderData.ShippingAddress.City}</p>
                </div>
              </Col>

              {/* Cột phải: Thông tin thanh toán */}
              <Col span={12}>
                <div>
                  <h4>Thông tin thanh toán</h4>
                  <p><strong>Phương thức thanh toán:</strong> {orderData.PaymentMethodID === 1 ? 'Chuyển khoản' : 'Thanh toán khi nhận hàng'}</p>
                  <p><strong>Trạng thái thanh toán:</strong> {orderData.PaymentStatus ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
                </div>
              </Col>
            </Row>

            {/* Nút hủy đơn hàng */}
            <div className="mt-6 text-center">
              <Button type="danger" onClick={() => alert('Đơn hàng đã được hủy!')}>
                Hủy đơn hàng
              </Button>
            </div>
          </>
        ) : (
          <p>Đang tải dữ liệu đơn hàng...</p>
        )}
      </Modal>

      <Footer />
    </div>
  );
};

export default LookOrders;

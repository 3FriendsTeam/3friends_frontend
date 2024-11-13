import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import icons from "../../../utils/icons";
import api from "../../../middlewares/tokenMiddleware";
import Toolbar from "../../../components/Client/Toolbar";

const PaymentInfo = () => {
  const location = useLocation();
  const { cartItems } = location.state || { cartItems: [] };

  const [customerData, setCustomerData] = useState({
    CustomerName: "",
    PhoneNumber: "",
    Email: "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const totalAmount = cartItems.reduce(
    (total, item) =>
      total + parseFloat(item.price.replace(/\D/g, "")) * item.quantity,
    0
  );

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-customer-info`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin khách hàng:", error);
      }
    };
    fetchCustomerData();
  }, []);
  const handleNextStep = () => {
    if (currentStep === 1) setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    if (currentStep === 2) setCurrentStep(1);
  };

  return (
    <div>
      <Toolbar />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <div className="bg-[#f4f6f8] w-full max-w-[600px] mx-auto p-3 flex items-center justify-between  border-b border-gray-300">
          <button
            onClick={handlePreviousStep}
            className=" font-semibold text-xl flex justify-center items-center gap-2"
          >
            <icons.IoArrowBack />
          </button>
          <h1 className="text-lg font-bold ">
            {currentStep === 1 ? "Thông tin" : "Thanh toán"}
          </h1>
          <div></div>
        </div>

        <div className="flex pt-2 mb-4 text-sm justify-center space-x-4 mx-auto max-w-[600px]">
          <button
            className={`font-bold px-4 py-2 w-[300px] text-center text-[16px] ${
              currentStep === 1
                ? "text-[#e0052b] border-b-[3px] border-[#e0052b]"
                : "text-gray-500 border-b-2"
            }`}
          >
            1. THÔNG TIN
          </button>
          <button
            className={`font-bold px-4 py-2 w-[300px] text-center text-[16px] ${
              currentStep === 2
                ? "text-[#e0052b] border-b-[3px] border-[#e0052b]"
                : "text-gray-500 border-b-2"
            }`}
          >
            2. THANH TOÁN
          </button>
        </div>

        {currentStep === 1 && (
          <div className="mx-auto max-w-[600px] w-full">
            <div className="flex mb-6 bg-white w-full max-w-[600px] mt-4 p-4 rounded-lg shadow-sm border border-gray-300">
              <div className="w-full max-w-[600px] mt-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center bg-white p-4 rounded-lg shadow-sm ${
                      index !== 0 ? "border-t border-gray-300" : ""
                    }`}
                  >
                    <img
                      src={item?.imgSrc}
                      alt={item?.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />

                    <div className="ml-6 flex-1">
                      <h2 className="font-semibold">
                        {item?.name} - {item?.color}
                      </h2>
                      <span className="text-[#e0052b]">
                        {formatPrice(
                          parseFloat(item?.price.replace(/\D/g, "")) *
                            item?.quantity
                        )}
                      </span>
                    </div>
                    <div className="ml-auto">
                      <p className="font-sm">
                        Số lượng:
                        <span className="text-[#e0052b] ml-1">
                          {item?.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-lg mx-auto max-w-[600px] w-full text-left  ">
              THÔNG TIN KHÁCH HÀNG
            </h3>
            <div className="bg-white w-full max-w-[600px] mt-4 p-4 rounded-lg shadow-sm border border-gray-300">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[16px] font-medium">
                    {customerData.CustomerName}
                  </label>
                  <span className="text-sm font-medium text-gray-500">
                    {customerData.PhoneNumber}
                  </span>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 ">EMAIL</label>
                  <input
                    type="email"
                    className="w-full py-2 border-b-[1px] focus:border-blue-500 focus:outline-none"
                    value={customerData.Email}
                    onChange={(e) =>
                      setCustomerData({
                        ...customerData,
                        Email: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <h3 className="text-lg mx-auto max-w-[600px] w-full text-left mt-6">
              THÔNG TIN NHẬN HÀNG
            </h3>
            <div className="bg-white w-full max-w-[600px] mt-4 p-6 rounded-lg shadow-lg  border border-gray-300">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="delivery" className="mr-2" />
                    Giao hàng tận nơi
                  </label>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="w-1/2 pr-2">
                      <label className="block text-[10px] text-gray-400 mb-1">
                        TÊN NGƯỜI NHẬN{" "}
                      </label>
                      <input
                        type="text"
                        value={customerData.CustomerName}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            CustomerName: e.target.value,
                          })
                        }
                        className="w-full border-b-[1px] border-gray-300 focus:border-blue-500 focus:outline-none p-1"
                        placeholder="Nhập họ và tên"
                      />
                    </div>


                    <div className="w-1/2 pl-2">
                      <label className="block text-[10px] text-gray-400 mb-1">
                        SĐT NGƯỜI NHẬN
                      </label>
                      <input
                        type="text"
                        value={customerData.PhoneNumber}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            PhoneNumber: e.target.value,
                          })
                        }
                        className="w-full border-b-[1px] border-gray-300 focus:border-blue-500 focus:outline-none p-1"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-400">
                        Tỉnh / Thành phố
                      </label>
                      <select className="w-full py-2 border-b-[1px] focus:border-blue-500 focus:outline-none">
                        <option>Hồ Chí Minh</option>
                        <option>Hà Nội</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-400">
                        Quận / Huyện
                      </label>
                      <select className="w-full py-2 border-b-[1px] focus:border-blue-500 focus:outline-none">
                        <option>Quận 1</option>
                        <option>Quận 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-400">
                        Phường / Xã
                      </label>
                      <select className="w-full py-2 border-b-[1px] focus:border-blue-500 focus:outline-none">
                        <option>Phường 1</option>
                        <option>Phường 2</option>
                      </select>
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm text-gray-400">
                        Địa chỉ
                      </label>
                      <input
                        type="text"
                        className="w-full py-2 border-b-[1px] focus:border-blue-500 focus:outline-none"
                        placeholder="Nhập số nhà, tên đường"
                      />
                    </div>
                  </div>
                  <div className="pt-3">
                    <input
                      type="text"
                      className="w-full py-2 border-b-[1px] focus:border-blue-500 focus:outline-none"
                      placeholder="Ghi chú khác nếu có"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="mx-auto max-w-[600px] w-full mt-2">
            <div className="bg-white w-full max-w-[600px] p-4 rounded-lg shadow-sm border border-gray-300 mb-4">
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <input
                    type="text"
                    className="flex-1 py-2 border-gray-300 border-b-[1px] focus:border-blue-500 focus:outline-none"
                    placeholder="Nhập mã giảm giá"
                  />
                  <button className="bg-gray-200 text-gray-400 text-sm px-4 py-2 rounded-lg">
                    Áp dụng
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2 *:">
                <span className="text-[16px] text-gray-500">
                  Số lượng sản phẩm
                </span>
                <span className="text-gray-700 font-medium">
                  0{cartItems.length}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[16px] text-gray-500">
                  Tiền hàng (tạm tính)
                </span>
                <span className="text-gray-700 font-medium">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[16px] text-gray-500">
                  Phí vận chuyển
                </span>
                <span className="text-gray-700 font-medium">Miễn phí</span>
              </div>
              <div className="border-t border-gray-300 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">
                  Tổng tiền
                  <span className="font-normal"> ( đã gồm VAT)</span>
                </span>
                <span className="font-bold text-[#e0052b] text-lg">
                  {formatPrice(totalAmount)}
                </span>
              </div>
            </div>

            {/* Payment Info */}
            <h3 className="text-lg mx-auto max-w-[600px] w-full text-left pt-1 pb-2">
              THÔNG TIN THANH TOÁN
            </h3>
            <div className="bg-white w-full max-w-[600px] p-2 rounded-lg shadow-sm border border-gray-300 mb-4">
              <button className="flex items-center justify-between w-full text-left p-4 rounded-lg">
                <div className="flex items-center">
                  <icons.MdOutlinePayments className="text-blue-700 text-3xl mr-3" />
                  <div>
                    <p className="font-semibold text-[#e0052b] text-[16px]">
                      Chọn phương thức thanh toán
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Giảm thêm tới 500.000đ
                    </p>
                  </div>
                </div>
                <icons.IoIosArrowForward className="text-[#e0052b] text-xl" />
              </button>
            </div>

            {/* Shipping Info */}
            <h3 className="text-lg mx-auto max-w-[600px] w-full text-left pt-1 pb-2">
              THÔNG TIN NHẬN HÀNG
            </h3>
            <div className="bg-white w-full max-w-[600px] p-4 rounded-lg shadow-sm border border-gray-300 ">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-semibold">
                    Khách hàng
                  </span>
                  <span className="text-gray-500">
                    {customerData.CustomerName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-semibold">
                    Số điện thoại
                  </span>
                  <span className="text-gray-500">
                    {customerData.PhoneNumber}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-semibold">Email</span>
                  <span className="text-gray-500">{customerData.Email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-semibold">
                    Nhận hàng tại
                  </span>
                  <span className="text-gray-500">
                    {customerData.Address || "Chưa có thông tin địa chỉ"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-semibold">
                    Người nhận
                  </span>
                  <span className="text-gray-500">
                    {customerData.CustomerName} - {customerData.PhoneNumber}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-4 mt-4 mx-auto max-w-[600px] w-full bg-white  rounded-lg pb-4 shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between mb-4 mx-2">
            <p className="font-semibold">Tổng tiền tạm tính:</p>
            <p className="font-bold text-[#e0052b]">
              {formatPrice(totalAmount)}
            </p>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleNextStep}
              className="w-[580px] bg-[#e0052b] text-white py-3 rounded-lg font-bold "
            >
              {currentStep === 1 ? "Tiếp tục" : "Thanh toán"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;

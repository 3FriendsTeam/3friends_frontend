import { useEffect, useState } from "react";
import api from "../../../middlewares/tokenMiddleware";
import login1 from '../../../assets/client/login1.png';
import  icons from "../../../utils/icons";

const FmemberHome = () => {
  const [customerData, setCustomerData] = useState({ name: "", phone: "" });
  const [isPhoneHidden, setIsPhoneHidden] = useState(false);
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-customer-info`
        );
        setCustomerData(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };
    fetchCustomerData();
  }, []);
  const togglePhoneVisibility = () => {
    setIsPhoneHidden((prevState) => !prevState);
  };

  const maskPhoneNumber = (phone) => {
    if (phone && phone.length >= 10) {
      return phone.slice(0, 3) + "*****" + phone.slice(-2);
    }
    return phone;
  };

  return (
    <div className="bg-gray-50 pt-6 px-4 pb-4 -mt-5 rounded-lg shadow-xl  w-[891px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img
            src={login1}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-2 border-[#a83288] mr-6"
          />
          <div>
            <p className="text-lg font-bold text-[#a83288]">
              {customerData.CustomerName || "Đang tải..."}
            </p>
            <p className="text-[15px] text-gray-700 flex items-center gap-2">
            {isPhoneHidden ? maskPhoneNumber(customerData.PhoneNumber) : customerData.PhoneNumber || "Đang tải..."}
              <span onClick={togglePhoneVisibility} className="cursor-pointer">
                {isPhoneHidden ? <icons.IoEyeSharp /> : <icons.FaEyeSlash />}
              </span>
            </p>
            <span className="text-sm border-[1px] border-[#a83288] text-[#a83288] px-2 py-1 rounded-lg">
              SNULL
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-center bg-white rounded-xl p-2 shadow">
        <div className=" flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold text-gray-800">3</p>
          <p className="text-lg text-gray-500">đơn hàng</p>
        </div>
        <div className="h-24 w-px bg-black"></div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <p className="text-4xl font-bold text-gray-800">11M</p>
          <p className="text-lg text-gray-500">Tổng tiền tích lũy</p>
        </div>
      </div>
    </div>
  );
};

export default FmemberHome;

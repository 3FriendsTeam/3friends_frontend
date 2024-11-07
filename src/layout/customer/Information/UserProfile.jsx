import { useEffect, useState } from "react";
import api from "../../../middlewares/tokenMiddleware";

const UserProfile = () => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    Email: '',
    PhoneNumber: '',
    Birthday: '',
    Gender: '',
    createdAt: '',
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_BACKEND_URL}/api/get-customer-info`);
        console.log("Customer data retrieved:", response.data);
        setFormData(response.data);
        console.log(formData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCustomerData();
  }, []);

  return (
    <div className="flex mr-[150px] -mt-5 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-4xl">
        <div className="ml-6">
          <h2 className="text-lg font-sans mb-1">Hồ Sơ Của Tôi</h2>
          <p className="text-gray-500 mb-2 text-sm">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
          <div className="flex items-center my-2">
            <div className="border-t border-gray-300 flex-grow"></div>
          </div>
          <div className="grid grid-cols-4 gap-6 text-[15px]">
            <div className="col-span-3 flex items-center space-x-4">
              <label className="text-gray-700 whitespace-nowrap ml-20">Tên khách hàng</label>
              <input
                type="text"
                value={formData.CustomerName}
                onChange={(e) => setFormData({...formData, CustomerName: e.target.value})}
                className="w-full p-2 mt-1 border border-gray-300 rounded"
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div className="col-span-3 flex items-center space-x-4">
              <label className="block text-gray-700 whitespace-nowrap ml-[70px]">Email</label>
              <div>
                {formData.Email}
                <button className="text-blue-500 ml-4">Thay Đổi</button>
              </div>
            </div>
            <div className="col-span-3 flex items-center space-x-4">
              <label className="block text-gray-700">Số điện thoại:</label>
              <div>{formData.PhoneNumber}</div>
              <button className="text-blue-500">chỉnh sửa</button>
            </div>
            <div className="col-span-3 flex items-center space-x-4">
              <label className="block text-gray-700">Giới tính</label>
              <div className="flex items-center space-x-4 mt-1">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nam"
                    checked={formData.Gender === "Nam"}
                    onChange={() => setFormData({...formData, Gender: "Nam"})}
                    className="mr-2"
                  />
                  Nam
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Nữ"
                    checked={formData.Gender === "Nữ"}
                    onChange={() => setFormData({...formData, Gender: "Nữ"})}
                    className="mr-2"
                  />
                  Nữ
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="Khác"
                    checked={formData.Gender === "Khác"}
                    onChange={() => setFormData({...formData, Gender: "Khác"})}
                    className="mr-2"
                  />
                  Khác
                </label>
              </div>
            </div>
            {/* <div className="col-span-3 flex items-center space-x-4">
              <label className="block text-gray-700">Ngày sinh</label>
              <div className="flex space-x-2 mt-1">
                <select
                  value={formData.Birthday.day}
                  onChange={(e) => setFormData({ ...formData, Birthday: { ...formData.Birthday, day: e.target.value } })}
                  className="border border-gray-300 p-2 rounded"
                >
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.Birthday.month}
                  onChange={(e) => setFormData({ ...formData, Birthday: { ...formData.Birthday, month: e.target.value } })}
                  className="border border-gray-300 p-2 rounded"
                >
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Tháng {i + 1}
                    </option>
                  ))}
                </select>
                <select
                  value={formData.Birthday.year}
                  onChange={(e) => setFormData({ ...formData, Birthday: { ...formData.Birthday, year: e.target.value } })}
                  className="border border-gray-300 p-2 rounded"
                >
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={2024 - i}>
                      {2024 - i}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
          </div>
        </div>
        <div className="mt-6 ml-6">
          <button className="bg-red-500 text-white px-6 py-2 rounded font-semibold hover:bg-red-600">
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;


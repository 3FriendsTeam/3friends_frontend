import { useState } from "react";

const UserProfile = () => {
  const [username] = useState("xhZv0y4bcj");
  const [name, setName] = useState("");
  const [email] = useState("hu*********@gmail.com");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState({
    day: "1",
    month: "11",
    year: "2024",
  });

  return (
    <div className="flex mr-[150px] -mt-5 bg-gray-100  ">
      <div className="bg-white shadow-md rounded-lg p-5 w-full max-w-4xl ">
      <div className="ml-6">
      <h2 className="text-lg font-sans mb-1">Hồ Sơ Của Tôi</h2>
        <p className="text-gray-500 mb-2 text-sm">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
        <div className="flex items-center my-2">
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        {/* Form */}
        <div className="grid grid-cols-4 gap-6 text-[15px]">
          {/* Username */}
          <div className="col-span-3 flex items-center space-x-4 mt-6">
            <label className="text-gray-700 whitespace-nowrap ml-[5px]">
              Tên đăng nhập
            </label>
            <div className="flex-1">
              <input
                type="text"
                value={username}
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
          {/* Name */}
          <div className="col-span-3 flex items-center space-x-4">
            <label className="text-gray-700 whitespace-nowrap ml-20">Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded"
              placeholder="Nhập tên của bạn"
            />
          </div>

          {/* Email */}
          <div className="col-span-3 flex items-center space-x-4 ">
            <label className="block text-gray-700 whitespace-nowrap ml-[70px]">Email</label>
            <div className="">
                {email}  
              <button className="text-blue-500 ml-4">Thay Đổi</button>
            </div>
          </div>

          {/* Phone Number Notification */}
          <div className="col-span-3 flex items-center space-x-4">
            <label className="block text-gray-700">Số điện thoại</label>
            <button className="text-blue-500">Thêm</button>
          </div>

          {/* Gender */}
          <div className="col-span-3 flex items-center space-x-4">
            <label className="block text-gray-700">Giới tính</label>
            <div className="flex items-center space-x-4 mt-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={gender === "Nam"}
                  onChange={() => setGender("Nam")}
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={gender === "Nữ"}
                  onChange={() => setGender("Nữ")}
                  className="mr-2"
                />
                Nữ
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Khác"
                  checked={gender === "Khác"}
                  onChange={() => setGender("Khác")}
                  className="mr-2"
                />
                Khác
              </label>
            </div>
          </div>

          {/* Birthday */}
          <div className="col-span-3 flex items-center space-x-4">
            <label className="block text-gray-700">Ngày sinh</label>
            <div className="flex space-x-2 mt-1">
              <select
                value={birthday.day}
                onChange={(e) =>
                  setBirthday({ ...birthday, day: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              >
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={birthday.month}
                onChange={(e) =>
                  setBirthday({ ...birthday, month: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Tháng {i + 1}
                  </option>
                ))}
              </select>
              <select
                value={birthday.year}
                onChange={(e) =>
                  setBirthday({ ...birthday, year: e.target.value })
                }
                className="border border-gray-300 p-2 rounded"
              >
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

      </div>
      
        {/* Save Button */}
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

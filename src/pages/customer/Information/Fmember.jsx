import { useState } from "react";
import Header from "../../../components/Client/Header";
import UserProfile from "./UserProfile";
import { NavLink, useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";
function CustomerInformation() {
  const [activeComponent, setActiveComponent] = useState("home");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    // Đóng modal đăng xuất và cập nhật giao diện
    setShowLogoutModal(false);

    // Điều hướng đến trang đăng nhập
    navigate(path.CUSTOMERLOGIN);
  };

  return (
    <div className="bg-[#F2F2F2]">
      <div className="bg-white">
        <Header onLogout={handleLogout} />
      </div>
      <div className="flex justify-between ml-[173px] bg-[#F2F2F2] mt-4">
        {/* Sidebar */}
        <div className="w-1/5 p-5 bg-white shadow-md rounded h-full max-h-[calc(100vh+30px)]">
          <nav className="space-y-5 text-gray-600">
            <a
              href="#"
              className="flex items-center space-x-2 font-semibold"
              onClick={() => setActiveComponent("home")}
            >
              <span>Trang chủ</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("profile")}
            >
              <span>Hồ sơ</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Đổi mật khẩu</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Địa chỉ</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Ưu đãi</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Hỗ trợ </span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Tra cứu bảo hành</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Ưu đãi mua hàng</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Lịch sử mua hàng</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2"
              onClick={() => setActiveComponent("warranty")}
            >
              <span>Góp ý - Phản hồi</span>
            </a>

            <NavLink
              to="#"
              className="flex items-center space-x-2"
              onClick={() => setShowLogoutModal(true)}
            >
              <p className="mb-[12px]">Thoát tài khoản</p>
            </NavLink>
          </nav>
        </div>
        <div className="flex-1 p-5">
          {activeComponent === "profile" && <UserProfile />}
          {activeComponent === "home" && <div>Trang chủ</div>}
          {activeComponent === "warranty" && <div>Tra cứu bảo hành</div>}
        </div>
      </div>
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-xl shadow-lg w-[600px] max-w-lg">
            <h2 className="text-base font-semibold mb-4 text-center">
              Bạn muốn thoát tài khoản?
            </h2>
            <div className="flex justify-between space-x-3">
              <button
                className="px-4 py-2 font-medium bg-gray-200 rounded w-[250px]"
                onClick={() => setShowLogoutModal(false)}
              >
                Không
              </button>
              <button
                className="px-4 py-2 bg-[#e0052b] font-medium text-white rounded w-[250px]"
                onClick={handleLogout}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomerInformation;

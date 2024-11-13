import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/admin/logo.png";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const saveLogin = async (token, role, expiresIn) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminRole", role);
    localStorage.setItem("adminExpiresIn", expiresIn);
  };
  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login-employee`, {
        username,
        password,
      });

      const { token, role, expiresIn } = response.data;

      saveLogin(token, role, expiresIn);

      navigate("/admin");

      console.log("Đăng nhập thành công!");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex bg-white shadow-lg rounded-lg border border-gray-300 w-full max-w-4xl overflow-hidden">
        {/* Logo bên trái */}
        <div className="w-1/2 bg-blue-600 flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-24" />
        </div>
        {/* Form bên phải */}
        <div className="w-1/2 p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Đăng Nhập Quản Trị Viên
          </h2>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="username"
              >
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập tên đăng nhập"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-800"
                >
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <div>
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:text-blue-600"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

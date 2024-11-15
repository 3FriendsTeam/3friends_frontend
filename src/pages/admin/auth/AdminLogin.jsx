import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../assets/admin/logo.png';
import { EmployeeAuthContext } from '../../../AuthContext/EmployeeAuthContext';

const AdminLogin = () => {
  const { login } = useContext(EmployeeAuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login({ username, password });
    if (result.success==true) {
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
      
    } else {
      setError(result.message);
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
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Đăng Nhập Quản Trị Viên</h2>
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
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
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
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

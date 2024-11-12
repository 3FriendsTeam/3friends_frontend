// ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../../config/firebaseService";
import { path } from "../../../utils/constant";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPassword(email);
      setSuccess("Email đặt lại mật khẩu đã được gửi!");
      setError("");
      setTimeout(() => {
        navigate(path.CUSTOMERLOGIN);
      }, 2000);
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-center text-xl font-bold mb-4">Quên mật khẩu</h2>
        <p className="text-center text-gray-600 mb-6">
          Hãy nhập email của bạn vào bên dưới để bắt đầu quá trình khôi phục mật khẩu.
        </p>
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

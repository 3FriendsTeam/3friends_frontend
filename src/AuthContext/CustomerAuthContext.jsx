// Updated CustomerAuthContext.jsx
import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { signInWithEmailPassword, signInWithGoogle } from "../config/firebaseService";
import axios from "axios";
import { message } from "antd";

export const CustomerAuthContext = createContext();

export const CustomerAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [customer, setCustomer] = useState(null);

  const IsLogin = () => {
    return !!localStorage.getItem("token"); // Trả về true nếu token tồn tại, ngược lại false
  };
  
  const saveAccount = async ({
    uid,
    customerName,
    gender,
    email,
    phoneNumber,
    birthDate,
    isActive ,
}) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/register`, {
            uid,
            customerName,
            gender,
            email,
            phoneNumber,
            birthDate,
            isActive,
        });
        if (response.status === 200) {
            console.log("save accounting success");
            return true;
        }
    } catch (error) {
        console.log("error save accounting", error.message);
        return false;
    }
};

const checkEmail = async ({ email }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/check-email?email=${email}`
    );
    console.log("CheckEmail response:", response.data);

    const { success, message: msg } = response.data;

    if (success) {
      // success = true => Email đã tồn tại & không bị khóa (theo server)
      // => return true (cho login)
      return true;
    } else {
      // success = false => user bị khóa HOẶC email chưa tồn tại
      // => không login được => hiển thị thông báo
      message.error(msg);
      return false;
    }
  } catch (error) {
    console.error("error check mail: ", error.message);
    return false;
  }
};

const login = async (email, password) => {
  // Đảm bảo gọi checkEmail với { email }
  const canProceed = await checkEmail({ email });
  if (!canProceed) return;  // nếu false => dừng luôn

  try {
    const userCredential = await signInWithEmailPassword(email, password);

    if (!userCredential.emailVerified) {
      throw new Error('Vui lòng xác thực email trong thư mục tin nhắn để đăng nhập!');
    }

    const token = await userCredential.getIdToken();
    localStorage.setItem("token", token);
    if (userCredential.displayName) {
      localStorage.setItem("username", userCredential.displayName);
    }

    message.success('Đăng nhập thành công!');
  } catch (error) {
    console.error('Login error:', error);
    message.error(error.message);
  }
};

const loginWithGoogle = async () => {
  try {
    const userCredential = await signInWithGoogle();
    if (!userCredential) return;

    const user = userCredential;
    if (!user) return;

    // Kiểm tra email này xem đã tồn tại + không bị khoá chưa
    const canProceed = await checkEmail({ email: user.email });

    if (!canProceed) {
      // Nếu checkEmail = false => user bị khoá hoặc chưa tồn tại
      // => code mẫu: đăng ký mới (saveAccount)
      try {
        await saveAccount({
          uid: user.uid,
          customerName: user.displayName,
          gender: user.gender || 'Unknown',
          email: user.email,
          phoneNumber: user.phoneNumber || 'Unknown',
          birthDate: user.birthDate || null,
          isActive: true,
        });
        localStorage.setItem("token", await user.getIdToken());
        localStorage.setItem("username", user.displayName);
        message.success('Đăng nhập thành công!');
      } catch (error) {
        console.error('Error saving account: ', error);
        message.error('Đã xảy ra lỗi khi lưu tài khoản.');
      }
    } else {
      // Đã tồn tại, không bị khóa => chỉ việc login
      localStorage.setItem("token", await user.getIdToken());
      localStorage.setItem("username", user.displayName);
      message.success('Đăng nhập thành công!');
    }
  } catch (error) {
    console.error('Error signing in with Google:', error);
    message.error('Đã xảy ra lỗi khi đăng nhập.');
  }
};

  const logout = () => {
    setIsAuthenticated(false);
    setCustomer(null);
    localStorage.removeItem("username");
    localStorage.removeItem("token");
  };

  return (
    <CustomerAuthContext.Provider value={{ isAuthenticated, customer, login, loginWithGoogle, logout, IsLogin }}>
      {children}
    </CustomerAuthContext.Provider>
  );
};

CustomerAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

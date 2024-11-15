import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext } from 'react';

export const EmployeeAuthContext = createContext();

export const EmployeeAuthProvider = ({ children }) => {

  const login = async ({ username, password }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login-employee`, {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('employee', JSON.stringify(response.data));
        localStorage.setItem('PositionID', response.data.data.PositionID);
        localStorage.setItem('isAuthenticated', 'true');
        return { success: true };
      }
    } catch (error) {
      if (error.response) {
        return { success: false, message: error.response.data.message || 'Đăng nhập thất bại!' };
      } else {
        return { success: false, message: 'Đã xảy ra lỗi khi kết nối đến máy chủ!' };
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('employee');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('PositionID');
  };

  return (
    <EmployeeAuthContext.Provider value={{ login, logout }}>
      {children}
    </EmployeeAuthContext.Provider>
  );
};

EmployeeAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

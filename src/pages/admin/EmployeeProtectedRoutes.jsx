import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const EmployeeProtectedRoute = ({ allowedPositions, children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // Chuyển sang boolean
  const PositionID = parseInt(localStorage.getItem('PositionID'), 10); // Chuyển sang số
  const location = useLocation(); // Lấy đường dẫn hiện tại

  // Nếu người dùng đã đăng nhập và đang cố vào trang login
  if (isAuthenticated && location.pathname === '/employee/login') {
    return <Navigate to="/admin" replace />;
  }

  // Nếu người dùng chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/employee/login" />;
  }

  // Nếu vị trí không được phép
  if (allowedPositions && !allowedPositions.includes(PositionID)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};


EmployeeProtectedRoute.propTypes = {
  allowedPositions: PropTypes.arrayOf(PropTypes.number).isRequired, // Chỉ định kiểu là mảng số
  children: PropTypes.node.isRequired,
};

export default EmployeeProtectedRoute;

import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const EmployeeProtectedRoute = ({ allowedPositions, children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  const employee = JSON.parse(localStorage.getItem('employee')) ?? null;
  const PositionID = employee ? parseInt(employee.data.PositionID, 10) : null;

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
  allowedPositions: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired,
};

export default EmployeeProtectedRoute;

import { Route } from 'react-router-dom';
import AdminLogin from './auth/AdminLogin';
import EmployeeProtectedRoute from './EmployeeProtectedRoutes';
//import ViewEmployee from './subViews/Employee/viewEmployee/ViewEmployee';
import Admin from './LayoutAdmin/Admin';

const EmployeeRoutes = [
  // Trang đăng nhập cho nhân viên
  <Route key="login" path="/employee/login" element={<AdminLogin />} />,
  
  // Các tuyến đường được bảo vệ
  <Route
    key="dashboard"
    path="/admin"
    element={
      <EmployeeProtectedRoute allowedPositions={[1, 2, 3, 4, 5]}>
        <Admin />
      </EmployeeProtectedRoute>
    }
  />,
];

export default EmployeeRoutes;

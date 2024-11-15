import { Route, Routes } from 'react-router-dom';
import { EmployeeAuthProvider } from './AuthContext/EmployeeAuthContext';
import EmployeeRoutes from './pages/admin/Employee.Routes';
import { CustomerAuthProvider } from './AuthContext/CustomerAuthContext';
import CustomerRoutes from './pages/customer/Customer.Routes';


function App() {
  return (
      <CustomerAuthProvider>
        <EmployeeAuthProvider>
          <Routes>
            <Route path="/*" element={<CustomerRoutes />} />
            {EmployeeRoutes}
          </Routes>
        </EmployeeAuthProvider>
      </CustomerAuthProvider>
  );
}

export default App;

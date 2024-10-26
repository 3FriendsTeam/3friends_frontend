import { Route, Routes } from "react-router-dom";
import CustomerRegister from "./pages/customer/caseCustomer/CustomerRegister";
import { path } from "./utils/constant";
import CustomerLogin from "./pages/customer/caseCustomer/CustomerLogin";
import Admin from "./pages/admin/LayoutAdmin/Admin";
function App() {
  return (
    <Routes>
      {/* console.log(import.meta.env.VITE_FIREBASE_API_KEY) */}
      <Route path={path.CUSTOMERREGISTER} element={<CustomerRegister />} />
      <Route path={path.CUSTOMERLOGIN} element={<CustomerLogin />} />
      <Route path={path.ADMIN} element={<Admin />} />
    </Routes>
  );
}

export default App;

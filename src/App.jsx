import { Route, Routes } from "react-router-dom";
import { path } from "./utils/constant";
import { CartProvider } from "./pages/customer/ShoppingCart/CartContext";
import { Fmember, HomePage, ListProducts, LookOrders, ProductDetails, ShoppingCart } from "./pages/customer";
import CustomerRegister from "./pages/customer/caseCustomer/CustomerRegister";
import CustomerLogin from "./pages/customer/caseCustomer/CustomerLogin";
import ForgotPassword from "./pages/customer/caseCustomer/ForgotPassword";
import Admin from "./pages/admin/LayoutAdmin/Admin";
import AdminLogin from "./pages/admin/auth/AdminLogin";
import ForgotPasswordAdmin from "./pages/admin/auth/ForgotPassword";
function App() {
  return (
    <CartProvider>
    <Routes>
      <Route path={path.HOMEPAGE} element={<HomePage />} />
      <Route path={path.LISTPRODUCTS} element={<ListProducts/>}/>
      <Route path={path.LOOKORDERS} element={<LookOrders/>}/>
      <Route path={path.PRODUCTSDETAILS} element={<ProductDetails/>}/>
      <Route path={path.SHOPPINGCART} element={<ShoppingCart/>}/>   
      <Route path={path.CUSTOMERREGISTER} element={<CustomerRegister />} />
      <Route path={path.CUSTOMERLOGIN} element={<CustomerLogin />} />
      <Route path={path.FMEMBER} element={<Fmember />} />
      <Route path={path.FORGOTPASSWORD} element={<ForgotPassword />} />
      <Route path={path.ADMIN} element={<Admin />} />
      <Route path={path.ADMINLOGIN} element={<AdminLogin />} />
      <Route path={path.FORGOTPASSWORDADMIN} element={<ForgotPasswordAdmin />} />
    </Routes>
    </CartProvider>
    
  );
}

export default App;

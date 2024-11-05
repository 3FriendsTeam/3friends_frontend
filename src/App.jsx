import { Route, Routes } from "react-router-dom";
import CustomerRegister from "./pages/customer/caseCustomer/CustomerRegister";
import { path } from "./utils/constant";
import CustomerLogin from "./pages/customer/caseCustomer/CustomerLogin";
import Admin from "./pages/admin/LayoutAdmin/Admin";
import {  CustomerInformation, HomePage, ListProducts, LookOrders, ProductDetails, ShoppingCart } from "./layout/customer";
import { CartProvider } from "./layout/customer/ShoppingCart/CartContext";
function App() {
  return (
    <CartProvider>
    <Routes>
      {/* console.log(import.meta.env.VITE_FIREBASE_API_KEY) */}
      <Route path={path.HOMEPAGE} element={<HomePage />} />
      <Route path={path.LISTPRODUCTS} element={<ListProducts/>}/>
      <Route path={path.LOOKORDERS} element={<LookOrders/>}/>
      <Route path={path.PRODUCTSDETAILS} element={<ProductDetails/>}/>
      <Route path={path.SHOPPINGCART} element={<ShoppingCart/>}/>   
      <Route path={path.CUSTOMERREGISTER} element={<CustomerRegister />} />
      <Route path={path.CUSTOMERLOGIN} element={<CustomerLogin />} />
      <Route path={path.CUSTOMERINFORMATION} element={<CustomerInformation />} />
      <Route path={path.ADMIN} element={<Admin />} />
    </Routes>
    </CartProvider>
    
  );
}

export default App;

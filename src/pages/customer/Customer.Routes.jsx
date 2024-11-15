import { Route, Routes } from "react-router-dom";

import {CustomerLogin, Fmember, HomePage, ListProducts, LookOrders, PaymentInfo, ProductDetails, ShoppingCart, CustomerRegister ,ForgotPassword, CatalogSearch } from "./index";
import { path } from "../../utils/constant";
import { CartProvider } from "./ShoppingCart/CartContext";
const CustomerRoutes = () => (
    <CartProvider>
        <Routes>
            <Route path={path.HOMEPAGE} element={<HomePage />} />
            <Route path={path.LISTPRODUCTS} element={<ListProducts />} />
            <Route path={path.LOOKORDERS} element={<LookOrders />} />
            <Route path={path.PRODUCTSDETAILS} element={<ProductDetails />} />
            <Route path={path.SHOPPINGCART} element={<ShoppingCart />} />
            <Route path={path.CUSTOMERREGISTER} element={<CustomerRegister />} />
            <Route path={path.CUSTOMERLOGIN} element={<CustomerLogin />} />
            <Route path={path.FMEMBER} element={<Fmember />} />
            <Route path={path.FORGOTPASSWORD} element={<ForgotPassword />} />
            <Route path={path.PAYMENTINFO} element={<PaymentInfo />} />
            <Route path={path.CATALOGSEARCH} element={<CatalogSearch />} />
        </Routes>
    </CartProvider>
);
export default CustomerRoutes;
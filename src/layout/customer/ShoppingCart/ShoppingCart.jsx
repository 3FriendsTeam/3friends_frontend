import { useContext}from "react";
import Footer from "../../../components/Client/Footer";
import Header from "../../../components/Client/Header";
import { NavLink } from "react-router-dom";
import { CartContext } from "./CartContext";

const ShoppingCart = () => {
  const { cartItems } = useContext(CartContext);
  return (
    <div>
    <Header />
    <div className="bg-[#F0F0F0] flex flex-col justify-center items-center w-[1536px] h-[330px]">
      {cartItems.length === 0 ? (
        <div className="w-[758.4px] h-[240px] bg-[#FFFFFF] flex flex-col justify-center items-center text-center rounded-lg gap-5">
          <p className="text-gray-500">Không có sản phẩm nào trong giỏ hàng</p>
          <button className="w-[300px] h-[41.6px] border border-blue-500 text-blue-500 font-bold rounded-md">
            <NavLink to="/">VỀ TRANG CHỦ</NavLink>
          </button>
        </div>
      ) : (
        <div>
          <h2>Sản phẩm trong giỏ hàng:</h2>
          {cartItems.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    <Footer />
  </div>
  );
};

export default ShoppingCart;

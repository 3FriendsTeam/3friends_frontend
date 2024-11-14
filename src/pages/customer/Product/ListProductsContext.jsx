import { createContext, useState } from "react";
import PropTypes from "prop-types";
import sp1 from "../../../assets/client/sp1.jpg";
import km1 from "../../../assets/client/km1.png";
import km2 from "../../../assets/client/km2.png";

const initialProducts = [
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "iPhone 10 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "Xiaomi 11 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "SamSung 12 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "SamSung 13 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "SamSung 10 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "iPhone 11 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "Xiaomi 12 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },

  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "iPhone 13 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },

  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "iPhone 14 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },

  {
    sp1: sp1,
    km1: km1,
    km2: km2,
    productName: "iPhone 15 Pro 128GB",
    productPrice: "28.990.000 ₫",
    promoText:
      "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
  },
];
export const ListProductContext = createContext(null);
export const ListProductProvider = ({ children }) => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <ListProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ListProductContext.Provider>
  );
};

ListProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

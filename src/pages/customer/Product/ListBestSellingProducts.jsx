import { useEffect, useMemo, useState } from "react";
import km1 from "../../../assets/client/km1.png";
import km2 from "../../../assets/client/km2.png";
import sp1 from "../../../assets/client/sp1.jpg";
import sp2 from "../../../assets/client/sp2.jpg";
import icons from "../../../utils/icons";
import ProductCard from "./ProductCard";

const ListBestSellingProducts = () => {
  const products = useMemo(
    () => [
      {
        sp1: sp1,
        km1: km1,
        km2: km2,
        productName: "iPhone 10 Pro 128GB",
        productPrice: "38.990.000 ₫",
        promoText:
          "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
      },
      {
        sp1: sp2,
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
        productPrice: "18.990.000 ₫",
        promoText:
          "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
      },
      {
        sp1: sp2,
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
        productPrice: "23.990.000 ₫",
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
        sp1: sp2,
        km1: km1,
        km2: km2,
        productName: "Xiaomi 12 Pro 128GB",
        productPrice: "8.990.000 ₫",
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
        productPrice: "48.990.000 ₫",
        promoText:
          "Tặng voucher giảm giá lên đến 6,000,000₫ cho khách hàng đổi điểm Viettel++ trên ứng dụng ...",
      },
    ],
    []
  );
  const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 5)); // Bắt đầu với 5 sản phẩm đầu tiên
  const [currentIndex, setCurrentIndex] = useState(5); // Bắt đầu từ sản phẩm thứ 6

  useEffect(() => {
    const updateVisibleProducts = () => {
      setVisibleProducts((prevProducts) => {
        const nextProduct = products[currentIndex % products.length];
        return [...prevProducts.slice(1), nextProduct];
      });
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    const interval = setInterval(updateVisibleProducts, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, products]);
  // Hàm điều hướng đến sản phẩm tiếp theo
  const nextProduct = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    setCurrentIndex(nextIndex);
    setVisibleProducts((prevProducts) => {
      const nextProduct = products[nextIndex];
      return [...prevProducts.slice(1), nextProduct];
    });
  };

  // Hàm điều hướng đến sản phẩm trước
  const prevProduct = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setCurrentIndex(prevIndex);
    setVisibleProducts((prevProducts) => {
      const prevProduct = products[prevIndex];
      return [prevProduct, ...prevProducts.slice(0, -1)];
    });
  };

  return (
    <div className="flex flex-wrap flex-row relative items-center group ">
    <button  
          onClick={prevProduct}
          className="absolute left-0 transform -translate-y-1/2 z-10 ml-[175px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <icons.IoIosArrowDropleftCircle className="text-gray-200 text-4xl "  />
            </button>
     
      <div
       className=" ml-[195px] w-[1170px] mt-4  flex flex-wrap rounded-lg group relative ">
        {visibleProducts.map((product, index) => (
          <ProductCard
            key={index}
            sp1={product.sp1}
            km1={product.km1}
            km2={product.km2}
            productName={product.productName}
            productPrice={product.productPrice}
            promoText={product.promoText}
          />
        ))}
      </div>
     <button
        onClick={nextProduct}
        className="absolute right-0 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <icons.IoIosArrowDroprightCircle className="text-gray-200 text-4xl" />
      </button>
    </div>
  );
};

export default ListBestSellingProducts;

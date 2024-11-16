import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";
import NavigationBar from "../../../pages/customer/Animations/NavigationBar";
import Animation from "../../../pages/customer/Animations/Animation";
import ProductClassification from "./ProductClassification";
import { path } from "../../../utils/constant";
import { useNavigate } from "react-router-dom";

const getImagePath = (imageName) => {
  if (!imageName) return "";
  return new URL(`../../../assets/client/${imageName}`, import.meta.url).href;
};
const ListProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const handleProductClick = () => {
    navigate(path.PRODUCTSDETAILS); 
  };


  return (
    <div className="flex flex-wrap flex-row w-full ">
      <div className="w-[1536px]">
        <Header />
      </div>
      <div className="bg-[#F2F2F2] w-[1536px] ">
        <NavigationBar current="Sản phẩm" />
        <Animation />
        <ProductClassification />
          <div className="ml-[183px] w-[1170px] flex flex-wrap rounded-lg bg-white mt-3 gap-x-1 gap-y-6 ">
            {products.map((product, index) => (
              <div
                key={index}
                onClick={handleProductClick}
                className="w-full sm:w-1/2 lg:w-[19%] p-4 ml-[7px] flex flex-col items-center border border-gray-300"
              >
                <img
                  src={
                    product.RepresentativeImage
                      ? getImagePath(product.RepresentativeImage)
                      : ""
                  }
                  alt={product.ProductName}
                  className="rounded-lg object-cover w-full h-auto"
                />
            <h3 className="mt-2 text-[18px] font-bold text-left">
              {product.ProductName || "Unknown Product"}
            </h3>
            <p className="text-lg font-bold text-[#e0052b] text-left mt-1">
              {product.ListedPrice + " ₫"}
            </p>
            <p className="text-xs text-gray-600 bg-gray-100 mt-2 p-2 border border-gray-300 rounded-md">
              {product.Description || "No promotion available"}
            </p>
              </div>
            ))}
          </div>
      </div>
      <Footer />
    </div>
  );
};

export default ListProducts;

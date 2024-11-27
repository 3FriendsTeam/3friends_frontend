import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";
import NavigationBar from "../../../pages/customer/Animations/NavigationBar";
import Animation from "../../../pages/customer/Animations/Animation";
import ProductClassification from "./ProductClassification";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/Client/Loading";

const getImagePath = (imageName) => {
  if (!imageName) return "";
  return new URL(`../../../assets/client/${imageName}`, import.meta.url).href;
};

const ListOfProductsByCategory = () => {
  const [products, setProducts] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [sortedProducts, setSortedProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const manufacturerId = queryParams.get("manufacturerId"); 

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); 
      setTimeout(async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/get-products-by-id-manufacturer`,
            {
              params: { id: manufacturerId },
            }
          );
          setProducts(response.data);
          setSortedProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setIsLoading(false); 
        }
      }, 300); 
    };

    if (manufacturerId) {
      fetchProducts();
    }
  }, [manufacturerId]);

  const sortProducts = (order) => {
    const sorted = [...products].sort((a, b) => {
      if (order === "price_low") {
        return parseFloat(b.PromotionalPrice) - parseFloat(a.PromotionalPrice);
      }
      if (order === "price_high") {
        return parseFloat(a.PromotionalPrice) - parseFloat(b.PromotionalPrice);
      }
      if (order === "sold") {
        return b.Sold - a.Sold; // Sắp xếp giảm dần theo số lượng bán
      }
      if (order === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sắp xếp giảm dần theo ngày tạo
      }
      return 0;
    });
    setSortedProducts(sorted);
  };
  const handleSortChange = (order) => {
    sortProducts(order);
  };

  return (
    <div className="flex flex-wrap flex-row w-full ">
              {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
          <div className="relative -translate-y-[30px]">
            <Loading status={isLoading} />
          </div>
        </div>
      )}
      <div className="w-[1536px]">
        <Header />
      </div>
      <div className="bg-[#F2F2F2] w-[1536px] ">
        <NavigationBar current="Sản phẩm" />
        <Animation />
        <ProductClassification  onSortChange={handleSortChange} />
        <div className="ml-[183px] w-[1170px] flex flex-wrap rounded-lg bg-white mt-3 gap-x-1 gap-y-6 pb-4 mb-4">
          {sortedProducts.map((product, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-[19%] p-4 ml-[7px] flex flex-col items-center border border-gray-300 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
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
              <h3 className="mt-2 text-[16px] font-bold text-left">
                {product.ProductName || "Unknown Product"}
              </h3>
              <p className="text-[16px] font-bold text-[#e0052b] text-left mt-1">
                {product.ListedPrice + " ₫"}
              </p>
              <p className="text-xs text-gray-600 bg-gray-100 mt-2 p-2 border border-gray-300 rounded-md line-clamp-2">
                {product.Description || "No promotion available"}
              </p>
            </div>
          ))}
        </div>
      </div >
      <Footer />
    </div>
  );
};

export default ListOfProductsByCategory;

import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";
import NavigationBar from "../../../pages/customer/Animations/NavigationBar";
import Animation from "../../../pages/customer/Animations/Animation";
import ProductClassification from "./ProductClassification";
import { path } from "../../../utils/constant";
import { useLocation, useNavigate } from "react-router-dom";

const ListProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryId = queryParams.get("categoryId");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-product-by-id-category`,
          {
            params: { id: categoryId },
          }
        );
        setProducts(response.data);
        setSortedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);
  const sortProducts = (order) => {
    const sorted = [...products].sort((a, b) => {
      if (order === "price_low") {
        return parseFloat(b.PromotionalPrice) - parseFloat(a.PromotionalPrice);
      }
      if (order === "price_high") {
        return parseFloat(a.PromotionalPrice) - parseFloat(b.PromotionalPrice);
      }
      if (order === "sold") {
        return b.Sold - a.Sold;
      }
      if (order === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt); 
      }
      return 0;
    });
    setSortedProducts(sorted);
  };

  const handleSortChange = (order) => {
    sortProducts(order);
  };
  const handleProductClick = (productId) => {
    navigate(`${path.PRODUCTSDETAILS}/${productId}`);
  };

  return (
<div className="flex flex-wrap flex-row w-full justify-center">
  <div className="w-full lg:w-[1536px] mx-auto">
    <Header />
  </div>
  <div className="bg-[#F2F2F2] w-full">
    <NavigationBar current="Sản phẩm" />
    <Animation />
    <ProductClassification
      categoryId={categoryId}
      onSortChange={handleSortChange}
    />
    
    <div className="w-full lg:w-[1170px] mx-auto flex flex-wrap justify-center rounded-lg bg-white mt-2 gap-x-4 gap-y-6 pb-4 mb-6">
      {sortedProducts.map((product, index) => (
        <div
          key={index}
          onClick={() => handleProductClick(product.id)}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-[18.5%] p-4 flex flex-col items-center border border-gray-300 rounded-md transition-transform duration-300 hover:scale-105 hover:shadow-lg"
        >
          <img
            src={product.RepresentativeImage}
            alt={product.ProductName}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-[1.13]"
          />
      
          <h3 className="mt-6 text-[16px] font-bold text-left" style={{ minHeight: "40px" }}>
            {product.ProductName || "Unknown Product"}
          </h3>
      
          <div className="w-full mt-2 text-left">
            <p className="text-[16px] font-bold text-red-500">
              {product.PromotionalPrice + " ₫"}
            </p>
            <p className="text-[16px] font-bold text-[#bdbdbd] line-through" style={{ minHeight: "20px" }}>
              {product.ListedPrice + " ₫"}
            </p>
          </div>
      
          <p className="text-xs text-gray-600 bg-gray-100 mt-2 p-2 border border-gray-300 rounded-md group-hover:bg-gray-200 line-clamp-2 text-left" style={{ minHeight: "50px" }}>
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

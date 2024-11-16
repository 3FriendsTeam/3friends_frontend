import { useEffect, useState } from "react";
import axios from "axios";
import icons from "../../../utils/icons";
import { useNavigate } from "react-router-dom";
import { path } from "../../../utils/constant";

const getImagePath = (imageName) => {
  if (!imageName) return "";
  return new URL(`../../../assets/client/${imageName}`, import.meta.url).href;
};

const ListBestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products`
        );
        setProducts(response.data);
        setVisibleProducts(response.data.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const handleProductClick = () => {
    navigate(path.PRODUCTSDETAILS); 
  };

  useEffect(() => {
    const updateVisibleProducts = () => {
      setVisibleProducts((prevProducts) => {
        const nextProduct = products[currentIndex % products.length];
        return [...prevProducts.slice(1), nextProduct];
      });
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    };

    if (products.length > 0) {
      const interval = setInterval(updateVisibleProducts, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, products]);

  const nextProduct = () => {
    const nextIndex = (currentIndex + 1) % products.length;
    setCurrentIndex(nextIndex);
    setVisibleProducts((prevProducts) => {
      const nextProduct = products[nextIndex];
      return [...prevProducts.slice(1), nextProduct];
    });
  };

  const prevProduct = () => {
    const prevIndex = (currentIndex - 1 + products.length) % products.length;
    setCurrentIndex(prevIndex);
    setVisibleProducts((prevProducts) => {
      const prevProduct = products[prevIndex];
      return [prevProduct, ...prevProducts.slice(0, -1)];
    });
  };

  return (
    <div className="flex flex-wrap mx-auto flex-row relative items-center group sm:px-8 lg:px-16">
      <button
        onClick={prevProduct}
        className="absolute left-0 transform -translate-y-1/2 z-10 sm:ml-4 md:ml-8 lg:ml-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <icons.IoIosArrowDropleftCircle className="text-gray-200 text-4xl" />
      </button>

      <div className="w-full sm:w-[95%] lg:w-[1170px] mt-4 ml-6 flex flex-wrap gap-x-2 gap-y-6 rounded-lg group relative mx-auto">
        {visibleProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => handleProductClick()}
            className="w-full sm:w-1/2 lg:w-[19%] p-4 flex flex-col items-start border border-gray-300 rounded-md shadow-sm bg-white"
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

      <button
        onClick={nextProduct}
        className="absolute right-0 mr-16 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <icons.IoIosArrowDroprightCircle className="text-gray-200 text-4xl" />
      </button>
    </div>
  );
};

export default ListBestSellingProducts;

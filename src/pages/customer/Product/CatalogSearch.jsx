import { useLocation } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";
import Loading from "../../../components/Client/Loading";

const getImagePath = (imageName) => {
  if (!imageName) return "";
  return new URL(`../../../assets/client/${imageName}`, import.meta.url).href;
};

const CatalogSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    const fetchProducts =  () => {
      try {
        setLoading(true);
        setTimeout(async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products`
          );
          setProducts(response.data);
          setLoading(false);
        },300);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu sản phẩm.");
        console.error(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const filteredProducts = useMemo(() => {
    if (!products.length) return [];
    return products.filter((product) => {
      const productName = product.ProductName || "";
      return productName.toLowerCase().includes(query);
    });
  }, [query, products]);

  const sortedProducts = useMemo(() => {
    if (sortType === "price_high") {
      return [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(String(a.ListedPrice).replace(/[^\d]/g, ""));
        const priceB = parseFloat(String(b.ListedPrice).replace(/[^\d]/g, ""));
        return priceB - priceA;
      });
    }
    if (sortType === "price_low") {
      return [...filteredProducts].sort((a, b) => {
        const priceA = parseFloat(String(a.ListedPrice).replace(/[^\d]/g, ""));
        const priceB = parseFloat(String(b.ListedPrice).replace(/[^\d]/g, ""));
        return priceA - priceB;
      });
    }
    return filteredProducts;
  }, [sortType, filteredProducts]);

  return (
    <div className="bg-white">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
          <div className="relative -translate-y-[140px]">
            <Loading  status={loading} />
          </div>
        </div>
      )}
      <Header />
      <div className="bg-white w-full">
        <h2 className="text-center text-lg text-gray-500 my-2">
          Tìm thấy{" "}
          <span className="font-semibold">{filteredProducts.length}</span> sản
          phẩm với từ khóa{" "}
          <span className="font-semibold">&quot;{query}&quot;</span>
        </h2>

        <div className="flex justify-start items-center ml-[183px] mb-4">
          <span className="font-semibold mr-4">Sắp xếp theo:</span>
          <button
            className={`mr-2 px-4 py-2 rounded-lg ${
              sortType === "relevant"
                ? "bg-red-100 text-red-500"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortType("relevant")}
          >
            Liên quan
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded-lg ${
              sortType === "price_high"
                ? "bg-red-100 text-red-500"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortType("price_high")}
          >
            Giá cao
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortType === "price_low"
                ? "bg-red-100 text-red-500"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortType("price_low")}
          >
            Giá thấp
          </button>
        </div>

        <div className="ml-[183px] w-[1170px] flex flex-wrap rounded-lg bg-white mt-3">
          {error && <p className="text-red-500">{error}</p>}
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <div
                key={index}
                className="product-card border p-4 m-2 w-[250px] transform transition-all duration-300  hover:translate-y-[-10px] hover:shadow-lg"
              >
                <img
                  src={
                    product.RepresentativeImage
                      ? getImagePath(product.RepresentativeImage)
                      : ""
                  }
                  alt={product.ProductName}
                  className="rounded-lg object-cover w-full h-auto transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <h3 className="mt-2 text-[16px] font-bold text-left transition-colors duration-300 ease-in-out hover:text-[#e0052b]">
                  {product.ProductName || "Unknown Product"}
                </h3>
                <p className="text-[16px] font-bold text-[#e0052b] text-left mt-1">
                  {product.ListedPrice + " ₫"}
                </p>
                <p className="text-xs text-gray-600 bg-gray-100 mt-2 p-2 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors duration-300 ease-in-out">
                  {product.Description || "No promotion available"}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-lg font-semibold text-gray-600">
              Không tìm thấy sản phẩm phù hợp. <br />
              Bạn có thể thử lại với từ khóa khác.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogSearch;

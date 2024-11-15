import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { useListProductContext } from "./useListProductContext";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";

const CatalogSearch = () => {
  const { products } = useListProductContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";


  const [sortType, setSortType] = useState("relevant"); 

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.productName.toLowerCase().includes(query)
    );
  }, [query, products]);

  const sortedProducts = useMemo(() => {
    if (sortType === "price_high") {
      return [...filteredProducts].sort(
        (a, b) => parseFloat(b.productPrice.replace(/[^\d]/g, "")) - parseFloat(a.productPrice.replace(/[^\d]/g, ""))
      );
    }
    if (sortType === "price_low") {
      return [...filteredProducts].sort(
        (a, b) => parseFloat(a.productPrice.replace(/[^\d]/g, "")) - parseFloat(b.productPrice.replace(/[^\d]/g, ""))
      );
    }
    return filteredProducts; 
  }, [sortType, filteredProducts]);

  return (
    <div className="bg-white">
      <Header />
      <div className="bg-white w-full">
        <h2 className="text-center text-2xl font-bold my-4">
          {`Kết quả tìm kiếm cho: "${query}"`}
        </h2>


        <div className="flex justify-start items-center ml-[183px] mb-4">
          <span className="font-semibold mr-4">Sắp xếp theo:</span>
          <button
            className={`mr-2 px-4 py-2 rounded-lg ${
              sortType === "relevant" ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortType("relevant")}
          >
            Liên quan
          </button>
          <button
            className={`mr-2 px-4 py-2 rounded-lg ${
              sortType === "price_high" ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortType("price_high")}
          >
            Giá cao
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              sortType === "price_low" ? "bg-red-100 text-red-500" : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSortType("price_low")}
          >
            Giá thấp
          </button>
        </div>

        <div className="ml-[183px] w-[1170px] flex flex-wrap rounded-lg bg-white mt-3">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product, index) => (
              <ProductCard
                key={index}
                sp1={product.sp1}
                km1={product.km1}
                km2={product.km2}
                productName={product.productName}
                productPrice={product.productPrice}
                promoText={product.promoText}
              />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm phù hợp.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CatalogSearch;

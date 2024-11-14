import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import ProductCard from "./ProductCard";
import PropTypes from "prop-types";
import { useListProductContext } from "./useListProductContext";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";

const CatalogSearch = () => {
  const { products } = useListProductContext();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query")?.toLowerCase() || "";

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) =>
      product.productName.toLowerCase().includes(query)
    );
  }, [query, products]);

  return (
    <div className="bg-white">
    <Header/>
      <div className="bg-white w-full">
        <h2 className="text-center text-2xl font-bold my-4">
          {`Kết quả tìm kiếm cho: "${query}"`}
        </h2>
        <div className=" ml-[183px] w-[1170px]  flex flex-wrap rounded-lg bg-white mt-3">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
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
      <Footer/>
    </div>
  );
};

CatalogSearch.propTypes = {
  products: PropTypes.array, // Không cần .isRequired
};

export default CatalogSearch;

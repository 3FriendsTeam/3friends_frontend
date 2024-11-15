import ProductCard from "./ProductCard";
import Header from "../../../components/Client/Header";
import Footer from "../../../components/Client/Footer";
import NavigationBar from "../../../pages/customer/Animations/NavigationBar";
import Animation from "../../../pages/customer/Animations/Animation";
import ProductClassification from "./ProductClassification";
import { useListProductContext } from "./useListProductContext";


const ListProducts = () => {
  const { products } = useListProductContext();
  return (
    <div className="flex flex-wrap flex-row w-full ">
      <div className="w-[1536px]">
        <Header />
      </div>
      <div className="bg-[#F2F2F2] w-[1536px] ">
        <NavigationBar current="Sản phẩm" />
        <Animation />
        <ProductClassification />
        <div
          className=" ml-[183px] w-[1170px]  flex flex-wrap rounded-lg bg-white mt-3 "
        >
          {products.map((product, index) => (
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
      </div>
      <Footer />
    </div>
  );
};

export default ListProducts;

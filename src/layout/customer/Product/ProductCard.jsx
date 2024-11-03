import PropTypes from "prop-types";

const ProductCard = ({sp1,km1,km2,productName,productPrice,promoText}) => {
  return (
    <div className="border rounded-md shadow-md p-2 relative w-[220px] h-[476px] ml-2 mt-3">
   <div className="group hover:scale-105 transition-transform duration-300 relative mt-[40px] w-[198.4px] h-[198.4px] ">
  {/* Hình sản phẩm */}
  <div className="w-full h-full relative">
    <img
      src={sp1}
      alt="iPhone 16 Pro 128GB"
      className="w-full h-full object-cover  "
    />
  </div>

  {/* Hình khuyến mãi */}
  <div className="absolute ">
    <div className="relative -ml-[8px] -mt-[70px]  ">
      <img src={km1} alt="" className="w-[60px] h-[78px]" />
    </div>
    <div className="relative -mt-[45px] ml-[150px] ">
      <img src={km2} alt="" className="w-[50px] h-[50px]" />
    </div>
  </div>
</div>

 
  {/* Tên sản phẩm */}
  <h2 className="font-bold text-base mt-6 text-left">
    {productName}
  </h2>

  {/* Giá sản phẩm */}
  <div className="text-left mt-1">
    <span className="text-[#E90628] text-[18px] font-bold">{productPrice}</span>
  </div>

  {/* Mô tả khuyến mãi */}
  <div className="text-sm text-gray-600 mt-4 text-center border border-gray-400 rounded-md bg-[#F4F2F4]">
    <p>
      {promoText}
    </p>
  </div>
</div>

  );
};

ProductCard.propTypes = {
  sp1: PropTypes.string.isRequired,           // Đảm bảo sp1 là chuỗi và bắt buộc
  km1: PropTypes.string.isRequired,           // Đảm bảo km1 là chuỗi và bắt buộc
  km2: PropTypes.string.isRequired,           // Đảm bảo km2 là chuỗi và bắt buộc
  productName: PropTypes.string.isRequired,   // Đảm bảo productName là chuỗi và bắt buộc
  productPrice: PropTypes.string.isRequired,  // Đảm bảo productPrice là chuỗi và bắt buộc
  promoText: PropTypes.string                 // Đảm bảo promoText là chuỗi
};
export default ProductCard;

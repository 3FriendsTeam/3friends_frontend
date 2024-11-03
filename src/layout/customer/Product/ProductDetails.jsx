import { useState, useContext } from "react";
import NavigationBar from "../Animations/NavigationBar";
import Footer from "../../../components/Client/Footer";
import Header from "../../../components/Client/Header";
import icons from "../../../utils/icons";
import ctsp1 from "../../../assets/client/ctsp1.jpeg";
import ProductsDescribe from "./ProductsDescribe";
import { CartContext } from "../ShoppingCart/CartContext";

const ProductDetails = () => {
  const products = [
    {
      name: "Samsung Galaxy Z Fold6 5G 12GB 256GB",
      price: "41.990.000 ₫",
    },
    {
      name: "Samsung Galaxy Z Fold6 5G 12GB 512GB",
      price: "41.990.000 ₫",
    },
    {
      name: "Samsung Galaxy Z Fold6 5G 12GB 1TB",
      price: "41.990.000 ₫",
    },
  ];

  const promotions = [
    {
      title: "Chương trình Khuyến mãi 1",
      details: [
        "Giảm giá trực tiếp và Ưu đãi mua kèm Đồng hồ 990.000đ",
        "Tặng voucher giảm giá 2.000.000đ (Đã trừ vào giá)",
        "Đổi 5000 điểm giảm thêm 4.000.000đ cho Khách hàng đổi mã trên Viettel++(trừ thẳng) hoặc Giảm 2.000.000đ kèm quyền mua Watch 6 R930 giá 990.000đ",
      ],
      icons: <icons.RiDiscountPercentFill />,
    },
    {
      title: "Chương trình Khuyến mãi 2: Thu cũ",
      details: [
        "Thu cũ đổi mới trợ giá 3.000.000đ với điện thoại cũ là điện thoại thường hoặc Trợ giá 4.000.000đ",
        "Đổi 5000 điểm giảm thêm 4.000.000đ cho Khách hàng đổi mã trên Viettel++(trừ thẳng)",
      ],
      icons: <icons.RiDiscountPercentFill />,
    },
    {
      title: "Chương trình Khuyến mãi 3: Mua kèm gói cước",
      details: ["Mua kèm gói cước giảm đến 7.000.000đ"],
      icons: <icons.RiDiscountPercentFill />,
    },
    {
      title: "Khách hàng được tặng thêm bộ quà sau",
      details: [
        "Trả góp 0% trên giá giảm cuối (qua Samsung Finance+/HC/FE hoặc qua thẻ tín dụng trên Galaxy Gift)",
        "Tặng 01 năm Samsung Care+",
        "Các ưu đãi mua kèm: Giảm giá 2.500.000đ cho Watch Ultra, Giảm 2.000.000đ cho Watch7, Giảm 800.000đ cho Buds3 Pro/ 600.000đ cho Buds3",
      ],
      icons: <icons.RiDiscountPercentFill />,
    },
  ];

  const colors = [
    { name: "Hồng", imgSrc: ctsp1 },
    { name: "Xanh", imgSrc: ctsp1 },
    { name: "Đen", imgSrc: ctsp1 },
  ];
  const images = ["https://placehold.co/333x350?text=Image+1"];

  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useContext(CartContext);
  const handleBuyNow = (product) => {
    addToCart(product);
  };

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleProductClick = (index) => {
    setSelectedIndex(index);
  };

  const [selectedColorIndex, setSelectedColorIndex] = useState(null);
  const handleColorClick = (index) => {
    setSelectedColorIndex(index);
  };

  return (
    <div className="flex flex-wrap flex-row w-full ">
      <div className="w-[1536px]">
        <Header />
      </div>
      <div className="bg-[#F2F2F2] w-[1536px] py-2 ">
        <NavigationBar current="Chi tiết sản phẩm" />
      </div>
      <div className="bg-[#F2F2F2] w-[1536px] flex justify-center items-center py-2">
        <div className="w-[1170px] flex bg-white rounded-xl">
          <div className="h-[700px] w-[585px] ">
            <div className="flex flex-col p-4  h-full">
              <div className="font-bold text-xl">
                Samsung Galaxy Z Fold6 5G 12GB 256GB
              </div>
              <div className="flex  mt-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="p-1 rounded-full">
                    <icons.FaStar className="text-yellow-400" />
                  </span>
                ))}
                <span className="text-gray-500 ml-4">7 đánh giá</span>
              </div>
              <p className="text-red-500 text-xl font-bold mt-2">
                25.990.000 ₫
              </p>
              <p className="text-[14px] text-gray-500 mt-2">
                Đã bao gồm thuế VAT
              </p>
              <div className="flex justify-between mt-2 font-medium">
                <div className="text-[#337ab7] text-[14px] flex items-center gap-1">
                  <icons.MdCompareArrows className="transform rotate-90 " />
                  So sánh sản phẩm
                </div>
                <div className="text-[#337ab7] text-[14px] flex items-center gap-1">
                  <icons.MdAddLocationAlt />
                  Tìm địa chỉ có hàng gần nhất
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {}}
                  className="absolute z-50 left-0 top-1/2 transform -translate-y-1/2 ml-[180px] mt-[220px]"
                >
                  <icons.IoIosArrowDropleftCircle className="text-gray-400 text-3xl " />
                </button>
                <div className="flex mt-6 justify-center">
                  {images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`${index + 1}`}
                      className=""
                    />
                  ))}
                </div>
                <button
                  onClick={() => {}}
                  className="absolute ml-[550px] -mt-[20px] top-1/2 transform -translate-y-1/2 z-10"
                >
                  <icons.IoIosArrowDroprightCircle className="text-gray-400 mt-[490px] text-3xl opacity-75 hover:opacity-100" />
                </button>
              </div>

              <div className="mt-[55px] font-medium">
                <ul className="flex text-[14px] gap-6 bg-[#ededed] h-[60px] rounded-xl items-center justify-center ">
                  <li className="items-center gap-1 ">
                    <div className="flex items-center gap-1 ">
                      <icons.MdLocalPolice className="" />
                      Bảo hành chính sách 12 tháng.
                    </div>
                    <span className="block text-blue-500 ">Xem điểm BH</span>
                  </li>
                  <li>
                    <div className="flex items-center gap-1">
                      <icons.MdLocalPolice className="" />1 đổi 1 trong 60 ngày.
                    </div>
                    <span className="block text-blue-500">Tìm hiểu</span>
                  </li>
                  <li>
                    Giao hàng miễn phí
                    <span className="block"> 10km.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col p-4 w-[585px] h-[700px] ${
              isExpanded ? "overflow-y-scroll" : ""
            }`}
          >
            <h2 className="text-[16px] font-semibold">
              LỰA CHỌN CẤU HÌNH VÀ MÀU SẮC
            </h2>
            <div className="flex space-x-4 mt-2 text-[14px] text-center">
              {products.map((product, index) => (
                <div
                  key={index}
                  className={`border rounded-xl ${
                    selectedIndex === index
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <button
                    className="font-semibold p-1 rounded-md"
                    onClick={() => handleProductClick(index)}
                  >
                    {product.name}
                  </button>
                  <span className="text-[#555458] font-semibold">
                    {product.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4 mt-2 text-[14px]">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`border p-2 rounded-xl flex items-center gap-2 w-[calc(20%+20px)] ${
                    selectedColorIndex === index
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onClick={() => handleColorClick(index)}
                >
                  <img
                    src={color.imgSrc}
                    alt={color.name}
                    className="h-[40px] w-[42px]"
                  />
                  <p>{color.name}</p>
                </button>
              ))}
            </div>

            <div className="bg-[#f2f2f2] mt-4 rounded-lg border border-gray-300 -mb-2">
              <div className="flex justify-between items-center mt-3 mx-2 mb-4">
                <p className="text-[14px] font-bold">Khuyến mãi</p>
                <p className="text-[12px]">
                  Giá và khuyến mãi áp dụng đặt và nhận hàng từ 7/10 - 15/10
                </p>
              </div>
            </div>
            <div
              className={`pt-8 pr-4 pb-4 pl-4 bg-gray-100 border border-gray-300 rounded-bl-lg rounded-br-lg transition-all duration-300 ${
                isExpanded ? "" : "h-[340px]"
              }`}
            >
              {promotions.map((promo, index) => (
                <div key={index} className="bg-white p-2 rounded pt-4 -mt-4">
                  <h3 className="text-[14px] flex items-center ml-2">
                    <span className="text-yellow-500 mr-2">{promo.icons}</span>
                    {promo.title}
                  </h3>
                  <ul className={`list-none text-[14px] ml-2`}>
                    {promo.details
                      .slice(0, isExpanded ? promo.details.length : 1)
                      .map((detail, idx) => (
                        <li key={idx} className="flex items-center mb-1">
                          <span className="text-yellow-500 mr-2">
                            {promo.icons}
                          </span>
                          {detail}
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
              <button
                onClick={toggleDetails}
                className="bg-white rounded-xl text-[14px] mt-3 flex items-center justify-center mx-auto p-1 gap-1 w-[100px]"
              >
                {isExpanded ? "Ẩn bớt" : "Đọc thêm"}
                {isExpanded ? <icons.IoIosArrowUp /> : <icons.IoIosArrowDown />}
              </button>
            </div>
            <div className="bg-[#e90628] flex flex-col items-center justify-center rounded-lg mt-4 h-[69px]">
              <button
                onClick={() =>
                  handleBuyNow({
                    name: "Samsung Galaxy Z Fold6 5G 12GB 512GB",
                    price: "25.990.000 ₫",
                  })
                }
                className="text-white text-[20px] font-bold"
              >
                MUA NGAY
              </button>
              <span className="text-white font-semibold">
                Thoải mái lựa chọn, xem hàng tại nhà
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <ProductsDescribe />
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;

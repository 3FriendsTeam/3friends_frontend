import { useEffect, useState } from "react";
import icons from "../../../utils/icons";
import axios from "axios";
import PropTypes from "prop-types";

const ProductClassification = ({ categoryId, onSortChange }) => {
  const [productCount, setProductCount] = useState(0);
  const images = [
    "https://placehold.co/153x40?text=Image+1",
    "https://placehold.co/153x40?text=Image+2",
    "https://placehold.co/153x40?text=Image+3",
    "https://placehold.co/153x40?text=Image+4",
    "https://placehold.co/153x40?text=Image+5",
    "https://placehold.co/153x40?text=Image+6",
    "https://placehold.co/153x40?text=Image+7",
  ];

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-product-by-id-category`,
          {
            params: { id: categoryId },
          }
        );
        setProductCount(response.data.length);
      } catch (error) {
        console.error("Error fetching product count:", error);
      }
    };

    if (categoryId) {
      fetchProductCount();
    }
  }, [categoryId]);

  return (
    <div className="p-6 w-[1536px] flex justify-center bg-[#F2F2F2] -mb-12">
      <div className="w-[1170px] bg-white rounded-2xl">
        <div className="flex items-center gap-4 ml-6 mt-4">
          <h1 className="text-2xl font-bold mb-2 text-[#333]">Điện thoại</h1>
          <p className="text-gray-600">{productCount} sản phẩm</p>
        </div>
        <p className="ml-6 font-bold text-[#333]">Hãng sản xuất</p>

        <div className="flex flex-wrap mt-4 mb-6 ml-6">
          <div className="flex items-center space-x-2">
            {images.map((src, index) => (
              <img key={index} src={src} alt={`${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-col mb-4 ml-6 text-[#333]">
          <span className="mr-4 font-bold">Lọc theo</span>
          <div className="flex flex-wrap mt-2 text-[14px]">
            <button className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1">
              <icons.FaFilter />
              Mức giá
            </button>
            <button className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1">
              Màn hình
              <icons.IoMdArrowDropdown />
            </button>
            <button className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1">
              Camera sau
              <icons.IoMdArrowDropdown />
            </button>
            <button className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1">
              Hệ điều hành
              <icons.IoMdArrowDropdown />
            </button>
            <button className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1">
              Tính năng đặc biệt
              <icons.IoMdArrowDropdown />
            </button>
          </div>
        </div>

        {/* Sắp xếp theo */}
        <div className="flex flex-col mb-8 ml-6 text-[#333]">
          <span className="mr-4 font-bold">Sắp xếp theo</span>
          <div className="flex flex-wrap mt-2 text-[14px]">
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => onSortChange("newest")}
            >
              Mới nhất
            </button>
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => onSortChange("sold")}
            >
              Bán chạy
            </button>
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => onSortChange("price_high")}
            >
              Giá tăng
            </button>
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => onSortChange("price_low")}
            >
              Giá giảm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
ProductClassification.propTypes = {
  categoryId: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
export default ProductClassification;

import icons from "../../../utils/icons";
import PropTypes from "prop-types";

const ProductClassification = ({ onFilterChange, onSortChange   }) => {
  const images = [
    "https://placehold.co/153x40?text=Image+1",
    "https://placehold.co/153x40?text=Image+2",
    "https://placehold.co/153x40?text=Image+3",
    "https://placehold.co/153x40?text=Image+4",
    "https://placehold.co/153x40?text=Image+5",
    "https://placehold.co/153x40?text=Image+6",
    "https://placehold.co/153x40?text=Image+7",
  ];

  const handleAction = (type, value) => {
    if (type === "filter") {
      onFilterChange({ priceRange: value, sortOrder: "" });
    } else if (type === "sort") {
      onSortChange({ priceRange: "", sortOrder: value });
    }
  };

  return (
    <div className="p-6 w-full max-w-[1536px] mx-auto flex justify-center bg-[#F2F2F2] -mb-12">
      <div className="w-full lg:w-[1170px] bg-white rounded-2xl">
        <p className="mt-6 ml-6 font-bold text-[#333]">Hãng sản xuất</p>
        <div className="flex flex-wrap mt-4 mb-6 ml-6">
          <div className="flex items-center space-x-2">
            {images.map((src, index) => (
              <img key={index} src={src} alt={`${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Lọc theo */}
        <div className="flex flex-col mb-4 ml-6 text-[#333]">
          <span className="mr-4 font-bold">Lọc theo</span>
          <div className="flex flex-wrap mt-2 text-[14px]">
            <p className="rounded-md px-3 py-1 mr-2 flex items-center gap-1">
              <icons.FaFilter />
              Mức giá:
            </p>
            <button
              onClick={() => handleAction("filter", "under5")}
              className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1"
            >
              Dưới 5 triệu
            </button>
            <button
              onClick={() => handleAction("filter", "5to10")}
              className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1"
            >
              Từ 5 - 10 triệu
            </button>
            <button
              onClick={() => handleAction("filter", "10to15")}
              className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1"
            >
              Từ 10 - 15 triệu
            </button>
            <button
              onClick={() => handleAction("filter", "to15")}
              className="border border-gray-200 rounded-md px-3 py-1 mr-2 flex items-center gap-1"
            >
              Trên 15 triệu
            </button>
          </div>
        </div>

        {/* Sắp xếp theo */}
        <div className="flex flex-col mb-8 ml-6 text-[#333]">
          <span className="mr-4 font-bold">Sắp xếp theo</span>
          <div className="flex flex-wrap mt-2 text-[14px]">
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => handleAction("sort", "newest")}
            >
              Mới nhất
            </button>
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => handleAction("sort", "sold")}
            >
              Bán chạy
            </button>
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => handleAction("sort", "price_high")}
            >
              Giá tăng
            </button>
            <button
              className="border border-gray-200 rounded-md px-3 py-1 mr-2"
              onClick={() => handleAction("sort", "price_low")}
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
  onFilterChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};

export default ProductClassification;

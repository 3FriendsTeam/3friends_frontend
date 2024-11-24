import { useState } from "react";
import PropTypes from "prop-types";
import icons from "../../../utils/icons";

const ProductReview = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [rating, setRating] = useState(5);
  return (
    <div className="bg-[#F2F2F2] w-[1536px] pb-6">
      <div className="ml-[170px] w-full max-w-[785px] mx-auto p-4 border rounded-lg shadow-lg bg-white">
        <div className="text-center">
          <div className="flex justify-start space-x-2">
            <h2 className="text-[16px] font-bold text-gray-800">
              Đánh giá & nhận xét
            </h2>
            <h3 className="text-[16px] font-bold text-gray-800">
              <span> {product.ProductName}</span> | Chính hãng VN/A
            </h3>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <div className="w-1/3 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">5.0/5</div>
            <p className="text-sm text-gray-500 ml-2">(205 đánh giá)</p>
          </div>

          <div className="w-2/3">
            {[5, 4, 3, 2, 1].map((star) => (
              <div
                key={star}
                className="flex items-center text-[14px] gap-4 mb-2"
              >
                <span className="text-gray-700">{star} ⭐</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3 relative">
                  <div
                    className={`bg-yellow-500 h-3 rounded-full ${
                      star === 5 ? "w-[95%]" : star === 4 ? "w-[3%]" : "w-0"
                    }`}
                  ></div>
                </div>
                <span className="text-gray-500 text-[14px]">
                  {star === 5
                    ? "199 đánh giá"
                    : star === 4
                    ? "6 đánh giá"
                    : "0 đánh giá"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center">
        <div className="border-t border-gray-300 mb-4"></div>
          <button
            onClick={openModal}
            className="bg-[#e0052b] text-white py-2 px-6 rounded-lg hover:bg-[#f00]"
          >
            Mua ngay
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white max-w-lg w-full p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Đánh giá & nhận xét
            </h2>
            <h3 className="text-lg text-gray-600 text-center mb-6">
              <span>{product?.ProductName || "Sản phẩm"}</span> | Chính hãng
              VN/A
            </h3>

            <div className="mb-6">
              <p className="font-semibold text-gray-800 mb-2">Đánh giá chung</p>
              <div className="flex justify-between items-center">
                {["Rất tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"].map(
                  (label, index) => (
                    <button
                      key={index + 1}
                      onClick={() => setRating(index + 1)}
                      className="flex flex-col items-center"
                    >
                      <span
                        className={`text-2xl transition-transform ${
                          index + 1 <= rating
                            ? "text-[#ffbf00]"
                            : "text-gray-400 hover:text-[#ffbf00]"
                        }`}
                      >
                        <icons.FaStar />
                      </span>
                      <p
                        className={`text-sm mt-1 transition-colors ${
                          index + 1 <= rating
                            ? "text-gray-800 "
                            : "text-gray-400 "
                        }`}
                      >
                        {label}
                      </p>
                    </button>
                  )
                )}
              </div>
            </div>

            <textarea
              placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 ký tự)"
              className="w-full border border-gray-300 rounded-lg p-3 mb-6 focus:outline-none focus:ring-1 focus:ring-blue-300"
              rows="4"
            ></textarea>

            <button className="w-full bg-[#e0052b] text-white py-2 rounded-lg hover:bg-[#f00]">
              Gửi đánh giá
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
ProductReview.propTypes = {
  product: PropTypes.string.isRequired,
};
export default ProductReview;

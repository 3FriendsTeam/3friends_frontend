import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import icons from "../../../utils/icons";
import des1 from "../../../assets/client/des1.jpg";

const ProductsDescribe = ({ productId }) => {
  const [showAll, setShowAll] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [parameters, setParameters] = useState([]);
  const [descriptionChunks, setDescriptionChunks] = useState([]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/get-product-by-id`,
          {
            params: { id: productId },
          }
        );
        const product = response.data;
        const description = product.Description || "No description available";

        const chunkSize = 3;
        const chunks = [];
        const descriptionLines = description.split("\r\n");
        for (let i = 0; i < descriptionLines.length; i += chunkSize) {
          chunks.push(descriptionLines.slice(i, i + chunkSize).join(" "));
        }
        setDescriptionChunks(chunks);

        const productAttributeDetails = product.ProductAttributeDetails || [];
        const formattedParameters = productAttributeDetails.reduce(
          (acc, item) => {
            const section = item.ProductAttribute?.AttributeName || "Unknown";
            const value = item.AttributeValue || "N/A";
            const existingSection = acc.find((p) => p.section === section);
            if (existingSection) {
              existingSection.rows.push({ label: section, value });
            } else {
              acc.push({
                section,
                rows: [{ label: section, value }],
              });
            }
            return acc;
          },
          []
        );
        setParameters(formattedParameters);
      } catch (error) {
        console.error("Error fetching product attributes:", error);
      }
    };
    if (productId) {
      fetchAttributes();
    }
  }, [productId]);

  return (
    <div className="bg-[#f2f2f2f2] w-[1536px] flex pb-4 pt-1">
      <div className="bg-[#fff] w-[780px] rounded-xl ml-[174px]">
        <div
          className={`relative overflow-hidden transition-all duration-300 ${
            showMore ? "max-h-full" : "max-h-[510px]"
          }`}
          style={
            !showMore
              ? {
                  maskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 450px, rgba(0, 0, 0, 0.3) 500px)",
                }
              : {}
          }
        >
          <p className="text-[22px] py-4 px-6 font-semibold ">
            Đặc điểm nổi bật
          </p>
          {descriptionChunks
            .slice(0, showMore ? descriptionChunks.length : 1)
            .map((chunk, index) => (
              <div key={index}>
                <h3 className="text-[15px] px-6">{chunk}</h3>
                <img
                  src={des1}
                  alt={`Mô tả sản phẩm ${index + 1}`}
                  className="w-[600px] h-[355px] mx-auto my-4"
                />
                <p className="text-center text-[12px] mb-4 -mt-4 ">Những cải tiến mới trên camera iPhone 16 Pro đem tới những hình ảnh sắc nét và chân thực</p>
              </div>
            ))}
        </div>

        <div className="flex justify-center py-4 ">
          <button
            onClick={toggleShowMore}
            className="bg-white py-2 -m-7 px-4  rounded-2xl flex items-center justify-center text-[13px] gap-1  z-10 shadow-xl absolute"
          >
            {showMore ? "Ẩn bớt" : "Đọc thêm"}
            {showMore ? <icons.IoIosArrowUp /> : <icons.IoIosArrowDown />}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-4 relative w-[375px] ml-4 h-[500px] ">
        <div className="flex justify-between mb-4">
          <p className="font-bold">Thông số kĩ thuật</p>
        </div>
        <div>
          {parameters.map((parameter, index) => (
            <div
              key={index}
              className={`flex justify-between items-center px-4 py-3 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }`}
            >
              {parameter.rows.length > 0 && (
                <>
                  <span className="font-semibold w-[30%] text-left text-nowrap">
                    {parameter.rows[0].label}
                  </span>
                  <span className="w-[55%] text-left text-nowrap">
                    {parameter.rows[0].value}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>

        <button
          className="-ml-[16px] text-blue-600  px-4 py-2  bg-[#f4f4f4] w-[375px] mt-5  rounded-bl-xl rounded-br-xl flex items-center justify-center gap-1 "
          onClick={() => setShowAll(true)}
        >
          Xem cấu hình chi tiết
          <span>{icons.IoIosArrowForward && <icons.IoIosArrowForward />}</span>
        </button>

        {showAll && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-[610px] h-[650px] flex flex-col justify-center items-center relative">
              <div className="w-full">
                <p className="text-[19px] mb-3 text-center -ml-[360px] -mt-2 items-center ">
                  Chi tiết thông số kỹ thuật
                </p>
                <span
                  className="absolute right-4 top-4 cursor-pointer"
                  onClick={() => setShowAll(false)}
                >
                  <span className="text-sm">✖</span>
                </span>

                <hr className="mt-4 mb-3 border-gray-300 w-full " />
              </div>

              <div className="w-full h-[550px] overflow-y-auto ">
                {parameters.map((parameter, index) => (
                  <div key={index} className="text-center  ">
                    <h3 className=" font-semibold justify-start flex w-full bg-[#ededed] h-[40px] items-center rounded-sm mb-2.5">
                      {parameter.section}
                    </h3>
                    {parameter.rows.map((row, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="text-left  flex text-[14px]  "
                      >
                        <h4 className="whitespace-nowrap flex-shrink-0 w-[150px]">
                          {row.label}
                        </h4>
                        <span className="ml-10 pb-2.5">{row.value}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
ProductsDescribe.propTypes = {
  productId: PropTypes.string.isRequired,
};
export default ProductsDescribe;

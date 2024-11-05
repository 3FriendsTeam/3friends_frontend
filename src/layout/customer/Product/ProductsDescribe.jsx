import { useState } from "react";
import des1 from '../../../assets/client/des1.jpg';
import icons from "../../../utils/icons";

const ProductsDescribe = () => {
  const [showAll, setShowAll] = useState(false);

  const [showMore, setShowMore] = useState(false); // Trạng thái kiểm soát việc hiển thị

  const toggleShowMore = () => {
    setShowMore(!showMore); // Đảo ngược trạng thái mỗi khi bấm vào nút
  };
  const describles = [
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 ra mắt được ví như một kiệt tác công nghệ mới, đánh dấu bước ngoặt trong lĩnh vực điện thoại thông minh gập. Với thiết kế hiện đại và hiệu suất đỉnh cao Z Fold6 mang đến trải nghiệm công nghệ đột phá, kết hợp giữa sự tinh tế và khả năng sử dụng tối ưu. ",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
    {
      title: "Đặc điểm nổi bật",
      des: "Samsung Galaxy Z Fold6 sở hữu thiết kế mỏng nhẹ nhất từ trước đến nay, với vẻ ngoài sang trọng cùng các đường nét tinh tế. Kế thừa thiết kế vuông vức từ dòng Galaxy S24, Z Fold6 không chỉ mang lại cảm giác cầm nắm chắc chắn mà còn tối ưu hóa không gian khi gập máy. Với độ dày chỉ 12.1mm khi gập và 5.6mm khi mở cùng trọng lượng 239g, thiết bị này dễ dàng bỏ túi mà không gây cảm giác nặng nề.",
      images: des1,
      imageName: "Samsung Galaxy Z Fold6 Front View",
      des1: "Khung máy của Z Fold6 được thiết kế để giảm thiểu khe hở khi gập, tạo nên sự liền mạch tuyệt đối. Điều này không chỉ cải thiện độ bền mà còn tạo nên vẻ ngoài hoàn mỹ, đáp ứng được tiêu chuẩn thẩm mỹ cao của người dùng hiện đại.",
    },
  ];
  const parameters = [
    {
      section: "Màn hình",
      rows: [
        {
          label: "Loại màn hình",
          value: 'Dynamic AMOLED 2X, Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
        {
          label: "Độ phân giải",
          value:
            "Màn hình chính: 2160 x 1856 (QXGA+), Màn hình phụ: 968 x 2376 (HD+)",
        },
        {
          label: "Kích thước màn hình",
          value: 'Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
      ],
    },
    {
      section: "Màn hình",
      rows: [
        {
          label: "Loại màn hình",
          value: 'Dynamic AMOLED 2X, Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
        {
          label: "Độ phân giải",
          value:
            "Màn hình chính: 2160 x 1856 (QXGA+), Màn hình phụ: 968 x 2376 (HD+)",
        },
        {
          label: "Kích thước màn hình",
          value: 'Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
      ],
    },
    {
      section: "Màn hình",
      rows: [
        {
          label: "Loại màn hình",
          value: 'Dynamic AMOLED 2X, Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
        {
          label: "Độ phân giải",
          value:
            "Màn hình chính: 2160 x 1856 (QXGA+), Màn hình phụ: 968 x 2376 (HD+)",
        },
        {
          label: "Kích thước màn hình",
          value: 'Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
      ],
    },
    {
      section: "Màn hình",
      rows: [
        {
          label: "Loại màn hình",
          value: 'Dynamic AMOLED 2X, Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
        {
          label: "Độ phân giải",
          value:
            "Màn hình chính: 2160 x 1856 (QXGA+), Màn hình phụ: 968 x 2376 (HD+)",
        },
        {
          label: "Kích thước màn hình",
          value: 'Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
      ],
    },
    {
      section: "Màn hình",
      rows: [
        {
          label: "Loại màn hình",
          value: 'Dynamic AMOLED 2X, Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
        {
          label: "Độ phân giải",
          value:
            "Màn hình chính: 2160 x 1856 (QXGA+), Màn hình phụ: 968 x 2376 (HD+)",
        },
        {
          label: "Kích thước màn hình",
          value: 'Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
      ],
    },
    {
      section: "Màn hình",
      rows: [
        {
          label: "Loại màn hình",
          value: 'Dynamic AMOLED 2X, Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
        {
          label: "Độ phân giải",
          value:
            "Màn hình chính: 2160 x 1856 (QXGA+), Màn hình phụ: 968 x 2376 (HD+)",
        },
        {
          label: "Kích thước màn hình",
          value: 'Màn hình chính: 7.6", Màn hình phụ: 6.3"',
        },
      ],
    },
  ];

  return (
    <div className="bg-[#f2f2f2f2] w-[1536px] flex pb-4 pt-1">
      <div className="bg-[#fff] w-[780px] rounded-xl ml-[174px]">
        {/* Áp dụng mask-image để làm mờ dần từ 400px đến 500px */}
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
          {describles.map((describle, index) => (
            <ul key={index} className="ml-[15px] mr-4">
              <li>
                <h3
                  className={`font-semibold text-[21px] ${
                    index === 0 ? "pt-6" : "pt-4"
                  }`}
                >
                  {describle.title}
                </h3>
                <p
                  className={`pt-2 text-[14px] ${
                    index === 0 ? "font-semibold" : ""
                  }`}
                >
                  {describle.des}
                </p>
                <img
                  src={describle.images}
                  className="justify-between items-center flex mx-auto py-3"
                  alt=""
                />
                <p className="text-center text-[14px] italic">
                  {describle.imageName}
                </p>
                <p className="pt-2 text-[14px]">{describle.des1}</p>
              </li>
            </ul>
          ))}
        </div>

        {/* Nút Đọc thêm/Ẩn bớt */}
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

      <div className="bg-white shadow-md rounded-xl p-4 relative w-[375px] ml-4 h-[545px] ">
        <div className="flex justify-between mb-4">
          <p className="font-bold">Thông số kĩ thuật</p>
          <p>Thông tin hàng hóa</p>
        </div>

        <div>
          {parameters.map((parameter, index) => (
            <div key={index} className="mb-4 flex text-[14px]">
              <h3 className="font-semibold py-2 whitespace-nowrap">
                {parameter.section}
              </h3>
              <div className="flex justify-between py-2 pl-6">
                <span className="">{parameter.rows[0].value}</span>
              </div>
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
                  className="absolute right-4 top-4 cursor-pointer" // Điều chỉnh vị trí bằng Tailwind CSS
                  onClick={() => setShowAll(false)}
                >
                  <span className="text-xl">X</span>{" "}
                  {/* Dùng lớp Tailwind CSS cho kích thước */}
                </span>

                <hr className="mt-4 mb-3 border-gray-300 w-full " />
              </div>

              {/* Nội dung cuộn được */}
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

export default ProductsDescribe;

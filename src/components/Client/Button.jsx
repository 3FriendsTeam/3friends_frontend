import PropTypes from "prop-types";
import icons from "../../utils/icons";

const {
  BsFillPhoneFill,
  BsFillLaptopFill,
  FaTablet,
  IoWatchSharp,
  GiRiceCooker,
  HiMiniTv,
  RiVipCrown2Fill,
} = icons;

const Button = () => {
  const buttons = [
    { text: "Điện thoại", IcAfter: BsFillPhoneFill },
    { text: "Laptop", IcAfter: BsFillLaptopFill },
    { text: "Máy tính bảng", IcAfter: FaTablet },
    { text: "Đồng hồ thông minh", IcAfter: IoWatchSharp },
    { text: "Phụ kiện", IcAfter: BsFillPhoneFill },
    { text: "Điện máy - Gia dụng", IcAfter: GiRiceCooker },
    { text: "Tivi", IcAfter: HiMiniTv },
    { text: "Mua kèm gói cước", IcAfter: RiVipCrown2Fill },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center w-full gap-2 mt-2  lg:gap-4">
      {buttons.map(({ text, textColor, bgColor, IcAfter }, index) => (
        <div className="relative group" key={index}>
          <button
            type="button"
            className={`p-2 ${textColor} ${bgColor} outline-none rounded-md hover:opacity-50 flex items-center justify-center gap-1 h-[40px]`}
          >
            <span>{IcAfter && <IcAfter />}</span>
            <span className="text-sm md:text-base">{text}</span>
          </button>
          <div className="fixed left-0 right-0 top-[60px] w-screen h-[200px] mt-[110px] bg-[#FFFFFF] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 border-t border-gray-300">
            <div className="p-4 max-w-[1536px] mx-auto">
              <h3 className="text-black font-bold text-lg">
                Nội dung hiển thị
              </h3>
              <p className="text-black">
                Đây là nội dung của thẻ xuất hiện khi hover vào button.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

Button.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      textColor: PropTypes.string,
      bgColor: PropTypes.string,
      IcAfter: PropTypes.elementType,
    })
  ),
};

export default Button;

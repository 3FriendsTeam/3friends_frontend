import PropTypes from "prop-types";

const Button = ({ text, textColor, bgColor, IcAfter }) => {
  return (
    <div className="relative group">
      <button
        type="button"
        className={`p-2 ${textColor} ${bgColor} outline-none rounded-md hover:opacity-50 flex items-center justify-center gap-1 h-[50px]`}
      >
        <span>{IcAfter && <IcAfter />}</span>
        <span>{text}</span>
      </button>

      <div className="fixed left-0 right-0 top-[60px] w-screen h-[200px] mt-[100px] bg-[#FFFFFF] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 border-t border-gray-300">
        <div className="p-4 max-w-[1536px] mx-auto ">
          <h3 className="text-black font-bold text-lg">Nội dung hiển thị</h3>
          <p className="text-black">
            Đây là nội dung của thẻ xuất hiện khi hover vào button.
          </p>
        </div>
      </div>
    </div>
  );
};
// Khai báo propTypes cho Button
Button.propTypes = {
  text: PropTypes.string.isRequired, // Đảm bảo text là chuỗi và bắt buộc
  textColor: PropTypes.string, // textColor là chuỗi
  bgColor: PropTypes.string, // bgColor là chuỗi
  IcAfter: PropTypes.elementType, // IcAfter là một component hoặc phần tử React
};

export default Button;

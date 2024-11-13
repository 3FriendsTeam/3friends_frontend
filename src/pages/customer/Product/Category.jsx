
import category from "../../../assets/client/category1.png";

const Category = () => {
  return (
    <div className="w-[1536px]   bg-[#F2F2F2] ">
        <div className="w-[1170px] h-[249px] mx-auto py-6 bg-white rounded-lg px-[50px] ">
          <h2 className="text-xl font-bold mb-8 -ml-4 ">Danh mục nổi bật</h2>
          <div className="flex justify-between text-[12px] " >
            {/* Sử dụng flex để đặt tất cả danh mục trong 1 hàng */}
            {/* Category 1 */}
            <div
              className="flex flex-col items-center bg-pink-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt=" " className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 ml-10 w-[112px] ">Điện Thoại</span>
            </div>
            {/* Category 2 */}
            <div
              className="flex flex-col items-center bg-green-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt="" className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 ml-16 w-[112px]">Laptop</span>
            </div>
            {/* Category 3 */}
            <div
              className="flex flex-col items-center bg-blue-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt="  " className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 w-[112px] ml-5">Máy Tính Bảng</span>
            </div>
            {/* Category 4 */}
            <div
              className="flex flex-col items-center bg-purple-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt=" " className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 w-[112px] ml-1 text-center ">Đồng Hồ Thông Minh</span>
            </div>
            {/* Category 5 */}
            <div
              className="flex flex-col items-center bg-yellow-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt=" " className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 w-[112px] ml-16">Phụ Kiện</span>
            </div>
            {/* Category 6 */}
            <div
              className="flex flex-col items-center bg-orange-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt=" " className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 w-[112px] ml-16">Gia Dụng</span>
            </div>
            {/* Category 7 */}
            <div
              className="flex flex-col items-center bg-red-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }}
            >
              <img src={category} alt=" " className="w-[48px] h-[60px] mb-4" />
              <span className="text-[13px] font-bold mt-2 w-[112px] ml-16">Sim Số</span>
            </div>
            {/* Category 8 */}
            <div
              className="flex flex-col items-center bg-teal-100 p-4 rounded-lg group hover:scale-110 transition-transform duration-300 relative"
              style={{ width: "95px", height: "95px" }} 
            >
              <img src={category} alt=" " className="w-[48px] h-[60px] mb-4" />
              <span className=" text-[13px] font-bold mt-2 w-[112px] ml-10">Thanh Toán</span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Category;

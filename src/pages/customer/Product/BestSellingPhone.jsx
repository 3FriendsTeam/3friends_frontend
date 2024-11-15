
import { NavLink } from "react-router-dom";
import { path } from "../../../utils/constant";
import icons from "../../../utils/icons";
import ListBestSellingProducts from "./ListBestSellingProducts";

const BestSellingPhone = () => {

  const handleLinkClick = () => {
    window.scrollTo(0, 0); 
};


  return (
    <div className="w-[1536px] bg-[#F2F2F2] flex flex-col relative py-4 ">
      <div className="flex justify-between w-[1170px] h-[608px] mx-auto py-6 bg-white rounded-lg ">
        <div className=" font-bold text-[22px] ml-6 mt-2 whitespace-nowrap">
          Điện thoại bán chạy
        </div>
        <NavLink
          to={path.LISTPRODUCTS}
          className="w-[110px] h-[31px] whitespace-nowrap text-blue-500 rounded-[30px] bg-slate-200 text-[13px] mr-2 flex justify-center items-center gap-1 relative z-10 mt-2"
          onClick={handleLinkClick}
        >
          Xem tất cả
          <icons.IoIosArrowForward />
        </NavLink>
      </div>

      <div className=" flex flex-row -mt-[550px]  ">
        <ListBestSellingProducts />
      </div>

    </div>
  );
};

export default BestSellingPhone;

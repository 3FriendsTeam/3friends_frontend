import { NavLink } from "react-router-dom";
import icons from "../../utils/icons";
import { path } from "../../utils/constant";
import logohome3 from "../../assets/client/logohome3.png";
import { useEffect, useState } from "react";

function Toolbar() {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      {/* searchbar */}
      <div className=" bg-[#EE0033] flex flex-col md:flex-row md:h-16 items-center ">
        <div className="ml-4 md:ml-[183px] z-50">
          <div className="border border-transparent rounded p-2 bg-transparent ">
            <NavLink to="/">
              <img
                src={logohome3}
                alt="logo"
                className=" h-[70px] w-[167px] "
              />
            </NavLink>
          </div>
        </div>

        <div className="flex items-center border rounded-2xl bg-white mt-2 md:mt-0 ml-4 md:ml-6 w-full md:w-[335px] h-10 md:h-[38px] z-50">
          <div className="ml-3">
            <icons.IoSearch />
          </div>
          <input
            type="text"
            placeholder="Bạn cần tìm sản phẩm nào..."
            className="w-full border-none outline-none px-2 py-1 bg-transparent"
          />
        </div>

        <div
          className="text-xs text-white p-2 rounded-xl ml-6 w-auto z-50 md:w-[141px] h-[40px] mt-2 md:mt-0  hidden md:flex"
          style={{ backgroundColor: "#C81B1B" }}
        >
          <div className="flex justify-between items-center h-full ">
            <div className="flex flex-col">
              <p>Xem giá tồn kho tại:</p>
              <span className="font-bold">Toàn Quốc</span>
            </div>
            <div className="flex items-center">
              <icons.TiArrowSortedDown className="text-white text-lg" />
            </div>
          </div>
        </div>

        <div
          className="text-xs text-white p-3  z-50  rounded-xl ml-8 w-auto md:w-[140px] h-[40px] mt-2 md:mt-0 hidden md:flex "
          style={{ backgroundColor: "#C81B1B" }}
        >
          <div className="flex justify-between items-center h-full">
            <div className="flex items-start">
              <icons.FaPhone className="text-white text-lg mr-1" />
            </div>
            <div className="flex flex-col">
              <span className="whitespace-nowrap">Tư vấn mua hàng:</span>
              <span className="font-bold">1900 8123</span>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col md:flex-row justify-center items-center mt-4 md:mt-0 ">
          <div className="text-xs text-white p-3 rounded-xl w-[122px] h-[80px]  z-50 ">
            <div className="flex flex-col justify-center items-center h-full">
              <div className="flex mb-1">
                <icons.FaShopify className="text-white text-2xl" />
              </div>
              <div className="flex flex-col items-center whitespace-nowrap">
                <NavLink to={path.LOOKORDERS} className="font-bold">
                  Tra cứu đơn hàng
                </NavLink>
              </div>
            </div>
          </div>

          <div className="text-xs text-white rounded-xl w-[85px] h-[80px] hidden md:flex ml-3">
            <div className="flex flex-col justify-center items-center h-full  z-50 ">
              <div className="flex items-start mb-1">
                <icons.TbTruckDelivery className="text-white text-2xl" />
              </div>
              <div className="flex flex-col items-center">
                <NavLink to={path.SHOPPINGCART} className="font-bold">
                  Giỏ hàng
                </NavLink>
              </div>
            </div>
          </div>

          {/* Nút Đăng nhập / Xin chào */}
          <div className="text-xs text-white rounded-xl w-[85px] h-[80px] hidden md:flex relative">
            <div className="flex flex-col justify-center z-50  items-center h-full cursor-pointer">
              <div className="flex items-start mb-1">
                <icons.RxAvatar className="text-white text-2xl" />
              </div>
              <div
                className="flex flex-col items-center"
                onClick={toggleDropdown}
              >
                {username ? (
                  <span className="font-bold  whitespace-nowrap  ">
                    Xin chào, {username}
                  </span>
                ) : (
                  <NavLink to={path.CUSTOMERLOGIN} className="font-bold">
                    Đăng nhập
                  </NavLink>
                )}
              </div>
            </div>

            <div className="relative">
              {/* Overlay */}
              {isDropdownOpen && (
                <div
                  className="fixed inset-0 bg-black opacity-50 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                ></div>
              )}

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border rounded-lg shadow-lg z-20 px-3">
                  <div className="mt-2 p-2 flex items-center border-[1.5px] border-red-500 rounded-lg h-[50px]">
                    <img
                      src="https://via.placeholder.com/50"
                      alt="S-Ant"
                      className="w-10 h-10 mr-3"
                    />
                    <div className="flex justify-between items-center w-full">
                      <NavLink
                        to={path.FMEMBER}
                        className="text-red-500 font-bold text-[14px]"
                      >
                        Truy cập 3Fmember
                      </NavLink>
                      <span className="text-red-500 text-[20px]">
                        <icons.IoIosArrowForward />
                      </span>
                    </div>
                  </div>

                  <div className="p-4 text-center">
                    <h3 className="text-gray-600 font-bold mb-2">Thông báo</h3>
                    <img
                      src="https://via.placeholder.com/100"
                      alt="Thông báo trống"
                      className="mx-auto mb-2"
                    />
                    <p className="text-gray-600 font-semibold">
                      Ở đây hơi trống trải.
                    </p>
                    <p className="text-gray-500 text-sm">
                      S-Ant sẽ gửi cho bạn những thông báo mới nhất tại đây nhé!
                    </p>
                  </div>

                  <button
                    className="w-full py-3 text-blue-600 font-semibold border-t hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Đóng
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Toolbar;

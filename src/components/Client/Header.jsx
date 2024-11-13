import { useCallback, useEffect, useState } from "react";
import anh1 from "../../assets/client/anh1.jpg";
import anh2 from "../../assets/client/anh2.jpg";
import anh3 from "../../assets/client/anh3.png";
import icons from "../../utils/icons";
import Button from "./Button";
import Toolbar from "./Toolbar";

const {
  BsFillPhoneFill,
  BsFillLaptopFill,
  FaTablet,
  IoWatchSharp,
  GiRiceCooker,
  HiMiniTv,
  RiVipCrown2Fill,
} = icons;

const Header = () => {
  const images = [anh1, anh2, anh3];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImg = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImg = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextImg();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextImg]);

  return (
    <div className="relative max-w-full mx-auto z-50   ">
      {/* banner */}
      <div className="relative z-50 w-full max-w-[1170px] mx-auto overflow-hidden">
        <button
          onClick={prevImg}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
        >
          <icons.IoIosArrowDropleft className="text-white text-3xl opacity-75 hover:opacity-100" />
        </button>

        <div
          className="flex transition-transform duration-700 ease-in-out "
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-auto flex-shrink-0"
            />
          ))}
        </div>

        <button
          onClick={nextImg}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
        >
          <icons.IoIosArrowDropright className="text-white text-3xl opacity-75 hover:opacity-100" />
        </button>
      </div>
      <Toolbar/>
      {/* toolbar */}
      <div className="flex flex-wrap items-center w-full h-auto mt-4 md:mt-0 ml-4 md:ml-[183px] space-x-4 ">
        <Button
          className="w-full md:w-auto"
          text={"Điện thoại"}
          IcAfter={BsFillPhoneFill}
        />
        <Button
          className="w-full md:w-auto"
          text={"Laptop"}
          IcAfter={BsFillLaptopFill}
        />
        <Button
          className="w-full md:w-auto"
          text={"Máy tính bảng"}
          IcAfter={FaTablet}
        />
        <Button
          className="w-full md:w-auto"
          text={"Đồng hồ thông minh"}
          IcAfter={IoWatchSharp}
        />
        <Button
          className="w-full md:w-auto"
          text={"Phụ kiện"}
          IcAfter={BsFillPhoneFill}
        />
        <Button
          className="w-full md:w-auto"
          text={"Điện máy - Gia dụng"}
          IcAfter={GiRiceCooker}
        />
        <Button className="w-full md:w-auto" text={"Tivi"} IcAfter={HiMiniTv} />
        <Button
          className="w-full md:w-auto"
          text={"Mua kèm gói cước"}
          IcAfter={RiVipCrown2Fill}
        />
      </div>
    </div>
  );
};

export default Header;

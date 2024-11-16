import { useCallback, useEffect, useState } from "react";
import animation1 from "../../../assets/client/animation1.png";
import animation2 from "../../../assets/client/animation2.jpg";
import animation3 from "../../../assets/client/animation3.jpg";
import animation4 from "../../../assets/client/animation4.jpg";
import icons from "../../../utils/icons";

const Animation = () => {
  const images = [animation1, animation2, animation3, animation4];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, [images.length]);
  const nextImg = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImg = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="w-full bg-[#F2F2F2] relative">
      <div className="flex justify-center items-center mx-auto pt-4 bg-[#F2F2F2] rounded-md px-4 sm:px-8 md:px-16 lg:px-[50px] relative group">
        <button
          onClick={prevImg}
          className="absolute left-4 sm:left-8 md:left-16 lg:left-[180px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <icons.IoIosArrowDropleftCircle className="text-gray-200 text-2xl sm:text-3xl md:text-4xl" />
        </button>

        <div className="flex items-center">
          <img
            src={images[currentIndex]}
            alt=""
            className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] rounded-md"
          />
          <img
            src={images[(currentIndex + 1) % images.length]}
            alt=""
            className="w-[280px] sm:w-[380px] md:w-[480px] lg:w-[580px] rounded-md ml-2"
          />
        </div>

        <button
          onClick={nextImg}
          className="absolute right-4 sm:right-8 md:right-16 lg:right-[180px] top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <icons.IoIosArrowDroprightCircle className="text-gray-200 text-2xl sm:text-3xl md:text-4xl" />
        </button>
      </div>
    </div>
  );
};

export default Animation;

import { useCallback, useEffect, useState } from "react";
import anh1 from "../../assets/client/anh1.jpg";
import anh2 from "../../assets/client/anh2.jpg";
import anh3 from "../../assets/client/anh3.png";
import icons from "../../utils/icons";
import Button from "./Button";
import Toolbar from "./Toolbar";


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
    <div className="relative max-w-full mx-auto z-50">
    {/* banner */}
    <div className="relative z-50 w-full max-w-full lg:max-w-[1170px] mx-auto overflow-hidden">
      <button
        onClick={prevImg}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
      >
        <icons.IoIosArrowDropleft className="text-white text-3xl opacity-75 hover:opacity-100" />
      </button>

      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(${-currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto flex-shrink-0 object-cover" // Đảm bảo hình ảnh không bị méo
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

    <Toolbar />

    {/* Responsive buttons */}
    <Button />
  </div>
  );
};

export default Header;

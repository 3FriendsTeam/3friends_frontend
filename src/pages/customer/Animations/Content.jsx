import logo2 from "../../../assets/client/logo2.png";
import { useState, useEffect, useCallback, useMemo } from "react";
import icons from "../../../utils/icons";
import a1 from "../../../assets/client/a1.png";
import a2 from "../../../assets/client/a2.png";
import a3 from "../../../assets/client/a3.jpg";
import a4 from "../../../assets/client/a4.jpg";
import h1 from "../../../assets/client/h1.jpg";
import h2 from "../../../assets/client/h2.jpg";
import h3 from "../../../assets/client/h3.jpg";
import l1 from "../../../assets/client/l1.jpg";
import l2 from "../../../assets/client/l2.jpg";
import l3 from "../../../assets/client/l3.png";

const FeaturedProducts = () => {
  const imageNames = [
    "Xiaomi 14T Series",
    "Tecno Pova 6 Neo",
    "ViVo Y18s (6+128GB)",
    "Reno12 Series 5G",
  ];

  const prices = [
    "Ưu Đãi Đến 5.5 Triệu",
    "Giá Chỉ 3.990.000đ",
    "Giá Chỉ 4.190.000đ",
    "Giá chỉ từ 9.490.000đ",
  ];

  const images = useMemo(() => [l1, l2, l3, a4], []);
  const images1 = useMemo(() => [h1, h2, h3], []);
  const images2 = useMemo(() => [a1, a2, a3], []);

  // State cho từng bộ ảnh
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex1, setCurrentIndex1] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);

  const navigateImage = useCallback((setIndex, images, direction) => {
    setIndex((prevIndex) => {
      const newIndex =
        direction === "next"
          ? (prevIndex + 1) % images.length
          : (prevIndex - 1 + images.length) % images.length;
      return newIndex;
    });
  }, []);

  // Sử dụng hàm navigateImage cho từng bộ ảnh
  const nextImg = () => navigateImage(setCurrentIndex, images, "next");
  const prevImg = () => navigateImage(setCurrentIndex, images, "prev");

  const nextImg1 = () => navigateImage(setCurrentIndex1, images1, "next");
  const prevImg1 = () => navigateImage(setCurrentIndex1, images1, "prev");

  const nextImg2 = () => navigateImage(setCurrentIndex2, images2, "next");
  const prevImg2 = () => navigateImage(setCurrentIndex2, images2, "prev");

  const useImageSlider = (setIndex, images, intervalTime) => {
    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, intervalTime);
      return () => clearInterval(interval);
    }, [setIndex, images, intervalTime]);
  };

  // Sử dụng hàm useImageSlider cho từng bộ ảnh
  useImageSlider(setCurrentIndex, images, 3500);
  useImageSlider(setCurrentIndex1, images1, 5000);
  useImageSlider(setCurrentIndex2, images2, 5000);

  return (
    <div className="bg-[#F2F2F2]">
      <div className="hidden md:flex">
        <img
          src={logo2}
          alt=""
          className="rounded-bl-3xl rounded-br-3xl w-full h-auto"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-[160px] bg-transparent">
        <div className="p-6 rounded-lg flex flex-col lg:flex-row gap-2.5">
          {/* Hình ảnh chính */}
          <div className="relative overflow-hidden w-full h-auto lg:w-[770px] lg:h-[330px] -mt-[110px] group">
            <button
              onClick={prevImg}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <icons.IoIosArrowDropleftCircle className="text-gray-200 text-4xl " />
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
                  className="w-full h-auto lg:w-[770px] lg:h-[330px] rounded-lg flex-shrink-0"
                  style={{ marginBottom: "10px" }}
                />
              ))}
            </div>
            <button
              onClick={nextImg}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <icons.IoIosArrowDroprightCircle className="text-gray-200 text-4xl " />
            </button>
          </div>

          {/* Tên sản phẩm và giá */}
          <div className="absolute bottom-[-70px] w-full  lg:-ml-[375px] text-black text-center hidden lg:block ">
            <div className="flex justify-center flex-wrap ">
              {imageNames.map((name, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`bg-white p-4 rounded-lg border-red-500 w-[150px] lg:w-[192.5px] text-center ${
                    index === currentIndex ? "border-b-4 border-red-500" : ""
                  }`}
                >
                  <h3 className="text-sm font-medium cursor-pointer">{name}</h3>
                  <p className="text-sm  cursor-pointer">{prices[index]}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Các ảnh phụ */}
          <div className="flex flex-col justify-center items-center mt-4 lg:mt-[-110px] lg:-mr-[80px] gap-5 ">
            {/* Thẻ cho ảnh đầu tiên */}
            <div className="relative overflow-hidden w-full h-auto lg:w-[390px] lg:h-[190px] group">
              <button
                onClick={prevImg1}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <icons.IoIosArrowDropleftCircle className="text-gray-200 text-4xl" />
              </button>
              <div
                className=" flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(${-currentIndex1 * 100}%)` }}
              >
                {images1.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto lg:w-[390px] lg:h-[190px] rounded-lg flex-shrink-0"
                    style={{ marginBottom: "10px" }}
                  />
                ))}
              </div>
              <button
                onClick={nextImg1}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <icons.IoIosArrowDroprightCircle className="text-gray-200 text-4xl" />
              </button>
            </div>

            {/* Thẻ cho ảnh thứ hai */}
            <div className="relative overflow-hidden w-full h-auto lg:w-[390px] lg:h-[190px] group">
              <button
                onClick={prevImg2}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <icons.IoIosArrowDropleftCircle className="text-gray-200 text-4xl" />
              </button>
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(${-currentIndex2 * 100}%)` }}
              >
                {images2.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-auto lg:w-[390px] lg:h-[190px] rounded-lg flex-shrink-0"
                  />
                ))}
              </div>
              <button
                onClick={nextImg2}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <icons.IoIosArrowDroprightCircle className="text-gray-200 text-4xl" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;

import { useEffect, useState } from "react";
import axios from "axios";
import icons from "../../utils/icons";
import React from "react";

const {
  BsFillPhoneFill,
  BsFillLaptopFill,
  FaTablet,
  IoWatchSharp,
  GiRiceCooker,
  HiMiniTv,
  RiVipCrown2Fill,
} = icons;

const availableIcons = {
  BsFillPhoneFill,
  BsFillLaptopFill,
  FaTablet,
  IoWatchSharp,
  GiRiceCooker,
  HiMiniTv,
  RiVipCrown2Fill,
};

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [productTypes, setProductTypes] = useState([]); // Lưu product types
  const [hoveredCategory, setHoveredCategory] = useState(null); // Theo dõi danh mục đang hover

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/categories`
        );
        const updatedCategories = response.data.map((category, index) => ({
          ...category,
          icon: Object.keys(availableIcons)[
            index % Object.keys(availableIcons).length
          ],
        }));
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchProductTypes = async (categoryId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/get-all-manufacturer-Of-Product-By-Category?id=${categoryId}`
      );
      setProductTypes(response.data);
    } catch (error) {
      console.error("Error fetching product types:", error);
      setProductTypes([]);
    }
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
    fetchProductTypes(category.id);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
    setProductTypes([]);
  };

  return (
    <div className="w-full bg-white relative group">
      <div className="w-full max-w-[1170px] mx-auto bg-white rounded-lg">
        <div className="flex justify-between gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg"
              style={{ width: "150px", height: "50px" }}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
            >
              {category.icon && (
                <span className="text-[16px]">
                  {React.createElement(availableIcons[category.icon])}
                </span>
              )}

              <span className="text-[13px] font-medium truncate overflow-hidden">
                {category.CategoryName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {hoveredCategory && (
        <div className="absolute top-full left-0 w-screen h-[250px] bg-white opacity-100 transition-opacity duration-300 z-50 border-y border-gray-300">
          <div className="p-4 max-w-[1170px] mx-auto">
            <h3 className="font-bold text-lg mb-4">Chọn theo hãng</h3>
            <div className="grid grid-cols-3 gap-2">
              {productTypes.map((type) => (
                <div
                  key={type.id}
                  className=" rounded-md shadow-sm  hover:bg-gray-300 transition"
                >
                  <span className="text-sm font-medium text-gray-500">{type.ManufacturerName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
